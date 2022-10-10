import React from "react";
import instance from "./instance";
// type PostPropsType={
//     title:string
//     text:string
//     tags?:Array<string>
//     imageUrl?:string
// }
export const PostApi={
    createPost(payload){
        return instance.post('/posts',{
            title:payload.title,text:payload.text,tags:payload.text,imageUrl:payload.imageUrl
        })
    },
    getPosts(){
        return instance.get('/posts')
    },
    getOnePost(postId){
        return instance.get(`/posts/${postId}`)
    },
    getTags(){
        return instance.get('/tags')
    }
}
