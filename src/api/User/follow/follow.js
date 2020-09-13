import { prisma } from "../../../../generated/prisma-client";
import createNotification from "../../Notification/createNotification";

export default {
  Mutation: {
    follow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id
              }
            }
          }
        });
        if (user.id !== id) {
          await createNotification(user.id, id, "FOLLOW");
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
