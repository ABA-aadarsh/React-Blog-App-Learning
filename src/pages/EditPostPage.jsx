import React from 'react'
import PostForm from '../components/PostForm/PostForm'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { service } from '../appwrite/config'
import { useState } from 'react'

function EditPostPage() {
  const {slug}=useParams()
  const [post,setPost]=useState(null)
  const [unauthorized,setUnauthorized]=useState(true)
  const [loading,setLoading]=useState(true)
  const userData=useSelector(state=>state.userData)
  useSelector(()=>{
    async function getPost(){
      const res=await service.getPost(slug)
      if(res){
        if(userData.$id===res.userId){
          setPost(res)
          setUnauthorized(false)
          setLoading(false)
        }
      }
    }
    getPost()
  },[slug,userData])
  return !loading && (
    <>
      {
        unauthorized? 
        <div><h1>Sorry you are not authorized</h1></div>
        :
        <div>
            <PostForm 
              post={post}
            />
        </div>
      }
    </>
  )
}

export default EditPostPage