import Head from "next/head";

import styles from "@/pages/index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>Testing Library React Examples</h1>

        <pre>
          <code>cd app_dir; yarn test</code>
        </pre>
      </main>
    </div>
  );
}
