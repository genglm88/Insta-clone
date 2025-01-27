"use client"
import { BookMark, Posting } from "@prisma/client"
import { BookmarkIcon } from "lucide-react"
import { deBookMarkPost, bookMarkPost } from "./postingAction"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function BookMarkInfo({
  post,
  myBookMark,
}: {
  post: Posting
  myBookMark: BookMark | null
}) {
  const router = useRouter()
  const [myBookMarkItem, setMyBookMarkItem] = useState(!!myBookMark)
  return (
    <div className="flex w-full justify-end">
      <div className="flex  text-xs items-centern justify-end  text-indigo-900/60 lg:gap-2  dark:bg-indigo-950 dark:text-indigo-200">
      <form
        action={async (data: FormData) => {
          setMyBookMarkItem((prev) => !prev)
          if (myBookMarkItem) {
            await deBookMarkPost(data)
          } else {
            await bookMarkPost(data)
          }

          router.refresh()
        }}
        className="flex flex-col lg:flex-row items-start lg:items-center gap-2"
      >
        <input className="hidden" name="postId" defaultValue={post.id} />
        <button type="submit">
          <BookmarkIcon
            className={myBookMarkItem ? "text-red-500/60 fill-red-500/90 " : ""}
          />
        </button>
       
      </form>
    </div>
    </div>
  )
}