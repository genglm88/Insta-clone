import { useEffect } from "react"

// interface UploadProps {
//   file: File | null;
//   setAvatarUrl: (url: string) => void;
// }

export default function useUploadSingleImageFile(
  file: File | null,
  setAvatarUrl: (url: string) => void,
  setIsUploading: (isUploading: boolean) => void
) {
  useEffect(() => {
    const abortController = new AbortController()

    const uploadFile = async () => {
      if (!file) return

      try {
        setIsUploading(true)
        const formdata = new FormData()
        formdata.set("file", file)
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formdata,
          signal: abortController.signal,
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to upload file")
        }

        const url = await response.json()
        setAvatarUrl(url)
        setIsUploading(false)
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          console.log("Upload aborted")
        } else {
          console.error("Error uploading files", error)
        }
      }
    }
    uploadFile()
    return () => abortController.abort()
  }, [file])
}
