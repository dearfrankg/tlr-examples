import "@/styles/global.css";
import type { AppProps } from "next/app";
import Link from "next/link";

const Menu = () => (
  <ul style={{ listStyle: "none", display: "flex", gap: 20 }}>
    {[1, 2, 3].map((num) => (
      <li key={num}>
        <Link href={`/example${num}`}>
          <a>example{num}</a>
        </Link>
      </li>
    ))}
  </ul>
);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Menu />
      <Component {...pageProps} />
    </>
  );
}
