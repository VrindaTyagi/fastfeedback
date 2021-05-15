import { useAuth } from "@/lib/auth";
// import styles from "@/styles/Home.module.css";
import { Button, Icon, Flex, Heading } from "@chakra-ui/react";
import {} from "@chakra-ui/react";


const Home = () => {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      height="100vh"
    >
      {/* <Head>
        <title>Fast Feedback</title>
      </Head> */}
    <Heading > Fast Feedback</Heading>
    <Icon mt={4} color="black" name="logo" size="64px" />
      {auth.user ? (
        <Button mt={4} as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
