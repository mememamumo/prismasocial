import "./env";
import { adjectives, nouns } from "./words";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (msg) => {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	sgMail
	.send(msg)
	.then(() => {
		console.log("🚀Message Sent");
	}).catch((error) => {
		console.log(error.response.body);
	});
};

export const sendSecretMail = (address, secret) => {
	const email = {
		from: process.env.FROM_MAILBOX,
		to: address,
		subject: "🔒PrismaSocial 로그인을 위한 비밀키🔒",
		html: `안녕하세요. PrismaSocial의 개발자 이유나입니다. 고객님의 로그인 비밀키는 <strong>${secret}</strong> 입니다.<br/>비밀키를 복사해서, PrismaSocial의 앱 또는 웹사이트에 붙여넣기 하여 로그인 하십시오.`
	};
	return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);

