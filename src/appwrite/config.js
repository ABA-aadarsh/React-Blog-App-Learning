import { Client, Databases, ID, Query, Storage } from "appwrite";
import { conf } from "../conf/conf";

class Service{
    client=new Client();
    databases;
    bucket;
    constructor (){
        this.client
        .setEndpoint(conf.endpoint)
        .setProject(conf.projectId)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.dbId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error) 
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.dbId,
                conf.collectionId,
                slug
            )
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.dbId,
                conf.collectionId,
                slug
            )
        }catch(error){
            return false
        }
    }
    async listPosts(){
        try{
            return this.databases.listDocuments(
                conf.dbId,
                conf.collectionId,
                [
                    Query.equal("status",["active"])
                ]
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async getMyPosts(userId){
        try{
            return this.databases.listDocuments(
                conf.dbId,
                conf.collectionId,
                [
                    Query.equal("userId",userId)
                ]
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async updatePost(slug,{title,content,featuredImage="",status,userId}){
        try{
            return await this.databases.updateDocument(
                conf.dbId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    
    getPreviewImage(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error)
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }
}
export const service=new Service()