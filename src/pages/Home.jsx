import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { service } from '../appwrite/config'
import PostPreviewCard from '../components/PostPreviewCard'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const userData = (useSelector(state => state.userData))
    const navigate=useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const deletePost=async (slug,fileId)=>{
        await service.deletePost(slug)
        await service.deleteFile(fileId)
        myPosts()
    }

    async function myPosts() {
        if (userData) {
            const res = await service.getMyPosts(userData.$id)
            if (res) {
                setPosts(res.documents)
            }
            setLoading(false)
        }
    }
    useEffect(() => {
        myPosts()
    }, [userData])
    
    return (
        <>
            <h3 style={{margin:"10px"}}>Your Posts</h3>
            {!loading ?
                <div className='postpreviewcontainer' >
                    {posts.length > 0 ?
                        posts.map((post) => (
                            <div key={post.$id} className='postpreviewcard'>
                                <PostPreviewCard post={post} style={
                                    {
                                        border: ((post.status === "active") ? "2px solid lime" : "1px solid white")
                                    }
                                } />
                                <div className="controlBtns">
                                    <button className='editBtn' title='Edit'
                                        onClick={()=>{
                                            navigate(`/edit-post/${post.$id}`)
                                        }}
                                    >
                                        <i className='fa fa-edit'></i>
                                    </button>

                                    <button className='deleteBtn' title='Delete'
                                        onClick={()=>deletePost(post.$id,post.featuredImage)}
                                    >
                                        <i className='fa fa-times'></i>
                                    </button>
                                </div>
                            </div>
                        )) : <p>No Posts available. Create a post. 
                            <Link
                                to={"/create-post"}
                            >
                                Create
                            </Link>
                        </p>
                    }
                </div> : <p>Loading ......</p>
            }
        </>
    )
}

export default Home