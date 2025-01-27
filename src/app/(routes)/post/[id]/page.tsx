import { prisma } from "@/db"

import Image from "next/image"
import { Suspense } from "react"
import Avatar from "../../components/Avatar"
import SessionCommentsForm from "../../components/SessionCommentsForm"
import CommentsPosted from "../../components/CommentsPosted"
import { uniq } from "lodash"

import { getSessionEmailOrThrow } from "../../components/postingAction"
import LikesInfo from "../../components/LikesInfo"



export default async function SinglePostPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const existingPost = await prisma.posting.findFirstOrThrow({
    where: { id },
  })
  const postAuthor = await prisma.profile.findFirstOrThrow({
    where: { email: existingPost.authorEmail },
  })

  const postedComments = await prisma.comment.findMany({
    where: { postId: id },
  })

  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniq(postedComments.map((comment) => comment.authorEmail)) },
    },
  })

  const authorEmail = await getSessionEmailOrThrow()
  const isLikedByMe = await prisma.like.findFirst({where:{postId:id,authorEmail}})

  return (
    <div className="max-w-4xl grid p-8 md:grid-cols-2 gap-4 mt-12">
      <div className="flex  flex-col gap-4 items-start ">
        <Image
          className="rounded-xl "
          width={360}
          height={360}
          src={existingPost?.image as string}
          alt="post image"
        />
        <LikesInfo post={existingPost} myLike={isLikedByMe}/>
      </div>
      <div>
        <CommentsPosted
          postedText={existingPost.description || ""}
          postedTime={existingPost.createdAt}
          postAuthor={postAuthor}
        />

        <div className="">
          {postedComments.map((comment) => (
            <CommentsPosted
              key={comment.id}
              postedText={comment.commentText}
              postedTime={comment.createdAt}
              postAuthor={commentsAuthors.find(
                (author) => author.email === comment.authorEmail
              )}
            />
          ))}
        </div>

        <div className="grid grid-cols-5 mt-12">
          <Avatar src={postAuthor.avatar || ""} />
          <div className="col-span-4 ">
            <Suspense>
              <SessionCommentsForm postId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
