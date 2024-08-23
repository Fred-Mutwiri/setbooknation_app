import React from 'react'

import { fetchUser, getNotifications } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// import UserCard from '@/components/cards/UserCard';



async function Page() {
  const user = await currentUser();

  if(!user) return null;
  const userInfo = await fetchUser(user.id);

  if(!userInfo?.onboarded) redirect('/onboarding');

  //get the notifications
  const activity = await getNotifications(userInfo._id)
  console.log(activity);

  const useTextPreview = (text: string, maxLength: number) => {
    return (text.length > maxLength ? text.slice(0, maxLength) + '...' : text)
  }

  // const  = ;
    
  return (
    <section className='head-text mb-10'>
        <h1 className='head-text mb-10'>Notifications</h1>

        <section className=' mt-10 flex  flex-col gap-5 '>
          {activity.length > 0 ? (
            <> 
              {activity.map((activity) => (
                <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                  <article className='activity-card'>
                    <Image src={activity.author.image} alt="profile image" width={20} height={20} className="rounded-full object-cover" />
                    <p className='!text-small-regular text-light-2'>
                      <span className='text-primary-500 mr-1 '>@{activity.author.username}</span>{"  "}
                      replied to <span> "{useTextPreview(activity.text, 20)}"</span>
                    </p>
                  </article>
                </Link> 
              ))}
            </>
          ): (
            <p className='text-small-medium text-light-3 text-center'> No notifications yet</p>
          )}
        </section>
    </section>
  ) 
}

export default Page