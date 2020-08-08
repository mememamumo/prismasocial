export const isAuthenticated = request => {
	if (!request.user) {
		throw Error("이 작업을 수행하려면 로그인을 해야합니다.");
	}
	return;
};