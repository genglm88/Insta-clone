import { Profile } from "@prisma/client";
import Avatar from "./Avatar";
import {format} from 'date-fns'

export default function CommentPosted({postedText, postedTime, postAuthor}:{postedText:string; postedTime:Date; postAuthor?:Profile;}) {
    return (
                <div className="flex flex-col text-xs lg:text-sm lg:grid lg:grid-cols-5 mb-4">
                  <Avatar src={postAuthor?.avatar || ""} />
                  <div className="lg:col-span-4 row-auto px-2">
                    <div className="font-bold flex gap-1 lg:flex-col  text-indigo-900/80  dark:bg-indigo-800 dark:text-indigo-200 ">
                      <span>{postAuthor?.name}</span>
                      <span>@{postAuthor?.username}</span>
                    </div>
                    <div className="mt-2 bg-indigo-50 sm:px-2 lg:px-6 py-2 rounded-xl  text-indigo-900/60  dark:bg-indigo-900 dark:text-indigo-200">
                      {postedText}
                    </div>
                    <div className="lg:col-span-5 text-indigo-900/40  lg:text-right  dark:bg-indigo-800 dark:text-indigo-200">
                      {format(postedTime, 'yyy-MM-dd HH:mm:ss')}
                    </div>
                  </div>
                </div>
    )
}