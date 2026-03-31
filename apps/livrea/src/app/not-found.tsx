import { Heading, Text } from "@/components/typography";

export default function NotFound() {
   return (
      <div
         style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            height: "100vh",
            justifyContent: "center",
            padding: 24,
            textAlign: "center",
         }}>
         <Heading level={1}>404</Heading>
         <Heading level={2}>Page Not Found</Heading>
         <Text textStyle={{ opacity: 0.7 }}>The page you are looking for does not exist or has been moved.</Text>
      </div>
   );
}
