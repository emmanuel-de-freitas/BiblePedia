import { Heading, Text } from "@/components/typography";

export default function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4 p-6 text-center">
			<Heading level={1}>404</Heading>
			<Heading level={2}>Page Not Found</Heading>
			<Text textStyle={{ opacity: 0.7 }}>
				The page you are looking for does not exist or has been moved.
			</Text>
		</div>
	);
}
