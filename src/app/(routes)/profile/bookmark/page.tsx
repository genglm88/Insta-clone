import { prisma } from "@/db"
import ProfileDetailedContent from "../../components/ProfileDetailedContent"
import ProfileNav from "../../components/ProfileNav"
import ProfilePosts from "../../components/ProfilePosts"

export default async function BookMarkPage({ email }: { email: string }) {
  const existingProfile = await prisma.profile.findFirst({ where: { email } })

  return (
    <main className="text-indigo-900/80 w-full font-semibold max-w-6xl mx-auto  dark:bg-indigo-950 dark:text-indigo-200">
      <ProfileDetailedContent existingProfile={existingProfile} />
      <ProfileNav rootname={"/profile"}/>
      <section className="mt-4 ml-8">
        <ProfilePosts email={email} bookmarksOnly={true} />
      </section>
    </main>
  )
}
