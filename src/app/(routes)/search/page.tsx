import { Suspense } from "react"
import SearchForm from "../components/SearchForm"
import SearchResults from "../components/SearchResults"
import Spinner from "../components/Spinner"

type idParams = Promise<{queryItems:string}>

export default async function SearchPage(props: {
  searchParams: idParams
}) {
  const {queryItems}  = await props.searchParams
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
