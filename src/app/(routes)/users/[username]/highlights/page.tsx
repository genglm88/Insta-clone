import ProfileDetailedContent from "@/app/(routes)/components/ProfileDetailedContent"
import ProfileNav from "@/app/(routes)/components/ProfileNav"
import ProfilePosts from "@/app/(routes)/components/ProfilePosts"
import { prisma } from "@/db"
import { idParams } from "../bookmark/page"

export default async function UserHightlightsPage(props:{params:idParams}) {
  const { username } =  await props.params

  const existingProfile = await prisma.profile.findFirst({
    where: { username },
  })

  return (
    <main className="text-indigo-900/80 w-full font-semibold max-w-6xl mx-auto  dark:bg-indigo-950 dark:text-indigo-200">
      <ProfileDetailedContent existingProfile={existingProfile} />
      <ProfileNav rootname={"/users/" + username} />
      <section className="mt-4 ml-8">
        {existingProfile && (
          <ProfilePosts email={existingProfile?.email} bookmarksOnly={true} />
        )}
      </section>
    </main>
  )
}
