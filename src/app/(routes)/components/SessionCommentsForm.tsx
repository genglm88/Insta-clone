import { auth } from "@/auth"
import { prisma } from "@/db"

import CommentsForm from "./CommentsForm"

export default async function SessionCommentsForm({
  postId,
}: {
  postId: string
}) {
  const session = await auth()
  await prisma.profile.findFirstOrThrow({
    where: { email: session?.user?.email as string },
  })
  return <CommentsForm postId={postId} />
}
