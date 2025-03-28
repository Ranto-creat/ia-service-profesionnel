'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
    DollarSign,
    ArrowLeftRight,
    LogOut,
    MessagesSquare,
    TrendingUp,
    Plus,
    Home,
    Heart,
    BookOpen,
    Speech,
} from 'lucide-react';

export default function Nav() {
    return (
        <>
            <div className="fixed bottom-0 z-20 flex w-full cursor-pointer flex-col gap-4 px-4 py-6 md:hidden">
                <MobileNavigation />
            </div>

            <div className="fixed hidden h-screen w-18 flex-col items-center justify-between bg-[#1a1e24] md:flex">
                <div className="flex flex-col items-center justify-between h-full">
                    <div className="py-4 cursor-pointer hover:text-purple-400">
                        <Heart color="white" size={20} />
                    </div>

                    <div className="my-10 font-bold text-neutral-700">
                        <NavItem link={'/'} Icon={<Home size={20} />} />

                        <NavItem link={'/hard'} Icon={<BookOpen size={20} />} />

                        <NavItem link={'/soft'} Icon={<Speech size={20} />} />
                    </div>

                    <div>
                        <div className="cursor-pointer text-sm hover:text-purple-400 py-6">
                            <LogOut size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

type INavItem = {
    Icon: React.ReactNode;
    link: string;
};

function NavItem({ Icon, link }: INavItem) {
    const [isVisited, setIsVisited] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        pathname.endsWith(link) ? setIsVisited(true) : setIsVisited(false);
    }, [link, pathname]);

    return (
        <Link
            href={link}
            className={`flex cursor-pointer items-center gap-4 border-l-4 p-4 text-sm text-white  hover:text-purple-400 ${
                isVisited
                    ? 'border-neutral-800 dark:text-purple-400'
                    : 'border-transparent'
            }`}>
            {Icon}
        </Link>
    );
}

const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuOpenClickHandler: MouseEventHandler<HTMLDivElement> = () => {
        document.getElementById('content')!.classList.toggle('blur-sm');
        setIsOpen(!isOpen);
    };

    const menuCloseClickHandler = () => {
        document.getElementById('content')!.classList.remove('blur-sm');
        setIsOpen(false);
    };

    useEffect(() => {
        document
            .getElementById('content')!
            .addEventListener('click', (evt) => menuCloseClickHandler());
    }, []);

    return (
        <>
            <div
                className={`cursor-pointer overflow-hidden rounded bg-neutral-100 transition-all duration-200 ease-in ${
                    isOpen ? 'h-14' : 'h-0'
                }`}
                onClick={(event) => menuCloseClickHandler()}>
                <div className="flex justify-center space-x-4 font-bold text-neutral-700">
                    <NavItem link={'/'} Icon={<Home size={20} />} />
                    <NavItem link={'/hard'} Icon={<BookOpen size={20} />} />
                    <NavItem link={'/soft'} Icon={<Speech size={20} />} />
                </div>
                <div className="mt-auto border-y">
                    <div className="flex cursor-pointer items-center gap-4 border-l-4 border-transparent p-4 text-sm hover:border-neutral-800 hover:bg-white">
                        <LogOut size={20} />
                    </div>
                </div>
            </div>

            <div
                className="flex w-full items-center justify-between rounded bg-neutral-200 p-2"
                onClick={(event) => menuOpenClickHandler(event)}>
                <h1 className="text-sm font-bold text-neutral-700">Menu</h1>
                <Plus className={`${isOpen && 'rotate-45'} text-neutral-700`} />
            </div>
        </>
    );
};
