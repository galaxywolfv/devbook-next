import Head from 'next/head';
import Navbar from "@/components/navbar"
import config from '@/lib/config';

export default function Home() {

  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content="Limitless Entertainment." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Navbar></Navbar>

      <div className="relative">
        <section className="bg-white overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-8xl">
                  Where Knowledge Comes to Life.
                </h1>
                <p className="mt-8 text-xl text-black">
                  Your Platform for Discovering, Collecting, and Sharing the World of Books.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
