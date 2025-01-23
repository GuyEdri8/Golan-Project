import { redirect } from 'next/navigation'



export default async function Home() {
  // const token = await getToken();
  redirect('/home')
  return (
    <>
      <h1>דף הבית</h1>
    </>
  );
}
