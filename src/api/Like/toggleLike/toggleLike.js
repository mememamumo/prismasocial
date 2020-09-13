import { prisma } from "../../../../generated/prisma-client";
import createNotification from "../../Notification/createNotification";
import { FULL_POST } from "../../../fragments";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          await prisma.deleteManyLikes(filterOptions);
          console.log("해제");
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
          console.log("좋아요");
          const creatorOfPost = await prisma
            .post({ id: postId })
            .$fragment(FULL_POST);
          if (user.id !== creatorOfPost.user.id) {
            await createNotification(
              user.id,
              creatorOfPost.user.id,
              "LIKE",
              postId
            );
          }
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
