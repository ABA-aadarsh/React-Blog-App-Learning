import React from 'react'
import {Button, Input, Select} from '../index'
import { useForm } from 'react-hook-form'
import RTE from '../RTE'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { service } from '../../appwrite/config'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostForm(
    {
        post
    }
) {
    const {register,handleSubmit,control,watch,setValue,getValues}=useForm(
        {
            defaultValues:{
                title:post?.title || "",
                slug:post?.$id || "",
                content:post?.content || "",
                status:post?.status || "active"
            }
        }
    )
    const navigate=useNavigate()
    const userData=useSelector(state=>state.userData)


    const submit=async (data)=>{
        console.log(data)
        console.log(post)
        if(post){
            // if post is present, it means it is sent for update
            const file=data.image[0]?await service.uploadFile(data.image[0]):null;
            console.log(file)
            if(file){
                await service.deleteFile(post.featuredImage)
            }
            const dbPost=await service.updatePost(data.slug,{...data, userId: userData.$id, featuredImage: file?.$id || post.featuredImage })  // we defined document id as slug here but in actual cloud db it is $id for document id (as well as userId)
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
            // for creating post
            const file=data.image[0]?await service.uploadFile(data.image[0]):null;
            
            const dbPost=await service.createPost({...data,userId:userData.$id,featuredImage:file?.$id || undefined})

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }


    const makeSlug=useCallback((value)=>{
        if(value && typeof(value)==="string"){
            return value.trim().replace(/\s/g,"-").toLowerCase()
        }
        return ""
    },[])

    useEffect(()=>{
        const subscription=watch((data,{name})=>{
            // here name is the input component where change occured
            if(!post){
                if(name=="title"){
                    setValue("slug",makeSlug(data.title))
                }
            }
        })
        return ()=>{
            subscription.unsubscribe()
        }
    },[watch,setValue,makeSlug])

  return (
    <>
        <form 
            onSubmit={handleSubmit(submit)}
        >
            <div className="titleAndSlug">
                <Input
                    label="Title"
                    type="text"
                    {...register("title",{required:true})}
                    style={{marginBottom:"20px"}}
                />
                <Input
                    label="Slug"
                    type="text"
                    disabled={true}
                    {...register("slug",{required:true})}
                />
            </div>
            <div className="posteditorbox">
                <div className="editor">
                    <RTE
                        name={"content"}
                        control={control}
                        defaultValue={post?.content || ""}
                    />
                </div>
                <div className="featuredImageAndSubmitBox">
                    {
                        post?.featuredImage && 
                        <img src={service.getPreviewImage(post.featuredImage)} alt="" style={{width:"100px",height:"100px",objectFit:"cover"}} />
                    }
                    <Input
                        type="file"
                        label="Featured Image"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        
                        {...register("image",{required:!post})}
                    />
                    <Select
                        options={["active","inactive"]}
                        label="Status"
                        {...register("status",{required:true})}
                    />
                    <Button 
                        type="submit"
                        style={{padding:"10px",display:"block",marginTop:"10px"}}
                    >
                        Post
                    </Button>
                </div>
            </div>
        </form>
    </>
  )
}

export default PostForm