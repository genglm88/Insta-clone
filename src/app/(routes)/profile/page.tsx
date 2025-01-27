import { Suspense } from "react"
import Spinner from "../components/Spinner"

import ProfilePageContent from "../components/ProfilePageContent"

export default async function ProfilePage() {
  return <Suspense fallback={<Spinner />}>
    <ProfilePageContent />
  </Suspense>
}
