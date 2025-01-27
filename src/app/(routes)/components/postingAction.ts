"use server"
import { auth } from "@/auth"
import { prisma } from "@/db"
import { uniq } from "lodash"

export async function getSessionEmail(): Promise<string | null | undefined> {
  const session = await auth()
  return session?.user?.email
}

export async function getSessionEmailOrThrow(): Promise<string> {
  const userEmail = await getSessionEmail()
  if (!userEmail) {
    throw "not logged in"
  }
  return userEmail
}

export async function postingAction(data: FormData) {
  const userEmail = await getSessionEmailOrThrow()

  const image = data.get("postImage") as string | null
  const description = data.get("description") as string | null

  if (!image || !description) {
    throw new Error("Missing required post data")
  }

  //console.log(Object.keys(prisma)); // Should include 'posting'
  try {
    const postingDoc = await prisma.posting.create({
      data: {
        authorEmail: userEmail,
        image,
        description,
      },
    })
    return postingDoc.id
  } catch (error) {
    console.error("Error creating post:", error)
    throw new Error("Failed to create the post. Please try again.")
  }
}

export async function postCommentAction(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow()

  const commentText = (data.get("commentText") as string) || null

  const postId = data.get("postId") as string

  if (!commentText) {
    throw new Error("Comment text is required")
  }

  try {
    await prisma.comment.create({
      data: {
        postId,
        authorEmail,
        commentText,
      },
    })
    //return commentDoc
  } catch (error) {
    console.error("Error posting comment:", error)
    throw new Error("Failed to post the comment. Please try again.")
  }
}

async function updatePostLikes(postId: string) {
  try {
    await prisma.posting.update({
      where: { id: postId },
      data: {
        likeCount: await prisma.like.count({ where: { postId } }),
      },
    })
  } catch (error) {
    console.error("Error posting like:", error)
    throw new Error("failed to post the like. Plesse try again.")
  }
}

export async function likePost(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow()
  const postId = data.get("postId") as string
  try {
    await prisma.like.create({
      data: {
        postId,
        authorEmail,
      },
    })

    await updatePostLikes(postId)
  } catch (error) {
    console.error("Error posting like:", error)
    throw new Error("failed to post the like. Plesse try again.")
  }
}

export async function deLikePost(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow()
  const postId = data.get("postId") as string
  try {
    await prisma.like.deleteMany({
      where: {
        postId,
        authorEmail,
      },
    })
    await updatePostLikes(postId)
  } catch (error) {
    console.error("Error posting delike", error)
    throw new Error("failed to post the delike. Please try again.")
  }
}

export async function singlePostData(id: string) {
  const existingPost = await prisma.posting.findFirstOrThrow({
    where: { id },
  })
  const postAuthor = await prisma.profile.findFirstOrThrow({
    where: { email: existingPost.authorEmail },
  })

  const postedComments = await prisma.comment.findMany({
    where: { postId: id },
  })

  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniq(postedComments.map((comment) => comment.authorEmail)) },
    },
  })

  const authorEmail = await getSessionEmailOrThrow()
  const isLikedByMe = await prisma.like.findFirst({
    where: { postId: id, authorEmail },
  })
  const isBookMarkedByMe = await prisma.bookMark.findFirst({
    where: { postId: id, authorEmail },
  })


  return {
    existingPost,
    postAuthor,
    postedComments,
    commentsAuthors,
    isLikedByMe,
    isBookMarkedByMe,
  }
}

export async function followProfile(followedProfileId: string) {
  try {
    const authorEmail = await getSessionEmailOrThrow()
    //const followedProfileId = data.get("followedProfileId") as string
    const currentUserProfile = await prisma.profile.findFirst({
      where: { email: authorEmail },
    })
    await prisma.follower.create({
      data: {
        followedProfileId,
        authorProfileId: currentUserProfile?.id as string,
        authorEmail,
      },
    })
  } catch (error) {
    console.error("Error posting follower:", error)
    throw new Error("failed to post the follower. Plesse try again.")
  }
}

export async function unFollowProfile(followedProfileId: string) {
  try {
    const authorEmail = await getSessionEmailOrThrow()
    //const followedProfileId = data.get("followedProfileId") as string
    const currentUserProfile = await prisma.profile.findFirst({
      where: { email: authorEmail },
    })
    await prisma.follower.deleteMany({
      where: {
        followedProfileId,
        authorProfileId: currentUserProfile?.id as string,
    
      },
    })
  } catch (error) {
    console.error("Error posting follower:", error)
    throw new Error("failed to post the follower. Plesse try again.")
  }
}

export async function bookMarkPost(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow()
  const postId = data.get("postId") as string
  try {
    await prisma.bookMark.create({
      data: {
        postId,
        authorEmail,
      },
    })
  } catch (error) {
    console.error("Error posting like:", error)
    throw new Error("failed to post the like. Plesse try again.")
  }
}

export async function deBookMarkPost(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow()
  const postId = data.get("postId") as string
  try {
    await prisma.bookMark.deleteMany({
      where: {
        postId,
        authorEmail,
      },
    })
    
  } catch (error) {
    console.error("Error posting delike", error)
    throw new Error("failed to post the delike. Please try again.")
  }
}