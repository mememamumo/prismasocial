import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      if (user.email === email && user.password === password) {
        try {
          await sendSecretMail(email, loginSecret);
          await prisma.updateUser({
            data: { loginSecret },
            where: { email }
          });
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else {
        throw Error("Wrong email/password combination");
      }
    }
  }
};
