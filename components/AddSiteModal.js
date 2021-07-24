import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Input,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import useSWR, { mutate } from 'swr';
import fetcher from "@/utils/fetcher";
// const { data } = useSWR("/api/sites", fetcher);

const AddSiteModal = ({ children }) => {
  const initialRef = React.useRef();
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const onCreateSite = ({ name, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    });
    toast({
      title: "Success!",
      description: "We've added your site",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate(
      ['/api/sites', auth.user.token],
      async (data) => {
        return { sites: [...data.sites, newSite] };
      },
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="My site"
                {...register("name", {
                  required: true,
                })}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                ref={initialRef}
                placeholder="url"
                {...register("url", {
                  required: true,
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
