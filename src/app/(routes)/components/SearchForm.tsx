"use client"
import { TextField } from "@radix-ui/themes"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchForm() {
  const router = useRouter()
  return (
    <form
      action={async (data: FormData) => {
        router.push("/search?queryItems=" + data.get("queryItems"))
      }}
    >
      <TextField.Root name="queryItems" placeholder="posts or users ...">
        <TextField.Slot>
          <SearchIcon />
        </TextField.Slot>
      </TextField.Root>
    </form>
  )
}
