"use client"
import { Like, Posting } from "@prisma/client"
import { HeartIcon } from "lucide-react"
import { deLikePost, likePost } from "./postingAction"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LikesInfo({
  post,
  myLike,
}: {
  post: Posting
  myLike: Like | null
}) {
  const router = useRouter()
  const [myLikeItem, setMyLikeItem] = useState(!!myLike)
  return (
    <div className="flex w-full justify-end">
      <div className="flex  text-xs items-centern justify-end  text-indigo-900/60 lg:gap-2  dark:bg-indigo-950 dark:text-indigo-200">
        <form
          action={async (data: FormData) => {
            setMyLikeItem((prev) => !prev)
            if (myLikeItem) {
              await deLikePost(data)
            } else {
              await likePost(data)
            }

            router.refresh()
          }}
          className="flex flex-col lg:flex-row w-full items-start lg:items-center gap-1"
        >
          <input className="hidden" name="postId" defaultValue={post.id} />
          <button type="submit">
            <HeartIcon
              className={myLikeItem ? "text-red-500/60 fill-red-500/90 " : ""}
            />
          </button>
          <p className="hidden lg:block w-full whitespace-nowrap "> {post.likeCount} people like this</p>
        </form>
      </div>
    </div>
  )
}
