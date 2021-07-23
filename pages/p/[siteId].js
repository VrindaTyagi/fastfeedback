import Feedback from "@/components/Feedback";
import { useAuth } from "@/lib/auth";
import {useRouter} from 'next/router'
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Input,
  Button
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createFeedback } from "@/lib/db";

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const {feedback} = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export async function getStaticPaths() {
  const {sites} = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

const SiteFeedback = ({ initialFeedback }) => {
    const auth = useAuth();
    const router = useRouter();
    const inputEl = useRef(null);
    const [allFeedback, setAllFeedback] = useState(initialFeedback);

    const onSubmit = (e) => {
        e.preventDefault();
        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'pending'
          };
          setAllFeedback([newFeedback, ...allFeedback]);
          createFeedback(newFeedback);
        };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
     <Box as="form" onSubmit={onSubmit}>
     <FormControl my={8}>
        <FormLabel>Comment</FormLabel>
        <Input ref={inputEl} type="comment" id="comment" />
        <Button mt={2} type="submit" fontWeight="medium">Add Comment</Button>
      </FormControl>
     </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
