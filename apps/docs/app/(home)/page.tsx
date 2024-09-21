import Link from "next/link";
import { SiSharex } from "react-icons/si";
import { FaFaceKiss } from "react-icons/fa6";
import {
  BiSolidCustomize,
  BiSolidFileImage,
  BiSolidImage,
} from "react-icons/bi";
import { Button } from "~/components/button";
import Footer from "~/components/footer";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-[#09090B] text-white flex flex-col"
      style={{
        backgroundImage:
          'url("https://pouch.jumpshare.com/preview/la3OERxfFo_rZu3dvXHwoBCwUpM4uJKnvFQgKwBMUmvf9u16uXRVLUP09iYy5sQpnlH0egcO4MjoQU0iHUykOYlAoSIcgeNbJzXdbxJJuts")',
        backgroundSize: "cover",
      }}
    >
      <main className="h-[calc(100vh-55px)] flex-grow flex items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Fluidly store your
            <br />
            images with a{" "}
            <span className="inline-block bg-gradient-to-b from-sky-400 to-sky-900 px-2 rounded">
              fast
            </span>{" "}
            and{" "}
            <span className="inline-block bg-gradient-to-b from-purple-400 to-purple-900 px-2 rounded">
              swift
            </span>{" "}
            service.
          </h1>
          <p className="text-lg text-gray-400 mb-8 mx-auto max-w-2xl">
            lapse provides a high-quality image CDN, featuring a variety of
            image scanning and manipulation options, including{" "}
            <BiSolidImage className="inline-block mr-1" />
            Converting to .webp{" "}
            <BiSolidFileImage className="inline-block mr-1" />
            Compressing images <FaFaceKiss className="inline-block mr-0" /> all
            done on our servers.
          </p>
          <Link href="/docs">
            <Button
              size="lg"
              className="bg-white text-black font-bold hover:bg-gray-200 border border-gray-500"
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
              className="bg-black text-white font-bold hover:bg-zinc-900 border border-gray-800 ml-4"
            >
              Documentation
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </main>
  );
}
