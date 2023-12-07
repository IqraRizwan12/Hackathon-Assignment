'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { Header } from '../Header.js/page'
import { checkAndCreateRoom, posting } from '../firebase/page'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getPosts } from "../firebase/page"
import Image from 'next/image'
import Link from 'next/link'
import Popup from "../Popup/page"
import { updateStatus } from "../firebase/page"
import ReactPlayer from "react-player"
import { collection, query, where, onSnapshot, db } from '../firebase/page'
import { FaHome, FaCompass, FaShoppingBag, FaHeart, FaEnvelope, FaCog, FaVideo, FaCamera, FaSmile } from 'react-icons/fa';

export default function Dashboard() {
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [friendRequest, setFriendRequest] = useState([])
  const [friends, setFriends] = useState()
  const [NewMessages, setNewMessages] = useState()
  const [userDetail, setUserDetail] = useState()
  const auth = getAuth();
  const [msg, setMsg] = useState()
  const router = useRouter()


  const isImage = (files) => files.type.startsWith('image')
  const isAudio = (files) => files.type.startsWith('audio')
  const isVideo = (files) => files.type.startsWith('video')



  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };



 console.log('post',post)


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

  }, [])



  const getData = async () => {
    const data = await getPosts()
    setPost(data)
  }

  console.log('p', post)

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
    await posting(description, file[0])
    setLoading(false)

  }


  console.log('msg', msg)


  return <div >
    <Header />
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
          <h1 style={{ fontSize: 'large', margin: '10px', pdding: '10px', height: '40px', fontWeight: 'bold' }} >My Contacts</h1>
          {friends.map(item => {
            return <div style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px' }} >
              <h1 > {item.displayName}</h1>
            </div>
          })}
        </div>


      </div>


      <div style={{ width: '45%', display: 'inline-block' }}>
        <div style={{ backgroundColor: 'beige', margin: '10px' }}>
          <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px', padding: '10px' }} type="text" placeholder="What's happening?" />
          <div >
            <button onClick={openPopup} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Live Video</button>
            <button onClick={openPopup} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Photos</button>
            <button onClick={openPopup} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px' }}>Feeling</button>
            <button onClick={openPopup} style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'green', borderRadius: '10px' }}>Post</button>
          </div>
        </div>



        {post.map(item => {
          return (<div style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px' }}>
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
            {/* {file && Array.from(file).map((item, index) => {
              return <div key={index}>
                {isImage(item) && (
                  <Image
                    src={URL.createObjectURL(item)}
                    width={200}
                    height={200}
                    alt="uploading"
                  />
                )}

                {isVideo(item) && (
                  <ReactPlayer url={URL.createObjectURL(item)} controls={true} />
                )}

                {isAudio(item) && (
                  <ReactPlayer url={URL.createObjectURL(item)} controls={true} />
                )}

              </div>

            })}  */}

            <img src={item.Url} height={100} />
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Like</button>
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Comment</button>
            <button style={{ padding: '10px', margin: '20px', fontSize: 'large', backgroundColor: 'white', borderRadius: '10px', width: '25%', border: '1px solid black' }}>Share</button>
          </div>)
        })}

      </div>
      <div >
        <h1 style={{ fontSize: 'large', fontWeight: 'bolder', margin: '10px' }}>Friend Request</h1>
        {friendRequest.map(item => {
          return (<div style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px' }} >
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
        {friends.map(item => {
          return <div onClick={(item) => handleClick(item)
          } style={{ border: '1px solid black', borderRadius: '10px', margin: '10px', padding: '10px', width: '200px', display: 'flex', justifyContent: 'space-between' }} >
            <h1> {item.displayName}</h1>
            <FaEnvelope />
          </div>
        })}
        {/* <div>
          <form >
            <input style={{ backgroundColor: 'beige' }} type="text" placeholder="Type your message here..." onChange={(e) => setNewMessages(e.target.value)} />
            <button style={{ padding: '10px', marginLeft: '60px', fontSize: 'small', backgroundColor: 'red', borderRadius: '5px', width: '50px', marginTop: '10px' }} onClick={postMessages}>Send</button>
          </form>
        </div> */}



      </div>
    </div>


    <Popup isOpen={isPopupOpen} onClose={closePopup}>
      <div style={{ display: "flex", flexDirection: 'column', border: '1px solid black', width: '38%', margin: 'auto', textAlign: 'center', borderRadius: '10px', height: '300px', backgroundColor: 'beige' }} >
        <h1 style={{ fontSize: 'x-large', fontWeight: 'bolder', margin: '20px' }}>Create Post</h1>
        <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px', padding: '10px' }} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="What's happening?" />
        <input style={{ width: '95%', height: '50px', fontSize: 'large', margin: '10px' }} type="file" onChange={(e) => setFile(e.target.files)} multiple />
        {loading ? <center><Image
          src="https://i.gifer.com/ZKZg.gif"
          alt="Loading"
          width={50}
          height={50}
        /></center> : <button style={{ padding: '10px', margin: '10px', fontSize: 'large', backgroundColor: 'green', borderRadius: '5px' }} onClick={addData}>Post</button>}
      </div>
    </Popup>





  </div>
}