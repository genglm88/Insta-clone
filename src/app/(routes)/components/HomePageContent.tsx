import { auth, signIn } from "@/auth"
import UserHome from "./UserHome"


export default async function HomePageContent() {
  const session = await auth()

  if (!session)
    return (
      <div className="card-container">
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
      </div>
    )
  return <div className="card-container">
    <UserHome session={session} />
  
  </div>
}
