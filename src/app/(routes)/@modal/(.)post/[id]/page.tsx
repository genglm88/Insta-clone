//import { use } from "react";
import Modal from "@/app/(routes)/components/Modal"
import { singlePostData } from "@/app/(routes)/components/postingAction"
import SinglePostContent from "@/app/(routes)/components/SinglePostContent"

type idParams = Promise<{id: string}>
// // Define the type for `params`
// type IdPageProp = {
//   params:IdPageParam
// }

// type IdPageParam = {
//     id: string
//   }


export default async function PostInModal(props:{params:idParams}) {
 // const { id } = use(params)    
 const { id } = await props.params  
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
