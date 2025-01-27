import Image from "next/image"

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="col-span-1 size-16 bg-slate-50 overflow-hidden rounded-full">
      <Image
        className="aspect-square rounded-full"
        width={96}
        height={96}
        src={src}
        alt="user avatar"
      />
    </div>
  )
}
