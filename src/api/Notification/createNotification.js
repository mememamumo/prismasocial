import { prisma } from "../../../generated/prisma-client";

const createNotification = async (fromId, toId, noteType, post) => {
  if (post === undefined) {
    try {
      if (fromId === toId) {
        return false;
      } else {
        await prisma.createNotification({
          from: { connect: { id: fromId } },
          to: { connect: { id: toId } },
          type: noteType
        });
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    try {
      if (fromId === toId) {
        return false;
      } else {
        await prisma.createNotification({
          from: { connect: { id: fromId } },
          to: { connect: { id: toId } },
          type: noteType,
          post: { connect: { id: post } }
        });
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

export default createNotification;
