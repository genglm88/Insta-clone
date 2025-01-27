"use client"
import { Button, TextArea } from "@radix-ui/themes"
import { postCommentAction } from "./postingAction"
import { useRouter } from "next/navigation"
import { useRef } from "react"

export default function CommentsForm({ postId }: { postId: string }) {
  const router = useRouter()
  const areaRef = useRef<HTMLTextAreaElement>(null)
  return (
    <form
      action={async (data) => {
        await postCommentAction(data)
        if (areaRef.current) {
          areaRef.current.value = ""
        }
        router.refresh()
      }}
      className=" dark:bg-indigo-800 dark:text-indigo-200"
    >
      <TextArea
        name="commentText"
        ref={areaRef}
        placeholder="please share your comments:"
      />
      <Button variant="classic" className="mt-2">
        Post your comment
      </Button>
      <input className="hidden" name="postId" defaultValue={postId} />
    </form>
  )
}
