'use client'
import { posting } from '../firebase/page'
import {  useState } from "react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function Post() {
    const [description, setDescription] = useState()
    const [file, setFile] = useState()
    const [type, setType] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const addData = async () => {
        setLoading(true)
        await posting(description, file[0], type)
        setLoading(false)
        router.push('/dashboard')

    }

    return <div style={{ display: "flex", flexDirection: 'column', border: '1px solid black', width: '38%', margin: 'auto', textAlign: 'center', borderRadius: '10px', height: '300px', backgroundColor: 'beige' }} >
        <h1 style={{ fontSize: 'x-large', fontWeight: 'bolder', margin: '20px' }}>Create Post</h1>
        <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px', padding: '10px' }} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="What's happening?" />
        <input style={{ width: '95%', height: '50px', fontSize: 'large', margin: '10px' }} type="file" onChange={(e) => setFile(e.target.files)} multiple />
        <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px', padding: '10px' }} type="text" onChange={(e) => setType(e.target.value)} placeholder="Write Image/Video/Audio" />
        {loading ? <center><Image
            src="https://i.gifer.com/ZKZg.gif"
            alt="Loading"
            width={50}
            height={50}
        /></center> : <button style={{ padding: '10px', margin: '10px', fontSize: 'large', backgroundColor: 'green', borderRadius: '5px' }} onClick={addData}>Post</button>}
    </div>

}