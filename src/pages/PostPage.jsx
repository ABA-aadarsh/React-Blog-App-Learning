import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { service } from '../appwrite/config'
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

function PostPage() {
    const {slug}=useParams()
    const navigate=useNavigate()
    const userData=useSelector(state=>state.userData)
    const [loading,setLoading]=useState(true)
    const [post,setPost]=useState(null)
    useEffect(()=>{
        async function getPost(){
            const res=await service.getPost(slug)
            // console.log(slug,res)
            if(res && res.userId===userData.$id){
                setPost(res)
            }else if(res && res.userId!==userData.$id && res.status==="active"){
                setPost(res)
            }else if(res && res.userId!==userData.$id && res.status==="inactive"){
                setPost(null)
            }
            setLoading(false)
        }
        getPost()
    },[userData])
  return !loading ?(
        <>
            {
                post ?
                (
                    <div className='postBox'>
                        {post.featuredImage && 
                            <img src={service.getPreviewImage(post.featuredImage)} alt="" />
                        }
                        <h1
                        className='postTitle'
                        >{post.title}</h1>
                        <div
                        className='postContent'
                        >
                            {parse(post.content)}
                        </div>
                    </div>
                ):
                <h3>Access denied</h3>
            }
        </>
  ): (
    <p>Loading......</p>
  )
}

export default PostPage