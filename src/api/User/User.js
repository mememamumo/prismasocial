import { prisma } from "../../../generated/prisma-client";

export default {
	User: {
		posts: ({ id }) => prisma.user({ id }).posts(),
		following: ({ id }) => prisma.user({ id }).following(),
		followers: ({ id }) => prisma.user({ id }).followers(),
		likes: ({ id }) => prisma.user({ id }).likes(),
		comments: ({ id }) => prisma.user({ id }).comments(),
		rooms: ({ id }) => prisma.user({ id }).rooms(),
		followingCount: ({ id }) => prisma.usersConnection({ where: { followers_some: {id }}}).aggregate().count(),
		followersCount: ({ id }) => prisma.usersConnection({ where: { following_none: { id }}}).aggregate().count(),
		fullName: parent => `${parent.firstName} ${parent.lastName}`
	}
};