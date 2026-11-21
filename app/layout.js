
import "./globals.css";

export const metadata = {
  title: "Data Analyst Portfolio",
  description: "My professional data analytics portfolio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
