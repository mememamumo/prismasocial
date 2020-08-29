import { prisma } from "../../../../generated/prisma-client";
import { NOTIFICATION_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeNotification: (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { username } = args;
      return prisma
        .notifications({
          where: { to: { username } },
          orderBy: "createdAt_DESC"
        })
        .$fragment(NOTIFICATION_FRAGMENT);
    }
  }
};
