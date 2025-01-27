import { Profile } from "@prisma/client"
import { ArrowLeft, Check, Contact, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function ProfileDetailedContent({
  existingProfile,
}: {
  existingProfile: Profile | null
}) {
  return (
    <div className="max-w-6xl w-full">
      <section >
        <div className="flex flex-wrap items-center p-6 gap-8 rounded-lg shadow-md shadow-gray-100 justify-between  dark:bg-indigo-950 dark:text-indigo-200">
          <div>
            <ArrowLeft />
          </div>
          <div className="flex gap-2">
            <span>{existingProfile?.username}</span>
            <div className="text-blue-600 bg-indigo-200 last-of-type:rounded-full">
              {" "}
              <Check />
            </div>
          </div>
          <Link href="/settings" className="flex gap-1">
            <Settings />
            {/* <Image
              width={24}
              height={24}
              src={session?.user?.image as string}
              alt=""
            /> */}
          </Link>
        </div>
      </section>
      <section>
        <div className="mt-12 flex items-center justify-center ">
          <div className="size-54 p-2 bg-gradient-to-tr from-blue-100 to-indigo-800 flex items-center justify-center rounded-full  dark:bg-indigo-950 dark:text-indigo-200">
            <div className="size-50 p-2 bg-indigo-50 flex items-center justify-center rounded-full  dark:bg-indigo-950 dark:text-indigo-200">
              <div className="size-48  overflow-hidden rounded-full">
                <Image
                  width={256}
                  height={256}
                  src={existingProfile?.avatar as string}
                  alt="professional man"
                  className="aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8 text-center flex flex-col justify-center">
        <h1 className="text-xl ">{existingProfile?.name}</h1>
        <p className="text-indigo-900/60 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
          {existingProfile?.subtitle}
        </p>
        <p className=" text-indigo-900/50 max-w-lg mx-auto  dark:bg-indigo-950 dark:text-indigo-200">
          {existingProfile?.bio}
        </p>
        <div className="flex justify-center items-center">
          <Contact size={16} />
          <span>: {existingProfile?.email}</span>
        </div>
      </section>
    </div>
  )
}
