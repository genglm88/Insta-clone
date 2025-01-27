"use client"

import { Button, Slider, Switch, TextArea, TextField } from "@radix-ui/themes"

import { settingFormAction } from "./settingFormAction"
import { useRouter } from "next/navigation"
import { Profile } from "next-auth"
import { CloudUploadIcon, SlidersIcon } from "lucide-react"
import { useRef, useState } from "react"
import Image from "next/image"
import useUploadSingleImageFile from "@/utils/uploadSingleImage"

export default function SettingsForm({
  userEmail,
  profile,
}: {
  userEmail: string
  profile?: Profile
}) {
  const router = useRouter()
  const fileInRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>(profile?.avatar as string)
  const [isUploading, setIsUploading] = useState(false)

  useUploadSingleImageFile(file, setAvatarUrl, setIsUploading)
  //console.log({avatarUrl})

  return (
    <form
      action={async (data: FormData) => {
        await settingFormAction(data, userEmail)
        router.push("/profile")
        router.refresh()
      }}
    >
      <input
        className="hidden"
        name="avatar"
        value={avatarUrl}
        onChange={(e) => console.log(e)}
      />
      <div className="flex items-center gap-2">
        <div>
          <div className="bg-indigo-800/10  rounded-full overflow-hidden  dark:bg-indigo-950 dark:text-indigo-200">
            {avatarUrl && (
              <Image
                className="w-24 h-24 object-cover"
                src={avatarUrl}
                alt="avatar image"
                width={96}
                height={96}
              />
            )}
          </div>
        </div>
        <div>
          <input
            type="file"
            ref={fileInRef}
            onChange={(ev) => setFile(ev.target.files?.[0] || null)}
            className="hidden"
          />
          <Button
            type="button"
            variant="surface"
            onClick={() => fileInRef.current?.click()}
          >
            {!isUploading && <CloudUploadIcon />}
            {isUploading ? "Uploading" : "Change avatar"}
          </Button>
        </div>
      </div>
      <p className="mt-4 text-indigo-900/80 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
        username
      </p>
      <TextField.Root
        name="username"
        defaultValue={profile?.username as string}
        placeholder="username"
      />
      <p className="mt-2 text-indigo-900/80 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
        name
      </p>
      <TextField.Root
        name="name"
        defaultValue={profile?.name as string}
        placeholder="your name"
      />
      <p className="mt-2 text-indigo-900/80 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
        subtitle
      </p>
      <TextField.Root
        name="subtitle"
        defaultValue={profile?.subtitle as string}
        placeholder="Graphic desinger"
      />
      <p className="mt-2 text-indigo-900/80 font-semibold  dark:bg-indigo-950 dark:text-indigo-200">
        bio
      </p>
      <TextArea className="" name="bio" defaultValue={profile?.bio as string} />

      <label className="flex items-center gap-1 mt-4 mb-10">
        <span>Dark Mode: </span>{" "}
        <Switch
          onCheckedChange={(isDark) => {
            const html = document.querySelector("html")
            if (html) {
              const theme = isDark ? "dark" : "light"
              html.dataset.theme = theme
            }
          }}
          variant="surface"
        />
      </label>
      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  )
}
