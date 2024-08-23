"use client"

import React from 'react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation';
 
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from '../ui/input';

import { CommentValidation } from '@/lib/validations/thread';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.actions';
// import { createThread } from '@/lib/actions/thread.actions';


interface Props {
    threadId: string,
    currentUserImg: string,
    currentUserId: string,
}

function Comment({threadId, currentUserImg, currentUserId}: Props) {
    const router =  useRouter();
        const pathname = usePathname();
    
        const form = useForm({
            resolver: zodResolver(CommentValidation),
            defaultValues: {
                thread: '',
            }
        });

        const onSubmit = async ( values: z.infer<typeof CommentValidation> ) =>{
            await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname );
            form.reset();
        }
  return (
    <>
        <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex  mt-10 comment-form   gap-10">

                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                    <FormItem className='flex  items-center w-full  gap-3 '>
                        <FormLabel className=' '>
                            <Image 
                                src={currentUserImg}
                                alt='profile image'
                                width={48}
                                height={48}
                                className='rounded-full object-cover'
                            />
                        </FormLabel>
                        <FormControl className=' border-none bg-transparent '>
                            <Input
                                placeholder="comment..."
                                type='text' 
                                className=' no-focus text-light-1 outline-none' 
                                {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className='comment-form_btn'>Reply</Button>
            </form>
        </Form>
    </>

  )
}

export default Comment