"use client"
import { Posting } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import Masonry from "react-masonry-css"

// const images = [
//   "https://picsum.photos/id/200/1024/768",
//   "https://picsum.photos/id/201/768/1024",
//   "https://picsum.photos/id/202/1024/768",
//   "https://picsum.photos/id/203/768/1024",
//   "https://picsum.photos/id/204/1024/768",
//   "https://picsum.photos/id/222/768/1024",
//   "https://picsum.photos/id/206/1024/768",
//   "https://picsum.photos/id/237/768/1024",
//   "https://picsum.photos/id/208/1024/768",
//   "https://picsum.photos/id/209/768/1024",
//   "https://picsum.photos/id/210/1024/768",
//   "https://picsum.photos/id/211/768/1024",
//   "https://picsum.photos/id/388/1024/768",
//   "https://picsum.photos/id/301/768/1024",
//   "https://picsum.photos/id/302/1024/768",
//   "https://picsum.photos/id/390/768/1024",
//   "https://picsum.photos/id/304/1024/768",
//   "https://picsum.photos/id/322/768/1024",
//   "https://picsum.photos/id/306/1024/768",
//   "https://picsum.photos/id/337/768/1024",
//   "https://picsum.photos/id/308/1024/768",
//   "https://picsum.photos/id/309/768/1024",
//   "https://picsum.photos/id/310/1024/768",
//   "https://picsum.photos/id/311/768/1024",
//   "https://picsum.photos/id/200/1024/768",
//   "https://picsum.photos/id/201/768/1024",
//   "https://picsum.photos/id/202/1024/768",
//   "https://picsum.photos/id/203/768/1024",
//   "https://picsum.photos/id/204/1024/768",
//   "https://picsum.photos/id/222/768/1024",
//   "https://picsum.photos/id/206/1024/768",
//   "https://picsum.photos/id/237/768/1024",
//   "https://picsum.photos/id/208/1024/768",
//   "https://picsum.photos/id/209/768/1024",
//   "https://picsum.photos/id/210/1024/768",
//   "https://picsum.photos/id/211/768/1024",
//   "https://picsum.photos/id/388/1024/768",
//   "https://picsum.photos/id/301/768/1024",
//   "https://picsum.photos/id/302/1024/768",
//   "https://picsum.photos/id/390/768/1024",
//   "https://picsum.photos/id/304/1024/768",
//   "https://picsum.photos/id/322/768/1024",
//   "https://picsum.photos/id/306/1024/768",
//   "https://picsum.photos/id/337/768/1024",
//   "https://picsum.photos/id/308/1024/768",
//   "https://picsum.photos/id/309/768/1024",
//   "https://picsum.photos/id/310/1024/768",
//   "https://picsum.photos/id/311/768/1024",
// ]

export default function PostGrid({ posts }: { posts: Posting[] }) {
  return (
    <Masonry
      breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
      className="flex -ml-4"
      columnClassName="pl-4 pr-4"
    >
      {posts.map((post, index) => {
        return (
          <Link
            key={index}
            href={`/post/${post.id}`}
            className="  "
          >
            <Image
              width={512}
              height={512}
              src={post.image as string}
              alt="posted images"
              className="rounded-lg mt-4 shadow-lg"
            />
          </Link>
        )
      })}
    </Masonry>
  )
}
