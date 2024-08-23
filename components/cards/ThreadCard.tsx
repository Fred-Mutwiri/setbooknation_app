
import { formatDateString } from '@/lib/utils';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
     id: string;
     currentUserId: string;
     parentId: string | null;
     content: string;
     author: {name: string, image: string, id: string};
     community: {name: string, image: string, id: string} | null;
     createdAt: string;
     comments: {
        author: {image: string}
      } []
    isComment?: boolean;
}

function ThreadCard({id,currentUserId, parentId, content, author, community, createdAt, comments, isComment, }: Props) {
 
  
  return (
    <article className={`flex flex-col  w-full  my-2 rounded-xl ${isComment ? 'px-0 xs:px-7': 'bg-dark-2 p-7'} `}>
      <div className="flex items-start justify-between" >
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image src={author.image} alt='author' fill className='cursor-pointer bg-slate-300 rounded-full' />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className='flex flex-col w-full'>
            <Link href={`/profile/${author.id}`} className=' '>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>{author.name} | {}</h4>
            </Link>

            <p className='mt-2 text-light-2 text-small-regular '>{content}</p>

            <div className={`mt-5 flex flex-col gap-3 ${isComment &&  'mb-10'}`}>
              <div className='flex gap-3.5'>
                <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                <Image src="/assets/share.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                <Link href={`/thread/${id}`} className='inline-flex gap-1'>
                  <Image src="/assets/reply.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                  {comments.length > 0 && (
                      <p className="mt-1 text-subtle-medium text-gray-1">{comments.length} {comments.length > 1 ? "replies" : "reply"}</p>
                  )}
                </Link>

              </div>

            
            </div>
          </div>
        </div>

        {/* TODO: Delete Thread  */}
        {/* TODO: Show comment Logos  */}

        {!isComment && community && (
          <Link href={`/communities/${community.id}`} className='mt-5 flex items-center'>
            <p className='text-subtle-medium text-gray-1'>
              {formatDateString(createdAt)}
              -{community.name} community
            </p>

            <Image src={community.image} alt={community.name} width={14} height={14} className='ml-1 rounded-full object-cover' />
          </Link>
        )}
      </div>

    </article>
  )
}

export default ThreadCard