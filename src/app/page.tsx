
"use client";
import Footer from '@/components/footer';
import InputTextField from '@/components/input/inputTextField';
import Navbar from '@/components/navbar';
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bgColor justify-stretch">
      <div className="mx-auto w-full flex flex-col lg:w-7/8 2xl:w-3/4 h-full mt-8 px-8 sm:px-12 items-stretch flex-flexMain">
        <Navbar></Navbar>

        <div>
          <Image
            className='h-auto mx-auto mt-4 lg:w-[45%]'
            src='/title.png'
            width={2553}
            height={960}
            alt="collection title"
            priority
          >
          </Image>
          <div className='text-secondary mx-auto text-center my-8 max-w-4xl'>{process.env.NEXT_PUBLIC_PROJECT_DESCRIPTION}</div>
        </div>
        <InputTextField></InputTextField>
      </div>
      <Footer></Footer>
    </main>
  );
}
