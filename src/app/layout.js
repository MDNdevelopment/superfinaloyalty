import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Superfina",
  description:
    "¡Sé parte de la comunidad de la Superfina y obtén tu tarjeta de fidelización hoy!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" translate="no">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
