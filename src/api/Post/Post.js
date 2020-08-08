import { prisma } from "../../../generated/prisma-client";

export default {
	Post: {
		files: ({ id }) => prisma.post({ id }).files(),
		comments: ({ id }) => prisma.post({ id }).comments(),
		user: ({ id }) => prisma.post({ id }).user(),
		likes: ({ id }) => prisma.post({ id }).likes()
	}
};