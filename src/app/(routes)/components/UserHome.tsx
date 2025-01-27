import HomeTopRow from "./HomeTopRow"
import { prisma } from "@/db"
import { getSessionEmailOrThrow } from "./postingAction"
import HomePosts from "./HomePosts"

export default async function UserHome() {
  try {
    const email = await getSessionEmailOrThrow()
    // const userProfile = await prisma.profile.findFirst({
    //   where: { email },
    // })
    // const followers = await prisma.follower.findMany({
    //   where: { followedProfileId: userProfile?.id },
    // })

    // const followerProfiles = await prisma.profile.findMany({
    //   where: {
    //     id: { in: followers.map((follower) => follower.authorProfileId) },
    //   },
    // })

    const followering = await prisma.follower.findMany({
      where: { authorEmail: email },
    })

    const followingProfiles = await prisma.profile.findMany({
      where: { id: { in: followering.map((f) => f.followedProfileId) } },
    })

    return (
      <div className="">
        <HomeTopRow followingProfiles={followingProfiles} />
        <HomePosts profiles={followingProfiles} />
      </div>
    )
  } catch (error) {
    console.error("Error locating followers:", error)
    throw new Error("Error locating followers")
  }
}
