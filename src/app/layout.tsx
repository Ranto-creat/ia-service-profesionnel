'use client';

import React, { /*MouseEventHandler*/ useEffect, useState } from 'react';

import '@/styles/Home.module.css';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';

import { AILoader } from '@/components/ui/loader';

import Nav from '@/components/Nav';

import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-quicksand',
});

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2800);
    }, []);

    return (
        <html lang="en">
            <body className={`${quicksand.className} antialiased `}>
                {loading ? (
                    <div className="flex h-screen items-center justify-center bg-[#1b242e]">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600/30 blur-3xl animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl animate-pulse delay-300" />
                            <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-slate-700/20 blur-3xl animate-pulse delay-700" />
                        </div>
                        <AILoader />
                    </div>
                ) : (
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange>
                        <div>
                            <Nav />
                        </div>

                        <div
                            className="relative grow md:ml-18 bg-[#1b242e]"
                            id="content">
                            {children}
                        </div>
                    </ThemeProvider>
                )}
            </body>
        </html>
    );
}
