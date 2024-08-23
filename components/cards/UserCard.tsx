"use client"

import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
    key: string;
    id: string;
    name: string;
    username: string;
    imageUrl: string;
    personType: string;
}

function UserCard({key,id,name,username, imageUrl,personType}: Props) {

    const router = useRouter();

  return (
    <article className='user-card'>
        <div className='user-card_avatar'>
            <Image 
                src={imageUrl}
                alt='logo'
                height={48}
                width={48}
                className='rounded-full  bg-slate-50'
            />

            <div className='flex-1 text-ellipsis'>
                <h4 className='text-base-semibold text-light-1'>{name}</h4>
                <p className='text-small-medium text-gray-1'>@{username}</p>
            </div>
        </div>

        <Button className='rounded-2xl text-small-medium bg-primary-500' onClick={() => router.push(`/profile/${id}`)}>
            View
        </Button>

    </article>
  )
}

export default UserCard

























{/*  */}



    // <div className='flex flex-col rounded-lg bg-slate-100'>
    //         <Image 
    //             src={imageUrl}
    //             alt='logo'
    //             height={200}
    //             width={200}
    //             className='rounded-lg  p-9'
    //         />
    //         <div className='flex bg-slate-950 bg-opacity-40 items-center'>
    //             <div className='flex-1 ml-2 py-4 text-ellipsis'>
    //                 <h4 className='text-base-semibold text-light-1'>{name}</h4>
    //                 <p className='text-small-medium text-gray-3'>@{username}</p>
    //             </div>
    //             <Button className='rounded-xl text-tiny-medium bg-dark-1' onClick={() => router.push(`/profile/${id}`)}>
    //                 View
    //             </Button>
    //         </div>
    //     </div>