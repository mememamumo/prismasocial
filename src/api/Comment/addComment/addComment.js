import { prisma } from "../../../../generated/prisma-client";
import createNotification from "../../Notification/createNotification";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId } = args;
      const { user } = request;
      const comment = await prisma.createComment({
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        text
      });
      if (user.id !== comment.post.user.id) {
        await createNotification(
          user.id,
          comment.post.user.id,
          "COMMENT",
          postId
        );
      }
      return comment;
    }
  }
};
