
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const result = await fetchPosts(1, 10);
  const user = await currentUser();
  return (
    <>
      <div className="bg-dark-1">
        <h1 className="head-text text-left">Home</h1>
        <section>
          {result.posts.length == 0 ? (
            <p className="no-result">No threads Found </p>
          ): (
            <>
              {result.posts.map((post)=> (
                <ThreadCard 
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ''} 
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              ))}
            </>
          )}
        </section>
      </div>
    </>
  );
}
