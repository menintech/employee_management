"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconCreditCard,
  IconDashboard,
  IconHomeMove,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const links = [
    {
      label: "Dashboard",
      redirectTo: "/",
      icon: (
        <IconDashboard className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Home",
    //   redirectTo: "home",
    //   icon: <IconHomeMove className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    // },
    {
      label: "Add Employees",
      redirectTo: "addEmployee",
      icon: <IconUserPlus className="text-neutral-900 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Employees",
      redirectTo: "listEmployee",
      icon: (
        <IconUsersGroup className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Subscription",
      redirectTo: "subscription",
      icon: (
        <IconCreditCard className="text-neutral-900 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          " flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={false}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: `${user?.primaryEmailAddress?.emailAddress}`,
                  redirectTo: "#",
                  icon: (
                    <Avatar className="h-7 w-7">
                      <UserButton />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1">
          <div className="p-2 md:p-10  bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image src={"/menintech3.svg"} width={30} height={30} alt="premium" />

      <span className="font-medium text-black dark:text-white whitespace-pre">
        MenIntech
      </span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}
      <Image src={"/menintech3.svg"} width={30} height={30} alt="premium" />

      <span className="font-medium text-black dark:text-white whitespace-pre">
        MenIntech
      </span>
    </Link>
  );
};

export default DashboardLayout;
