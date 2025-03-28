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

function NavItem({ Icon, link, label }: INavItem) {
  const [isVisited, setIsVisited] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisited(pathname === link);
  }, [link, pathname]);

  return (
    <Link href={link} className="relative w-full px-4">
      <div
        className={cn(
          "group flex h-12 w-full items-center justify-center rounded-xl transition-all",
          isVisited
            ? "bg-white/20 text-white"
            : "text-white/70 hover:bg-white/10 hover:text-white"
        )}
      >
        {Icon}
        <div
          className={cn(
            "absolute left-full ml-2 rounded-md bg-slate-800 px-2 py-1 text-sm text-white opacity-0 transition-all group-hover:opacity-100",
            "pointer-events-none"
          )}
        >
          {label}
        </div>
      </div>
    </Link>
  );
}

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuOpenClickHandler: MouseEventHandler<HTMLDivElement> = () => {
    document.getElementById("content")?.classList.toggle("blur-sm");
    setIsOpen(!isOpen);
  };

  const menuCloseClickHandler = () => {
    document.getElementById("content")?.classList.remove("blur-sm");
    setIsOpen(false);
  };

  useEffect(() => {
    const content = document.getElementById("content");
    if (content) {
      content.addEventListener("click", menuCloseClickHandler);
      return () => content.removeEventListener("click", menuCloseClickHandler);
    }
  }, []);

  return (
    <>
      <div
        className={cn(
          "overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-lg transition-all duration-300",
          isOpen ? "h-[420px]" : "h-0"
        )}
        onClick={menuCloseClickHandler}
      >
        <div className="flex flex-col gap-2 p-4">
          <NavItem link={"/dashboard"} Icon={<Home size={24} />} label="Home" />
          <NavItem
            link={"/dashboard/accounts"}
            Icon={<DollarSign size={24} />}
            label="Accounts"
          />
          <NavItem
            link={"/dashboard/transactions"}
            Icon={<ArrowLeftRight size={24} />}
            label="Transactions"
          />
          <NavItem
            link={"/dashboard/investissements"}
            Icon={<TrendingUp size={24} />}
            label="Investments"
          />
          <NavItem
            link={"/dashboard/faq"}
            Icon={<MessagesSquare size={24} />}
            label="FAQ"
          />

          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="group flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-white/10 transition-all hover:bg-red-500/20">
              <LogOut
                className="text-white/70 transition-all group-hover:text-red-500"
                size={24}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-xl bg-slate-900/95 p-4 backdrop-blur-lg"
        onClick={menuOpenClickHandler}
      >
        <h1 className="font-medium text-white">Menu</h1>
        <Plus
          className={cn(
            "text-white transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        />
      </div>
    </>
  );
};
