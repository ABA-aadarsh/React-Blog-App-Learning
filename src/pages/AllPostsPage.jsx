import React, {useState,useEffect} from 'react'
import { service } from '../appwrite/config'
import { useSelector } from 'react-redux'
import PostPreviewCard from '../components/PostPreviewCard'
import { useNavigate } from 'react-router-dom'

function AllPostsPage() {
    const [posts,setPosts]=useState([])
    const [loading,setLoading]=useState(true)
    const navigate=useNavigate()
    const userData=useSelector(state=>state.userData)
    useEffect( ()=>{
        async function  getPostData(){
            const res=await service.listPosts()
            if(res){
                setPosts(res.documents)
            }  
            setLoading(false)
        }
        getPostData()
    },[userData,navigate])
  return !loading ?
    <div className='postpreviewcontainer'>
        {posts.length>0?
            posts.map((post)=>(
                <div key={post.$id} className='postpreviewcard'>
                    <PostPreviewCard post={post}/>
                </div>
            )):<p>No Posts available</p>
        }
    </div> : <p>Loading ......</p>
  
}

export default AllPostsPage
