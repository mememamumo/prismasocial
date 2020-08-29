import { prisma } from "../../../../generated/prisma-client";
import { LIKE_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    whoLike: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { postId } = args;
      try {
        return prisma.post({ id: postId }).likes().$fragment(LIKE_FRAGMENT);
      } catch (error) {
        throw Error(error);
      }
    }
  }
};
