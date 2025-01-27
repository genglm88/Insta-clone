import { Profile } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

export default function ProfileHeadItems({
  existingProfile,
}: {
  existingProfile: Profile
}) {
  return (
    <Link
      href={`/users/${existingProfile.username}`}
      className="flex flex-col items-center justify-center gap-1"
    >
      <div className=" flex items-center justify-center ">
        <div className="size-22 p-2 bg-gradient-to-tr from-blue-100 to-indigo-800 flex items-center justify-center rounded-full  dark:bg-indigo-950 dark:text-indigo-200">
          <div className="size-22 p-1 bg-indigo-50 flex items-center justify-center rounded-full">
            <div className="size-18 aspect-square overflow-hidden rounded-full">
              <Image
                width={128}
                height={128}
                src={existingProfile.avatar as string}
                alt="professional man"
              />
            </div>
          </div>
        </div>
      </div>
     
        <span className=" text-indigo-900/60 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">{existingProfile.name}</span>
     
    
    </Link>
  )
}
