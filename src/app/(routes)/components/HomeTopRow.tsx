import { PlusIcon } from "lucide-react"
import ProfileHeadItems from "./ProfileHeadItems"
import { Profile } from "@prisma/client"

export default async function HomeTopRow({
  followingProfiles,
}: {
  followingProfiles: Profile[]
}) {
  return (
    <main className="text-indigo-900/80 font-semibold mt-4   dark:bg-indigo-950 dark:text-indigo-200">
      <div className="flex  gap-4">
        <div className="flex ">
          <div className="flex flex-col items-center gap-2  ">
            <button className="size-40 rounded-full bg-gradient-to-tr from-blue-300 to-indigo-900 flex items-center justify-center  dark:bg-indigo-950 dark:text-indigo-200 ">
              <PlusIcon size={70} color={"#FFF"} />
            </button>
            <span>New Story</span>
          </div>
        </div>

        {followingProfiles.map((singleProfile) => (
          <ProfileHeadItems
            key={singleProfile.id}
            existingProfile={singleProfile}
          />
        ))}
      </div>

      {/* {followerProfiles.length ? (
          <>
            <p>Followed by</p>
            <div className="flex gap-4 flex-wrap ">
              {" "}
              {followerProfiles.map((singleProfile) => (
                <ProfileSearchItems
                  key={singleProfile.id}
                  existingProfile={singleProfile}
                />
              ))}
            </div>
          </>
        ) : (
          <p>Not followed by anyone</p>
        )} */}
    </main>
  )
}
