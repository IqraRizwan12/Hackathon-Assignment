import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider } from "firebase/auth"
import { getAuth, signInWithPopup } from "firebase/auth"
import { collection, addDoc, getFirestore, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { query, where, onSnapshot } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBpSQIbxUT4kWlhqd6il1iU4eauKRgqaPM",
    authDomain: "hackathon-project-b1243.firebaseapp.com",
    projectId: "hackathon-project-b1243",
    storageBucket: "hackathon-project-b1243.appspot.com",
    messagingSenderId: "834519653487",
    appId: "1:834519653487:web:fa3ffb268842e57a82819a",
    measurementId: "G-JSMTVTCYXX"
};


const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const auth = getAuth();
const db = getFirestore(app)
const storage = getStorage(app)




function loginWithFacebook () {
    signInWithPopup(auth, provider)
      .then((result)  => {
        const user = result.user;
        console.log('u', result.user.providerData)
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        
        
      })
  
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
  
      });
  }

  async function addUser(email, password, fullName) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user',user)

         addDetail(user.uid, fullName, user.email)

  
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  
  function LoginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  


  async function addDetail(uid, fullName, email) {
    const docRef = await addDoc(collection(db, "userss"), {
      uid,
      displayName: fullName,
      email,
      status: 'pending'
  
    });
  
  }


  async function getUsers() {
    const list = [];
    const querySnapshot = await getDocs(collection(db, "userss"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push(doc.data());
    });
    return list;
  }
  
  async function posting(description, file,type) {
    const url = await uploadImage(file)
    const docRef = await addDoc(collection(db, "data"), {
      description,
      Url: url,
      type:type
    });
  }
  
  async function uploadImage(file) {
    try {
      const storageRef = ref(storage, 'data/' + file.name);
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      return url
    } catch (e) {
      alert(e.message)
  
    }
  }
  
  async function getPosts() {
    const querySnapshot = await getDocs(collection(db, "data"));
    const data = []
    querySnapshot.forEach((doc) => {
      const postData = doc.data()
      data.push(postData)
      console.log('data', data)
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    return data
  
  }
  
  
  
  
  async function updateStatus(id, status) {
    await updateDoc(doc(db, "userss", id), {
      status
    });
  
  }
  
  
  
  


 async  function postMessages(newMessages,room){
  const docRef = await addDoc(collection(db, "messages"), {
    text:newMessages,
    createdAt: serverTimestamp(),
    user: auth.currentUser.displayName,
    room:room

  });

  }





  export { loginWithFacebook, posting, getPosts, collection, query, where, onSnapshot, db, updateStatus,  addUser,  LoginUser, getUsers, getDocs, doc,postMessages }
