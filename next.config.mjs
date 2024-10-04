/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: ["lh3.googleusercontent.com","chat-server-i726.onrender.com","avatars.githubusercontent.com"],
	},
};

export default nextConfig;
