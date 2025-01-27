import { prisma } from "@/db"
import { Profile } from "@prisma/client"

import PostGridDetails from "./PostGridDetails"
import { getSessionEmailOrThrow } from "./postingAction"

export default async function HomePosts({ profiles }: { profiles: Profile[] }) {
  try {
    const posts = await prisma.posting.findMany({
      where: { authorEmail: { in: profiles.map((p) => p.email) } },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    })
    const authorEmail = await getSessionEmailOrThrow()
    const likes = await prisma.like.findMany({
      where: { postId: { in: posts.map((p) => p.id) }, authorEmail },
    })

    const bookMarks = await prisma.bookMark.findMany({
      where: {
        postId: { in: posts.map((p) => p.id) },
        authorEmail,
      },
    })
    return (
      <div>
        {posts.length ? (
          <>
            <PostGridDetails
              posts={posts}
              profiles={profiles}
              likes={likes}
              bookMarks={bookMarks}
            />
          </>
        ) : (
          <p>No posts </p>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error reading posts:", error)
    throw new Error("Error reading posts.")
  }
}
