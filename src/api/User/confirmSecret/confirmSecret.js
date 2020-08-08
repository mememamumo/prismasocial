import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
	Mutation: {
		confirmSecret: async (_, args) => {
			const { email, secret } = args;
			const user = await prisma.user({ email });
			if (user.loginSecret === secret) {
				return generateToken(user.id); //jwt
			} else {
				throw Error("이메일/비밀키의 조합이 잘못되었습니다.");
			}
		}
	}
};