import Image from "next/image"
import LikesInfo from "./LikesInfo"
import CommentsPosted from "./CommentsPosted"
import Avatar from "./Avatar"
import { Suspense } from "react"
import SessionCommentsForm from "./SessionCommentsForm"
import { BookMark, Comment, Like, Posting, Profile } from "@prisma/client"
import { getSessionEmailOrThrow } from "./postingAction"
import { prisma } from "@/db"
import BookMarkInfo from "./BookMarkInfo"

export default async function SinglePostContent({
  id,
  existingPost,
  postAuthor,
  postedComments,
  commentsAuthors,
  isLikedByMe,
  isBookMarkedByMe,
}: {
  id: string
  existingPost: Posting
  postAuthor: Profile
  postedComments: Comment[]
  commentsAuthors: Profile[]
  isLikedByMe: Like | null
  isBookMarkedByMe: BookMark| null
}) {
  const commentAuthorEmail = await getSessionEmailOrThrow()
  const commentAuthorProfile = await prisma.profile.findFirst({
    where: { email: commentAuthorEmail },
  })
  return (
    <div className="max-w-4xl grid p-8 md:grid-cols-2 gap-4 mt-12  dark:bg-indigo-800 dark:text-indigo-200 rounded-lg">
      <div className="flex  flex-col gap-4 items-start lg:max-w-[360px]">
        <Image
          className="rounded-xl "
          width={360}
          height={360}
          src={existingPost?.image as string}
          alt="post image"
        />

        <div className="flex  w-full items-center justify-end gap-1 ">
          <div className="flex gap-1">
          <LikesInfo post={existingPost} myLike={isLikedByMe} />
          <BookMarkInfo post={existingPost} myBookMark={isBookMarkedByMe } />
          </div>
        </div>
      </div>
      <div>
        <CommentsPosted
          postedText={existingPost.description || ""}
          postedTime={existingPost.createdAt}
          postAuthor={postAuthor}
        />

        <div className="">
          {postedComments.map((singleComment) => (
            <CommentsPosted
              key={singleComment.id}
              postedText={singleComment.commentText}
              postedTime={singleComment.createdAt}
              postAuthor={commentsAuthors.find(
                (author) => author.email === singleComment.authorEmail
              )}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2 lg:grid lg:grid-cols-5 mt-12">
          <Avatar src={commentAuthorProfile?.avatar || ""} />
          <div className="lg:col-span-4 ">
            <Suspense>
              <SessionCommentsForm postId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
