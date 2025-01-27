"use client"
import { BookMark, Like, Posting, Profile } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Masonry from "react-masonry-css"
import LikesInfo from "./LikesInfo"
import BookMarkInfo from "./BookMarkInfo"

export default function PostGridDetails({
  posts,
  profiles,
  likes,
  authorEmail,
  bookMarks
}: {
  posts: Posting[]
  profiles: Profile[]
  likes: Like[]
  authorEmail: string
  bookMarks:BookMark[]
}) {
  return (
    <Masonry
      breakpointCols={{ default: 3, 1100: 2, 700: 1, 500: 1 }}
      className="flex -ml-4"
      columnClassName="pl-4 pr-4"
    >
      {posts.map((post, index) => {
        const profile = profiles.find((p) => p.email === post.authorEmail)
        const isLikedbyMe = likes?.find((l) => l.postId === post.id)
        const isBookMarkedByMe = bookMarks?.find((l) => l.postId === post.id)
        return (
          <Link key={index} href={`/post/${post.id}`} className=" ">
            <Image
              width={512}
              height={512}
              src={post.image as string}
              alt="posted images"
              className="rounded-lg mt-4 shadow-lg"
            />
            <div className="flex items-center justify-between lg:max-w-[512px]">
              <div className=" mt-2 flex items-center  gap-2">
                <Image
                  width={32}
                  height={32}
                  src={profile?.avatar as string}
                  alt="avatar images"
                  className="aspect-square rounded-full"
                />
                <span className="text-indigo-900/60 text-sm">
                  {profile?.name}
                </span>
              </div>
              <div className="flex  items-start gap-1 ">
                <LikesInfo post={post} myLike={isLikedbyMe || null} />
                <BookMarkInfo post={post} myBookMark = {isBookMarkedByMe || null} />
              </div>
            </div>
            <span className="inline-block text-indigo-900/80 text-xs lg:max-w-[512px] mt-2  dark:bg-indigo-950 dark:text-indigo-200">
              {post.description}
            </span>
            <div className="p-4"></div>
          </Link>
        )
      })}
    </Masonry>
  )
}
