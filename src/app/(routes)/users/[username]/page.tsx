import { prisma } from "@/db"

import { getSessionEmailOrThrow } from "../../components/postingAction"

import ProfileContentWithFollow from "../../components/ProfileContentWithFollow("
import { idParams } from "./bookmark/page"

export default async function UserPage(props:{params:idParams}) {
  const { username } =  await props.params
  const userEmail = await getSessionEmailOrThrow()
  try {
    const userProfile = await prisma.profile.findFirst({
      where: {
        username,
      },
    })
    const followedProfile = await prisma.follower.findFirst({
      where: { followedProfileId: userProfile?.id, authorEmail: userEmail },
    })

    if (userProfile) {
      return (
        <ProfileContentWithFollow
          userProfile={userProfile}
          followedProfile={followedProfile} 
          userEmail={userEmail}
          rootname={'/users/'+username}
        />
      )
    } else {
      return <div>User not found</div>
    }
  } catch (error) {
    console.error("Error searching the username", error)
  }
}
