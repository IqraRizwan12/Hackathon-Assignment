'use client'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { signOut } from "firebase/auth";


export function Header() {
  const [userDetail, setUserDetail] = useState()
  const auth = getAuth();
  const router = useRouter();




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log('user', user)
        setUserDetail(user)
       
      } else {
        // User is signed out
        // ...
      }
    });

  }, [Logout])

  console.log('user', userDetail)


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
  






  return <div style={{ backgroundColor: '#F3CFC6', padding: '10px', display: 'flex' }}>
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
}