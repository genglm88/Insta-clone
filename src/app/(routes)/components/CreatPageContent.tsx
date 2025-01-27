"use client"

import useUploadSingleImageFile from "@/utils/uploadSingleImage"
import { Button, TextArea } from "@radix-ui/themes"
import { CloudUpload } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

import { useRouter } from "next/navigation"

export default function CreatePageContent() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading]= useState(false)
  const [imageUrl, setImageUrl] = useState(
    "https://plus.unsplash.com/premium_photo-1678283974882-a00a67c542a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TE9BRCUyMElNQUdFfGVufDB8fDB8fHww"
  )
const router = useRouter()

  useUploadSingleImageFile(file, setImageUrl, setIsUploading)

  return (
    <form action={ async ()=>{
      
       router.push(`/profile`)
      router.refresh()
    }

    } className="flex flex-col justify-center md:flex-row gap-8 mt-12 p-4 ">
      <div className=" bg-indigo-50 rounded-lg  overflow-hidden relative">
        <div className="w-[360px] h-[360px]">
          <Image width={360} height={360} src={imageUrl} alt="" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center ">
            <input className="hidden" name='postImage' value={imageUrl} onChange={(e)=>console.log(e)}/>
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={(ev) => setFile(ev.target.files?.[0] || null)}
          />
          <Button variant="classic" type='button' disabled={isUploading} onClick={() => fileRef?.current?.click()}>
            {!isUploading && <CloudUpload />}
            {isUploading?'Uploading':'Choose Image'}
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <TextArea  name='description' rows={10}  placeholder="Add photo description... " />
        <Button variant="classic">Publish</Button>
      </div>
    </form>
  )
}
