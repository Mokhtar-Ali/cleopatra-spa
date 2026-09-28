import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleopatra Spa | Luxury Spa in Cartagena",
  description:
    "Luxury massage, wellness, and spa experiences in Cartagena de Indias, Colombia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
