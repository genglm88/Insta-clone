import ProfilePosts from "./ProfilePosts"
import { Profile } from "@prisma/client"

import ProfileDetailedContent from "./ProfileDetailedContent"
import ProfileNav from "./ProfileNav"

export default function ProfileContent({
  existingProfile,
  email,
}: {
  existingProfile: Profile
  email: string
}) {
  return (
    <main className="text-indigo-900/80 w-full font-semibold max-w-6xl mx-auto  dark:bg-indigo-950 dark:text-indigo-200">
      <ProfileDetailedContent existingProfile={existingProfile} />
      <ProfileNav rootname={"/profile"} />
      <section className="mt-4 ml-8">
        <ProfilePosts email={email} bookmarksOnly={false} />
      </section>
    </main>
  )
}
