import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main  >
      <div>
      <div>
        <h2 style={{ fontSize: 'xx-large', fontWeight: 'bolder', margin: '20px', textAlign: 'center' }}>
          Scrolllink
        </h2>
      </div>

      <div style={{width:'30%',margin:'auto'}} >

        <div style={{ padding:'10px', textAlign:'center',fontSize:'large',backgroundColor: 'green', borderRadius: '10px', border: '1px solid black',margin:'10px' }} >
          <Link href="/login">Login</Link>
        </div>
        <div style={{ padding:'10px', textAlign:'center',fontSize:'large',backgroundColor: 'green', borderRadius: '10px', border: '1px solid black',margin:'10px' }} >
          <Link href="/register">Register</Link>
        </div>


      </div>
      </div>
    </main>
  )}