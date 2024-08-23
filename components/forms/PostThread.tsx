"use client"

import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation';
 
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Textarea } from '../ui/textarea';

import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';
// import { updateUser } from '@/lib/actions/user.actions';

interface Props {
    userId: string;
}


function PostThread({userId}: Props) {
    
        const router =  useRouter();
        const pathname = usePathname();
    
        const form = useForm({
            resolver: zodResolver(ThreadValidation),
            defaultValues: {
                thread: '',
                accountId: userId,
            }
        });

        const onSubmit = async ( values: z.infer<typeof ThreadValidation> ) =>{
            await createThread({
                text: values.thread,
                author: userId,
                communityId: null,
                path: pathname,
            })
            router.push('/')
        }


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col mt-10  justify-start gap-10">

            <FormField
                control={form.control}
                name="thread"
                render={({ field }) => (
                <FormItem className='flex flex-col justify-start w-full  gap-3 '>
                    <FormLabel className='text-base-semibold text-light-2'>your thread</FormLabel>
                    <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1 '>
                        <Textarea 
                            placeholder="post your thread"
                            rows={15} 
                            className='account-form_input no-focus' 
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className='bg-primary-500'>Post Thread</Button>
        </form>
    </Form>
  )
}

export default PostThread