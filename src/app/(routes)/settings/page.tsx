import SettingsForm from "../components/SettingsForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/db"
import SignIn from "../components/Sign-in"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect("/") // Redirect if user is not authenticated
  }
  const userEmail = session?.user?.email
  const existingProfile = await prisma.profile.findFirst({
    where: { email: userEmail },
  })

  return (
    <div className="max-w-lg  mx-auto text-indigo-900/80  dark:bg-indigo-950 dark:text-indigo-200">
      <h2 className="my-4 font-bold text-2xl">Profile settings</h2>

      <SettingsForm userEmail={userEmail} profile={existingProfile || undefined} />
      <div className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg shadow-md  dark:bg-indigo-800 dark:text-indigo-200 mt-8">
          <SignIn />
         </div>
    </div>
  )
}
