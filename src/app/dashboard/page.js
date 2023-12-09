'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getPosts } from "../config/firebase"
import Link from 'next/link'
import { updateStatus } from "../config/firebase"
import { collection, query, where, onSnapshot, db } from '../config/firebase'
import { FaHome, FaCompass, FaShoppingBag, FaHeart, FaEnvelope, FaCog, FaVideo, FaCamera, FaSmile } from 'react-icons/fa';
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [post, setPost] = useState([])
  const [friendRequest, setFriendRequest] = useState([])
  const [friends, setFriends] = useState()
  const [userDetail, setUserDetail] = useState()
  const auth = getAuth();
  const router = useRouter()




  const postData = () =>{
    router.push('/posts')
  }




  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('user', user)
        setUserDetail(user)

      } else {
        // User is signed out
        // ...
      }
    });

    getData()
    request()
    MyContacts()

  }, [auth])

  async function Logout() {
    await signOut(auth)
      .then(() => {
        setUserDetail(null);
        router.push('/login',{scroll:false})
        
      })
      .catch((error) => {
        // An error happened.
      });
  }


  const getData = async () => {
    const data = await getPosts()
    setPost(data)
  }

 


  const request = async () => {

    const q = query(collection(db, "userss"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFriendRequest(data)
    });
  }



  async function MyContacts() {
    const q = query(collection(db, "userss"), where("status", "==", "accepted"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFriends(data)
    });


  }




  const handleClick = async (item) => {

    router.push('/chats')


  }




  if (!post) {
    return <div>Loading..</div>
  }


  if (!friends) {
    return <div>Loading...</div>
  }




  const addData = async () => {
    setLoading(true)
    await posting(description, file[0], type)
    setLoading(false)

  }






  return <div >
   <div style={{ backgroundColor: '#F3CFC6', padding: '10px', display: 'flex' }}>
    <h1 style={{ fontSize: 'x-large', marginRight: '30px', marginLeft: '10px', textAlign: 'left' }}>Scrolllink</h1>
    <input style={{ width: '400px', height: '40px', marginLeft: '200px', borderRadius: '10px', padding: '10px' }} placeholder=' Search Something here' type="text" />
    {userDetail && userDetail.displayName ? (
      <div style={{ display: 'flex', marginLeft: '300px' }}>
        {userDetail.photoURL ? (
          <img
            src={userDetail.photoURL}
            alt="User Photo"
            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
          />
        ) : (
          <span>No Photo</span>
        )}
        <span style={{ fontSize: 'large' }} >{userDetail.displayName}</span>
      </div>
    ) : (
      <span>Loading...</span>
    )}
    <button style={{ padding: '3px', margin: '3px', fontSize: 'small', backgroundColor: 'green', borderRadius: '10px', width: '100px', border: '1px solid black' }} onClick={Logout}>Logout</button>

  </div>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }}>
          <FaHome /><Link href='/dashboard'>Feeds</Link>
        </div>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }} >
          <FaCompass /><Link href='/explore'>Explore</Link>
        </div>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }}>
          <FaShoppingBag /><Link href='/marketplace'>Marketplace</Link>
        </div>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }}>
          <FaHeart /><Link href='/myfavourites'>My favourites</Link>
        </div>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }}>
          <FaEnvelope /><Link href='/messages'>Messages</Link>
        </div>
        <div style={{ display: 'flex', padding: '10px', margin: '10px', fontSize: 'large' }}>
          <FaCog /><Link href='/setting'>Setting</Link>
        </div>

        <div>
          <h1 style={{ fontSize: 'large', margin: '10px', padding: '10px', height: '40px', fontWeight: 'bold' }} >My Contacts</h1>
          {friends.map(item => {
            return <div key={item.id} style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', backgroundColor: '#F3CFC6' }} >
              <h1 > {item.displayName}</h1>
            </div>
          })}
        </div>


      </div>


      <div style={{ width: '45%', display: 'inline-block' }}>
        <div style={{ backgroundColor: '#F3CFC6', margin: '10px' }}>
          <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px', padding: '10px', borderRadius: '10px' }} type="text" placeholder="What's happening?" />
          <div >
            <button onClick={postData} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Live Video</button>
            <button onClick={postData} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Photos</button>
            <button onClick={postData} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Feeling</button>
            <button onClick={postData} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'green', borderRadius: '10px', width: '100px' }}>Post</button>
          </div>
        </div>



        {post.map((item,index) => {
          return (<div key={index} style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', backgroundColor: 'white' }}>
            {userDetail && userDetail.displayName ? (
              <div style={{ display: 'flex', marginLeft: '10px' }}>
                {userDetail.photoURL ? (
                  <img
                    src={userDetail.photoURL}
                    alt="User Photo"
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                  />
                ) : (
                  <span>No Photo</span>
                )}
                <span style={{ fontSize: 'large' }} >{userDetail.displayName}</span>
              </div>
            ) : (
              <span>Loading...</span>
            )}
            <h1 style={{ fontSize: 'large', margin: '10px', padding: '10px', height: '50px' }} >{item.description}</h1>
            {item.type === 'image' ? (
            <img src={item.Url} alt={item.description} style={{ maxWidth: '100%', maxHeight: '400px' }} />
          ) : item.type === 'video' ? (
            <video controls width="800">
              <source src={item.Url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
            
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Like</button>
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Comment</button>
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Share</button>
          </div>)
        })}

      </div>
      <div >
        <h1 style={{ fontSize: 'large', fontWeight: 'bolder', margin: '10px' }}>Friend Request</h1>
        {friendRequest.map((item,index) => {
          return (<div key={index} style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', backgroundColor: '#F3CFC6' }} >
            <h1 style={{ textAlign: 'center' }}>{item.displayName}</h1>
            <center>
              <button onClick={() => { updateStatus(item.id, 'accepted') }} style={{ marginLeft: '10px', padding: '10px', margin: '10px', fontSize: 'small', backgroundColor: 'green', borderRadius: '5px', textAlign: 'center' }}>Confirm</button>
              <button onClick={() => { updateStatus(item.id, 'accepted') }} style={{ padding: '10px', margin: '10px', fontSize: 'small', backgroundColor: 'red', borderRadius: '5px' }}>Reject</button>
            </center>
          </div>
          )
        })}

      </div>
      <div>
        <h1 style={{ fontSize: 'large', margin: '10px', padding: '10px', height: '40px', fontWeight: 'bolder' }} >CHATS</h1>
        {friends.map((item,index) => {
          return <div key={index} onClick={(item) => handleClick(item)
          } style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', width: '200px', display: 'flex', justifyContent: 'space-between', backgroundColor: '#F3CFC6' }} >
            <h1> {item.displayName}</h1>
            <FaEnvelope />
          </div>
        })}
       



      </div>
    </div>



  </div >
}