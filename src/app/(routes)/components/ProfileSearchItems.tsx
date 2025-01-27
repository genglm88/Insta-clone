import { Profile } from "@prisma/client"

import Image from "next/image"
import Link from "next/link"

export default function ProfileSearchItems({
  existingProfile,
}: {
  existingProfile: Profile
}) {
  return (
    <Link
      href={`/users/${existingProfile.username}`}
      className="flex  items-center gap-4"
    >
      <div className=" flex items-center justify-center ">
        <div className="size-22 p-2 bg-gradient-to-tr from-blue-100 to-indigo-800 flex items-center justify-center rounded-full  dark:bg-indigo-950 dark:text-indigo-200">
          <div className="size-22 p-1 bg-indigo-50 flex items-center justify-center rounded-full  dark:bg-indigo-950 dark:text-indigo-200">
            <div className="size-18  overflow-hidden rounded-full">
              <Image
                width={128}
                height={128}
                src={existingProfile.avatar as string}
                alt="professional man"
                className="aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-indigo-900/60 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
        <span>{existingProfile.name}</span>
        <span className="w-18 text-xs">{existingProfile.email}</span>
      </div>
    </Link>
  )
}
