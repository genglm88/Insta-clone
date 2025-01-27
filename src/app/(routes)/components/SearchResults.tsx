import { prisma } from "@/db"

import PostGrid from "./PostGrid"
import ProfileSearchItems from "./ProfileSearchItems"

export default async function SearchResults({
  queryItems,
}: {
  queryItems: string
}) {
  try {
    const userProfiles = await prisma.profile.findMany({
      where: {
        OR: [
          { username: { contains: queryItems } },
          { email: { contains: queryItems } },
        ],
      },
      take: 10, //max 10 profiles
    })

    const posts = await prisma.posting.findMany({
      where: {
        description: { contains: queryItems },
      },
      take: 10,
    })
    return (
      <main className="text-indigo-900/80 font-semibold mt-4  dark:bg-indigo-950 dark:text-indigo-200">
        {userProfiles.length ? (
          <>
            <p>Search results for &quot;{queryItems}&quot;</p>
            <div  className="flex gap-4 flex-wrap mb-4 mt-2">
              {" "}
              {userProfiles.map((singleProfile) => (
                <ProfileSearchItems
                  key={singleProfile.id}
                  existingProfile={singleProfile}
                />
              ))}
            </div>
          </>
        ) : (
          <p>No profile results for &quot;{queryItems}&quot;</p>
        )}

        {posts.length ? (
          <>
            <p>Post results for &quot;{queryItems}&quot;</p>
            <PostGrid posts={posts} />
          </>
        ) : (
          <p>No posts for &quot;{queryItems}&quot;</p>
        )}
      </main>
    )
  } catch (error) {
    console.error("Error searching for the query items:", error)
    throw new Error("Error with searching items")
  }
}
