import Modal from "@/app/(routes)/components/Modal"
import { singlePostData } from "@/app/(routes)/components/postingAction"
import SinglePostContent from "@/app/(routes)/components/SinglePostContent"

export default async function PostInModal({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  const {
    existingPost,
    postAuthor,
    postedComments,
    commentsAuthors,
    isLikedByMe,
    isBookMarkedByMe,
  } = await singlePostData(id)

  return (
    <Modal>
      <SinglePostContent
        id={id}
        existingPost={existingPost}
        postAuthor={postAuthor}
        postedComments={postedComments}
        commentsAuthors={commentsAuthors}
        isLikedByMe={isLikedByMe}
        isBookMarkedByMe={isBookMarkedByMe}
      />
    </Modal>
  )
}
