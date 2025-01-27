import { Camera, Home, LayoutGrid, Search, User } from "lucide-react";
import Link from "next/link";

export default function MobileNav() {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 right-0 text-indigo-900/90 font-bold ">
      <div className="flex  dark:bg-indigo-950 dark:text-indigo-200 ">
        {/* Left Links */}
        <div className="bg-indigo-50 w-full relative flex justify-around items-center rounded-t-xl  dark:bg-indigo-950 dark:text-indigo-200">
          <Link
            href="/"
            className="flex items-center justify-center transition-transform transform hover:scale-110 hover:text-indigo-600  dark:bg-indigo-950 dark:text-indigo-200"
          >
            <Home />
          </Link>
          <Link
            href="/search"
            className="flex items-center justify-center transition-transform transform hover:scale-110 hover:text-indigo-600  dark:bg-indigo-950 dark:text-indigo-200"
          >
            <Search />
          </Link>
        </div>

        {/* Center Button */}
        <div className="size-14 justify-center w-[140px] relative -top-[60px] -left-[50px] dark:-top-[30px] dark:-left-[25px] ">
          <div className="absolute border-indigo-50 dark:border-indigo-950 border-[50px] dark:border-[20px] border-t-transparent border-l-transparent rounded-full rotate-45  dark:bg-indigo-950 dark:text-indigo-200 ">
            <div className="border-8 size-15 border-transparent  dark:bg-indigo-950 dark:text-indigo-200">
              <Link
                href="/create"
                className="center-link -rotate-45 size-12 bg-gradient-to-tr from-blue-400 to-indigo-900 text-indigo-50 rounded-full flex items-center justify-center transition-transform transform hover:rotate-0 hover:scale-110 hover:from-blue-500 hover:to-indigo-700  dark:bg-indigo-950 dark:text-indigo-200`"
              >
                <Camera />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Links */}
        <div className="bg-indigo-50 w-full relative flex justify-around items-center rounded-t-xl  dark:bg-indigo-950 dark:text-indigo-200">
          <Link
            href="/browse"
            className="flex items-center justify-center transition-transform transform hover:scale-110 hover:text-indigo-600  dark:bg-indigo-950 dark:text-indigo-200`"
          >
            <LayoutGrid />
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center transition-transform transform hover:scale-110 hover:text-indigo-600"
          >
            <User />
          </Link>
        </div>
      </div>
    </div>
  );
}
