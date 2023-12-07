import Image from 'next/image'
import { useEffect,useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth"


export function Header(){
    const [userDetail,setUserDetail] = useState()
    const auth = getAuth();


    

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('user',user)
        setUserDetail(user)
       
      } else {
        // User is signed out
        // ...
      }
    });
    

  },[])

  console.log('user',userDetail)

  
  
return <div style={{ backgroundColor: 'beige', padding: '10px',display:'flex' }}>
    <h1 style={{ fontSize:'x-large',marginRight:'30px',marginLeft:'10px',textAlign:'left'}}>Scrolllink</h1>
    <input style={{width:'400px',height:'40px',marginLeft:'200px' ,borderRadius:'10px',padding:'10px'}} placeholder=' Search Something here' type="text" />
    {userDetail && userDetail.displayName ? (
      <div style={{ display: 'flex',marginLeft:'300px' }}>
        {userDetail.photoURL ? (
          <img
            src={userDetail.photoURL}
            alt="User Photo"
            style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
          />
        ) : (
          <span>No Photo</span>
        )}
        <span style={{fontSize:'large'}} >{userDetail.displayName}</span>
      </div>
    ) : (
      <span>Loading...</span>
    )}
    
</div>
}