"use client";

import Image from "next/image";
import { useEffect } from "react";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-800 transition-colors duration-300">
      {/* <Navbar /> */}
      <div className="pb-12 pt-28 sm:pt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-900/70">
          <p className="text-sm font-normal text-gray-700 dark:text-gray-300">
            EMS is now public!
          </p>
        </div>
        <h1 className="max-w-4xl text-3xl font-thin md:text-6xl lg:text-4xl text-gray-900 dark:text-gray-100">
          One stop solution to handle all your{" "}
          <span className="text-amber-400">Employee Records</span> in here and
          now.
        </h1>
        <p className="mt-5 max-w-prose font-thin text-zinc-700 dark:text-zinc-300 sm:text-lg">
          EMS allows you to have maintain your employees and track the records
          of your employess at very ease.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/dashboard"
        >
          Sign In
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/emp_ss2.JPG"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white dark:bg-neutral-900  shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto pb-32 pt-32 max-w-5xl sm:pt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-thin text-3xl text-gray-900 dark:text-white sm:text-5xl">
              Start <span className="text-amber-400">chatting</span> with your{" "}
              <span className="text-amber-400">pdf</span> in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Chatting to your PDF files has never been easier than with EMS.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          {[
            {
              step: "Step 1",
              title: "Sign up for an account",
              desc: (
                <>
                  Either starting out with a free plan or choose our{" "}
                  <Link
                    href="/pricing"
                    className="text-amber-400 underline underline-offset-2"
                  >
                    pro plan
                  </Link>
                  .
                </>
              ),
            },
            {
              step: "Step 2",
              title: "Upload your employee excel file",
              desc: `We'll process your file and make it ready for you to chat with.`,
            },
            {
              step: "Step 3",
              title: "Start managing your employees",
              desc: `It's that simple. Try out EMS today - it really takes less than a minute.`,
            },
          ].map((item, i) => (
            <li key={i} className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 dark:border-zinc-600 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-normal text-amber-400">
                  {item.step}
                </span>
                <span className="text-xl font-normal text-gray-900 dark:text-white">
                  {item.title}
                </span>
                <span className="mt-2 text-zinc-700 dark:text-zinc-300">
                  {item.desc}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/emp_ss3.JPG"
                alt="uploading preview"
                width={1419}
                height={732}
                quality={100}
                className="rounded-md bg-white dark:bg-neutral-900 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
