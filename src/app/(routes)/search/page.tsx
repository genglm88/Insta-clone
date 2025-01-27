import { Suspense } from "react"
import SearchForm from "../components/SearchForm"
import SearchResults from "../components/SearchResults"
import Spinner from "../components/Spinner"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { queryItems: string }
}) {
  const {queryItems}  = await searchParams
  return (
    <div>
      <div className="mx-auto max-w-6xl p-4 ">
        <SearchForm />
        <Suspense fallback={<Spinner />}>
          <SearchResults queryItems = {queryItems}/>
        </Suspense>
      </div>
    </div>
  )
}
