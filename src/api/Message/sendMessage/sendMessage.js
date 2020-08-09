import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      // make room or find room
      if (roomId === undefined) {
        // not to make the room for oneself
        if (user.id !== toId) {
          // createRoom
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
        }
      } else {
        // find room using roomId
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("메세지를 찾을 수 없습니다.");
      }
      const participants = await prisma.room({ id: room.id }).participants();
      const getTo = participants.filter(
        (participant) => participant.id !== user.id
      )[0]; // first element
      // create message
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          // roomId is finding the room. Or toId is createing the room.
          connect: { id: roomId ? getTo.id : toId }
        },
        room: {
          connect: { id: room.id }
        }
      });
    }
  }
};
