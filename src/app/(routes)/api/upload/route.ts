import { pinata } from "@/utils/config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get("file") as unknown as File
    // const info = await pinata.groups.create({
    //     name:'insta-photos', isPublic:true
    // })
    // console.log(info)
    const uploadData = await pinata.upload.file(file, {
        groupId:'0193bda9-e5eb-7cd6-b5f6-c958aa52e095',
    })
    // const url = await pinata.gateways.createSignedURL({
    //   cid: uploadData.cid,
    //   expires: 3600,
    // })
    const fileUrl = `https://${process.env.NEXT_PUBLIC_PINATA_GETWAY_URL}/files/${uploadData.cid}`
    return NextResponse.json(fileUrl, { status: 200 })
  } catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
