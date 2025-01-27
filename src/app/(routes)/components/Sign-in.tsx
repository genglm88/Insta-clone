import { auth, signIn, signOut } from "@/auth"
import Image from "next/image"

export default async function SignIn() {
  const session = await auth()

  if (!session)
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit" className="btn-blue">
          {" "}
          Signin with Google{" "}
        </button>
      </form>
    )

  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-32 px-3 py-6 dark:bg-indigo-800 rounded-xl dark:text-indigo-200">
       <div className="flex flex-col gap-1">
        
        <div className="flex gap-2 items-center">
          <span>{session?.user?.name}</span>
          <Image
            width={24}
            height={24}
            src={session?.user?.image || ""}
            alt=""
          />
        </div>
        <div><span>{session?.user?.email}</span></div>
       </div>

        <button type="submit" className="btn-delete whitespace-nowrap">
          Sign out
        </button>
      </div>
    </form>
  )
}
