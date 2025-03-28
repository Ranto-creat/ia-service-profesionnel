"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Nav() {
  return (
    <>
      <div className="fixed bottom-0 z-20 w-full px-4 py-6 md:hidden">
        <MobileNavigation />
      </div>

      <div className="fixed hidden h-screen w-20 flex-col items-center justify-between bg-gradient-to-b from-slate-900 to-slate-800 shadow-xl md:flex">
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="w-full p-4">
            <div className="flex h-12 w-full items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-white/20">
              <Heart
                className="text-rose-500 transition-transform hover:scale-110"
                size={24}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2 py-8">
            <NavItem link={"/"} Icon={<Home size={24} />} label="Home" />
            <NavItem
              link={"/hard"}
              Icon={<BookOpen size={24} />}
              label="Learn"
            />
            <NavItem link={"/soft"} Icon={<Speech size={24} />} label="Chat" />
          </div>

          <div className="w-full p-4">
            <div className="group flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-red-500/20">
              <LogOut
                className="text-white/70 transition-all group-hover:text-red-500"
                size={24}
              />
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
  label: string;
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
        document.getElementById("content")!.classList.toggle("blur-sm");
        setIsOpen(!isOpen);
    };

    const menuCloseClickHandler = () => {
        document.getElementById("content")!.classList.remove("blur-sm");
        setIsOpen(false);
    };

    useEffect(() => {
        const contentElement = document.getElementById("content");
        const handleClick = () => menuCloseClickHandler();

        if (contentElement) {
            contentElement.addEventListener("click", handleClick);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener("click", handleClick);
            }
        };
    }, []);

    return (
        <>
            <div
                className={`cursor-pointer overflow-hidden rounded bg-neutral-100 transition-all duration-200 ease-in ${
                    isOpen ? "h-14" : "h-0"
                }`}
                onClick={menuCloseClickHandler}
            >
                <div className="flex justify-center space-x-4 font-bold text-neutral-700">
                    <NavItem link={"/"} Icon={<Home size={20} />} label={""} />
                    <NavItem link={"/hard"} Icon={<BookOpen size={20} />} label={""} />
                    <NavItem link={"/soft"} Icon={<Speech size={20} />} label={""} />
                </div>
                <div className="mt-auto border-y">
                    <div className="flex cursor-pointer items-center gap-4 border-l-4 border-transparent p-4 text-sm hover:border-neutral-800 hover:bg-white">
                        <LogOut size={20} />
                    </div>
                </div>
            </div>

            <div
                className="flex w-full items-center justify-between rounded bg-neutral-200 p-2"
                onClick={menuOpenClickHandler}
            >
                <h1 className="text-sm font-bold text-neutral-700">Menu</h1>
                <Plus className={`${isOpen && "rotate-45"} text-neutral-700`} />
            </div>
        </>
    );
};

