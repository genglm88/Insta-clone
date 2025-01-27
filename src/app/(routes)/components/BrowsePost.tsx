import { prisma } from "@/db"

import PostGrid from "./PostGrid"

import { getSessionEmailOrThrow } from "./postingAction"

export default async function BrowsePosts() {
  try {
    const authorEmail = await getSessionEmailOrThrow()

    const followering = await prisma.follower.findMany({
      where: { authorEmail },
    }) 

    const followingProfiles = await prisma.profile.findMany({
      where: { id: { in: followering.map((f) => f.followedProfileId) } },
    })

    const posts = await prisma.posting.findMany({
      where: {
        OR: [
          { authorEmail: { in: followingProfiles.map((p) => p.email) } },
          { authorEmail },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 100,
    })

    // const likes = await prisma.like.findMany({
    //   where: { postId: { in: posts.map((p) => p.id) }, authorEmail },
    // })
    return (
      <div className="px-4">
        {posts.length ? (
          <>
            <PostGrid posts={posts} />
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
