"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}


export async function createThread({ text, author, communityId, path}: Params){
    connectToDB();
    try {

        const createdThread = await Thread.create({ text, author, communityId: null, });

        //update user model
        await User.findByIdAndUpdate( author, {
            $push: {threads: createdThread._id}
        })

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Failed to Create thread: ${error.message}`)
    }
}

export async function fetchPosts(pageNumber = 1, pagesize = 20){
    connectToDB();
    try {

        //calculate the number of posts to skip
        const skipAmount = ( pageNumber -1 ) * pagesize;

        //fetch the posts that have no parents, the top tier threads
        const postsQuery = await Thread.find({parentId: {$in: [ null, undefined ]}}).sort({ createdAt: 'desc' })
                .skip(skipAmount)
                .limit(pagesize)
                .populate({ path: 'author', model: User})
                .populate({
                    path: 'children',
                    populate: {
                        path: 'author',
                        model: User,
                        select: "_id name parentId image"
                    }
                })
        const totalPostsCount = await Thread.countDocuments({
        parentId: {$in: [null, undefined]}
        })
        const posts = await postsQuery;
        const isNext =  totalPostsCount > skipAmount + posts.length;

        return { posts, isNext };

    } catch (error:any) {
        throw new Error(`Failed to fetch Posts: ${error.message}`)
    }

    
}

export async function fetchThreadById(id: string){
    connectToDB();
    try {

        // TODO: Ppulate  community
        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image",
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

        return thread;
        
    } catch (error:any) {
        throw new Error(`Failed to fetch the specific thread: ${error.message}`)
    }
}

export async function addCommentToThread( 
    threadId: string,
    commentText: string, 
    userId: string, 
    path: string,
){
    connectToDB();
    try {
        //find the original Post by its ID
        const originalThread = await Thread.findById(threadId);
        if(!originalThread) {
            throw new Error("Thread not found");
        }

        //create a new post with the comment text
        const CommentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId, 
        });

        //save the new post comment 
        const savedCommentThread = await CommentThread.save();

        //update the original Post to include the new comment
        originalThread.children.push(savedCommentThread._id);

        //save the original Post
        await originalThread.save();

        revalidatePath(path);


    }   catch (error:any) {
            throw new Error(`Error adding comment to thread: ${error.message}`)
        }
}