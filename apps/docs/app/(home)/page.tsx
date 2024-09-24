import Link from "next/link";
import {
  FaFaceKiss,
  FaImage,
  FaImages,
  FaBolt
} from "react-icons/fa6";
import { FaCompressAlt } from "react-icons/fa";

import { Button } from "~/components/button";
import Footer from "~/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white bg-gradient-to-t from-[#F1F1FF] to-[#FFFFFF] text-black dark:text-white flex flex-col dark:bg-gradient-to-t dark:from-[#101023] dark:to-[#000000]">
      <main className="h-[calc(100vh-55px)] flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl text-left">
          <h1 className="text-5xl sm:text-6xl font-medium leading-tight mb-6">
            Store images with
            <br />
            a{" "}
            <span className="inline-block bg-gradient-to-b from-sky-400 to-sky-600 dark:from-sky-400 dark:to-sky-900 px-2 rounded text-white dark:text-white">
              fast
            </span>{" "}
            and{" "}
            <span className="inline-block bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-900 px-2 rounded text-white dark:text-white">
              smooth
            </span>{" "}
            experience
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl text-left">
            <FaImage className="inline-block mr-0.5" />
            {" "}High-quality image CDN
            <br />
            <FaImages className="inline-block mr-0.5" />
            {" "}Scanning & manipulation options
            <br />
            <FaBolt className="inline-block mr-0.5" />
            {" "}Easily remove background
            <br />
            <FaCompressAlt className="inline-block mr-0.5" />
            {" "}Image compression
            <br />
            <FaFaceKiss className="inline-block mr-0.5" />
            {" "}All done on our servers
          </p>
          <Link href="https://app.lapse.uno/">
            <Button
              size="lg"
              className="bg-black text-white dark:bg-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 border border-gray-500 text-left"
            >
              Get Started
              <svg
                className="inline-block w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6l6 6-6 6"
                />
              </svg>
            </Button>
          </Link>
          <Link href="/docs">
            <Button
              size="lg"
              className="bg-white text-black dark:bg-black dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-zinc-900 border border-gray-300 dark:border-gray-800 ml-4 text-left"
            >
              Documentation
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-end">
          <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww" alt="dog" className="ml-4 max-w-[600px] max-h-[600px] rounded-lg" />
          <p className="text-sm text-right text-gray-500 mt-2">
            image processed and saved in 0.02348s
            <br />compression ratio: 66.58%
            <br />bytes saved: 12,924 on 19,412</p>
        </div>
      </main>
      <Footer />
    </main>
  );
}
