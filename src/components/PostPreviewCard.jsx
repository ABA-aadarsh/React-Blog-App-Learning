import React from 'react'
import { service } from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

function PostPreviewCard({post,...props}) {
    const navigate=useNavigate()
  return (
    <div {...props}>
        {post.featuredImage && 
            <img src={service.getPreviewImage(post.featuredImage)} alt="" />
        }
        <h2
            onClick={()=>{
                navigate(`/post/${post.$id}`)
            }}
        >{post.title}</h2>
    </div>
  )
}

export default PostPreviewCard