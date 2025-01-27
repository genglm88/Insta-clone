import { auth } from "@/auth"

import { redirect } from "next/navigation"
import { prisma } from "@/db"

import ProfileContent from "../components/ProfileContent"
export default async function ProfilePageContent() {
  const session = await auth()

  const email = session?.user?.email
  if (!email) {
    redirect("/") // Redirect if user is not authenticated
  }

  const existingProfile = await prisma.profile.findFirst({
    where: { email },
  })

  // console.log(existingProfile)

  if (!existingProfile) redirect("/settings")
  return <ProfileContent existingProfile={existingProfile} email={email} />
}
