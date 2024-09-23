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
    <main
      className="min-h-screen bg-white dark:bg-[#09090B] text-black dark:text-white flex flex-col"
      style={{
        backgroundImage:
          'url("https://dxeul8wagn2zr.cloudfront.net/g7jsha%2Fpreview%2F60955795%2Fmain_large.png?response-content-disposition=inline%3Bfilename%3D%22main_large.png%22%3B&response-content-type=image%2Fpng&Expires=1727126719&Signature=bIIkpE9o7LkxY7kOgWfabJyz6wZZo4b9NHdfXKPMyDivYFG~Up9rHtxuG8CXWwOJUki2qOEa10-Uu2qcQl25j~TcRB5yTJurfRS4RgLoOAEqUJN4bnBOz4ciMcO7mPs9ptB3t9rbK0ob4Tmf-O2sG6QOGhczBILVgw2NmNutOMEFF005hQQe6JX2up-lkyTWu526pwLq~ttvHcyLXjrnJs1nBkujPUd-X9Ya4vkizwvoV68wDRTvhMpvV99~GKzRSx0eEU2q5S0UBZS01wLWg7TumQf3OIDHsdR1pb1uIvTxkfrqWB~DFVA5r~zXlPQRfbmtqmnXU2IqPYL3KK6HiA__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ")',
        backgroundSize: "cover",
      }}
    >
      <main className="h-[calc(100vh-55px)] flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl text-left">
          <h1 className="text-5xl sm:text-6xl font-medium leading-tight mb-6">
            Store images with
            <br />
            a{" "}
            <span className="inline-block bg-gradient-to-b from-sky-400 to-sky-600 dark:from-sky-400 dark:to-sky-900 px-2 rounded text-white">
              fast
            </span>{" "}
            and{" "}
            <span className="inline-block bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-400 dark:to-purple-900 px-2 rounded text-white">
              smooth
            </span>{" "}
            experience
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl text-left">
            <FaImage className="inline-block mr-0.5" />
            {" "}High-quality image CDN
            <br />
            <FaImages className="inline-block mr-0.5" />
            {" "}Image scanning & manipulation options
            <br />
            <FaBolt className="inline-block mr-0.5" />
            {" "}Easily remove background from image
            <br />
            <FaCompressAlt className="inline-block mr-0.5" />
            {" "}Image compression
            <br />
            <FaFaceKiss className="inline-block mr-0.5" />
            {" "}All done on our servers
          </p>
          <Link href="/login">
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
              Read the docs
            </Button>
          </Link>
        </div>
        <div className="text-lmt-8">
            <h2 className="text-3xl font-medium text-right mb-4">Integrate in a matter of minutes</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                text
              </p>
          </div>
      </main>
      <Footer />
    </main>
  );
}
