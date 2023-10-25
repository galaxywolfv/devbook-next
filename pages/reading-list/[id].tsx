import Link from 'next/link';
import React, { useState } from 'react';
import Head from 'next/head';
import config from '@/lib/config';
import useAuthentication from '@/lib/hooks/useAuthentication';
import Navbar from '@/components/navbar';

const MyReadingList = () => {
    const { auth } = useAuthentication();

    return (
        <>
            <Head>
                <title>User123's List{config.titleWithSeparator}</title>
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
        </>)
}
export default MyReadingList;