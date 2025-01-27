"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ProfileNav({rootname}:{rootname:string}) {
  const pathname= usePathname()
  const highlightActive = pathname.includes("/highlights")
  const bookmarkActive = pathname.includes("/bookmark")
  const postActive = !highlightActive && !bookmarkActive
  return (
    <div>
      <section className="flex justify-center gap-4 mt-4 font-bold  dark:bg-indigo-950 dark:text-indigo-200">
        <Link
          href={rootname}
          className={
            postActive ? "font-bold text-indigo-900  dark:bg-indigo-950 dark:text-indigo-200" : "text-indigo-900/60  dark:bg-indigo-950 dark:text-indigo-500"
          }
        >
          Posts
        </Link>
        <Link
          className={
            highlightActive ? "font-bold text-indigo-900  dark:bg-indigo-950 dark:text-indigo-200" : "text-indigo-900/60  dark:bg-indigo-950 dark:text-indigo-500"
          }
          href={rootname + "/highlights"}
        >
          Highlights
        </Link>
        <Link
          className={
            bookmarkActive ? "font-bold text-indigo-900  dark:bg-indigo-950 dark:text-indigo-200" : "text-indigo-900/60  dark:bg-indigo-950 dark:text-indigo-500"
          }
          href={rootname + "/bookmark"}
        >
          BookMarks
        </Link>
      </section>
    </div>
  )
}
