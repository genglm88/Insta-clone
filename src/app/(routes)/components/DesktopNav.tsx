import Image from "next/image";
import { Camera, Home, LayoutGrid, Search, User } from "lucide-react";
import Link from "next/link";

export default function DesktopNav() {
  return (
    <div className="hidden md:block w-48 p-4 bg-indigo-50 shadow-xl shadow-gray-300 text-indigo-900/80 font-bold text-lg  dark:bg-indigo-950 dark:text-indigo-200">
      <div className="sticky top-0">
        {/* Logo */}
        <Image
          className="dark:invert"
          width={128}
          height={128}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png"
          alt="logo"
        />

        {/* Navigation Links */}
        <div className="flex flex-col mt-6 space-y-8">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <Home />
            <span>Home</span>
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <Search />
            <span>Search</span>
          </Link>
          <Link
            href="/create"
            className="flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <Camera />
            <span>Create</span>
          </Link>
          <Link
            href="/browse"
            className="flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <LayoutGrid />
            <span>Browse</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <User />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
