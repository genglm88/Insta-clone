"use client"
import { Button } from "@radix-ui/themes"
import { UserMinus, UserMinusIcon, UserPlusIcon } from "lucide-react"
import { followProfile, unFollowProfile } from "./postingAction"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FollowButton({
  followedProfileId,
  notYetFollowed,
}: {
  followedProfileId: string
  notYetFollowed: boolean
}) {
  const router = useRouter()
  const [alreadyFollowed, setAlreadyFollowed] = useState<boolean>(!notYetFollowed)
  return (
    <form
      action={async () => {
        if (notYetFollowed) {
          await followProfile(followedProfileId)
        } else {
          await unFollowProfile(followedProfileId)
        }
        router.refresh()
        setAlreadyFollowed(prev=>!prev)
      }}
    >
      <Button
        variant="solid"
        className={"mt-4 w-32 " + (!alreadyFollowed? 'bg-gradient-to-tr from-blue-300 to-indigo-900': 'bg-gradient-to-tr from-yellow-200 to-red-800') }
      >
       {!alreadyFollowed? (<span className="flex gap-2 items-center"><UserPlusIcon /> Follow</span >):(<span className="flex gap-2 items-center">< UserMinusIcon/>Unfollow</span>) }
        
      </Button>
    </form>
  )
}
