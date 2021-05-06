import Head from "next/head";
import { useAuth } from "../lib/auth";
import styles from "../styles/Home.module.css";

const Home = () => {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Fast Feedback</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <h1>Fast Feedback</h1>
		<p>
			Current user: <code>{auth.user ? auth.user.email : 'None'}</code>
		</p>
		{auth.user ? (
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        ) : (
          <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
        )}
      </main>
    </div>
  );
};

export default Home;
