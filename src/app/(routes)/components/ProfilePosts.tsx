import { prisma } from "@/db"
import PostGrid from "./PostGrid"

export default async function ProfilePosts({
  email,
  bookmarksOnly = false,
}: {
  email: string 
  bookmarksOnly: boolean
}) {
  const bookMarks = await prisma.bookMark.findMany({
    where: { authorEmail: email },
  })

  let posts = []
  if (bookmarksOnly) {
    posts = await prisma.posting.findMany({
      where: {
        id: { in: bookMarks.map((b) => b.postId) },
      },
      orderBy:{createdAt:'desc'},
    })
  } else {
    posts = await prisma.posting.findMany({
      where: {
        OR: [
          { authorEmail: email },
          { id: { in: bookMarks.map((b) => b.postId) } },
        ],
      },
      orderBy:{createdAt:'desc'},
    })
  }

  return <PostGrid posts={posts} />
}
