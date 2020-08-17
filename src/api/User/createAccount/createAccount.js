import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        email,
        password,
        firstName = "",
        lastName = "",
        bio = ""
      } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            username
          },
          { email }
        ]
      });
      if (exists) {
        throw Error("사용자의 이름/ 이메일이 이미 존재합니다.");
      }
      await prisma.createUser({
        username,
        email,
        password,
        firstName,
        lastName,
        bio
      });
      return true;
    }
  }
};
