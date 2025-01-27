import { Follower, Profile } from "@prisma/client"
import FollowButton from "./FollowButton"
import ProfileDetailedContent from "./ProfileDetailedContent"
import ProfileNav from "./ProfileNav"
import ProfilePosts from "./ProfilePosts"

export default function ProfileContentWithFollow({
  userProfile,
  followedProfile = null,
  userEmail,
  rootname,
}: {
  userProfile: Profile
  followedProfile?: Follower | null
  userEmail: string
  rootname:string
}) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <ProfileDetailedContent existingProfile={userProfile} />
      <ProfileNav rootname={rootname}/>
      {userProfile.email !== userEmail && (
        <FollowButton
          followedProfileId={userProfile.id}
          notYetFollowed={!!!followedProfile}
        />
      )}
        <section className="mt-4 ml-8">
              <ProfilePosts email={userProfile.email} bookmarksOnly={false}/>
            </section>
    </div>
  )
}
