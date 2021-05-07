import Head from "next/head";
import { useAuth } from "@/lib/auth";
import styles from "@/styles/Home.module.css";
import { Button, Heading, Code, Text } from "@chakra-ui/react";
import {} from "@chakra-ui/react";

const Home = () => {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <Heading>Fast Feedback</Heading>
      </Head>

      <main>
   
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : "None"}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={(e) => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={(e) => auth.signinWithGitHub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
};

export default Home;
