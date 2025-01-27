import { Suspense } from "react"
import Spinner from "./components/Spinner"
import HomePageContent from "./components/HomePageContent"

export default async function Home() {
  return (
    <Suspense fallback={<Spinner />}>
      <HomePageContent />
    </Suspense>
  )
}
