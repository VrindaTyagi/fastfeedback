import { useAuth } from "@/lib/auth";
// import styles from "@/styles/Home.module.css";
import { Button, Icon, Flex, Heading, Text } from "@chakra-ui/react";
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
    <Text mt={4}>
    {`It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
    </Text>
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
