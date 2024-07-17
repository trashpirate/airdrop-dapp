
"use client";
import Footer from '@/components/footer';
import Airdrop from '@/components/airdrop/airdrop';
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
          <div className='w-full flex justify-center mt-8 text-secondary'>
            <div className='mx-auto'>
              Airdrop Fee: 1000 EARN / 100 wallets
            </div>

          </div>
        </div>

        <Airdrop></Airdrop>
      </div>
      <Footer></Footer>
    </main>
  );
}
