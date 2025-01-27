import { Suspense } from "react"
import BrowsePosts from "../components/BrowsePost"
import Spinner from "../components/Spinner"

export default async function BrowsePage() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowsePosts />
    </Suspense>
  )
}
