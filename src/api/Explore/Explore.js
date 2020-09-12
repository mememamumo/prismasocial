import { prisma } from "../../../generated/prisma-client";
import { USER_FRAGMENT, FULL_POST } from "../../fragments";

export default {
  Query: {
    explore: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      try {
        const allUsers = await prisma
          .users({
            where: {
              id_not_in: [...following.map((user) => user.id), user.id]
            },
            orderBy: "createdAt_ASC"
          })
          .$fragment(USER_FRAGMENT);
        const allPosts = await prisma
          .posts({ orderBy: "createdAt_DESC" })
          .$fragment(FULL_POST);
        return {
          users: allUsers,
          posts: allPosts
        };
      } catch (error) {
        throw Error(error);
      }
    }
  }
};
