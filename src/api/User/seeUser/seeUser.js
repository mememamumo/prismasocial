import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      // return prisma.user({ username });
      const exists = await prisma.$exists.user({ username });

      if (exists) {
        return prisma.user({ username });
      } else {
        throw Error("User not found...");
      }
    }
  }
};
