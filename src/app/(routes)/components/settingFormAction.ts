'use server'
import { prisma } from "@/db"

   export  async function settingFormAction(data: FormData, userEmail:string) {
     
      if (!userEmail) {
        throw new Error("User is not authenticated")
      }
      const existingProfile = await prisma.profile.findUnique({
        where: { email:userEmail },
      })
      const newUserInfo = {
        avatar: data.get('avatar') as string,
        username: data.get("username") as string,
        name: data.get("name") as string,
        subtitle: data.get("subtitle") as string,
        bio: data.get("bio") as string,
      }
      //console.log(newUserInfo.avatar)
      if (existingProfile) {
        await prisma.profile.update({
          where: { email:userEmail },
          data: {
            email:userEmail,
            ...newUserInfo,
          },
        })
      } else {
        await prisma.profile.create({
          data: {
            email:userEmail,
            ...newUserInfo,
          },
        })
      }
  
    }