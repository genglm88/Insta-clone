"use client"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className="bg-indigo-900/60 fixed inset-0  dark:bg-indigo-950/70 dark:text-indigo-200"
    >
      <div className="bg-indigo-50 fixed rounded-xl shadow-lg  top-[100px] bottom-[250px] left-[50px] right-[50px] sm:inset-[140px] p-4  dark:bg-indigo-950/70 dark:text-indigo-200">
        <div
          onClick={(ev) => ev.stopPropagation()}
          className="inset-[5px]  absolute overflow-auto"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
