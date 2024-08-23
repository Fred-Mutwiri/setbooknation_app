import AccountProfile from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';


export default   async function Page() {

  const user = await currentUser();
  const userInfo = await fetchUser(user?.id);
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }

  return(
    <main className=' mx-auto flex max-w-3xl max-md:flex-col items-baseline justify-center px-10 py-5'>
      <div className='mb-10'>
        <h1 className='head-text'> Onboarding </h1>
        <p className='mt-3 text-small-regular text-light-2'>
          Complete your profile now to participate in Setbook Nation .
        </p>
      </div>

      <section className='mt-9 bg-dark-2 p-10 w-full  '>
        <AccountProfile user={userData} btnTitle="Continue"/>
      </section>
    </main>
  );
}