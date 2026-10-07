import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

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
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}
