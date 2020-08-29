export const USER_FRAGMENT = `
	fragment UserParts on User {
		id
		username
		avatar
		email
		firstName
		lastName
		bio
		posts {
			id
			caption
			files {
				url
			}
		}
		following {
			id
			username
			avatar
			bio
		}
		followers {
			id
			username
			avatar
			bio
		}
	}
`;

export const FULL_POST = `
	fragment FullPost on Post {
		id
		location
		caption
		createdAt
		user {
			id
			avatar
			username
		}
		files {
			id
			url
			post {
				location
				caption
			}
		}
		comments {
			id
			text
			createdAt
			user {
				id
				avatar
				username
			}
		}
		likes {
			id
			user {
				id
				avatar
				bio
				username
			}
		}
	}
`;

export const NOTIFICATION_FRAGMENT = `
	fragment NotificationParts on Notification {
		id
		createdAt
		from {
			id
			avatar
			username
		}
		to {
			id
			avatar
			username
		}
		type
		post {
			id
			files {
				id
				url
			}
		}
	}
`;
