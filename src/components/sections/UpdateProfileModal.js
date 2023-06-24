import React, { useState, useDisclosure } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UpdateProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleProfileUpdate = async () => {
    try {
      // Validate input fields
      if (!newName && !newEmail && !newImage) {
        toast({
          title: "No updates",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Prepare form data
      const formData = new FormData();
      if (newName) formData.append("name", newName);
      if (newEmail) formData.append("email", newEmail);
      if (newImage) formData.append("image", newImage);

      await axios.patch("http://localhost:5000/api/user/profile", formData);
      // Handle successful profile update

      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear input fields
      setNewName("");
      setNewEmail("");
      setNewImage(null);
    } catch (error) {
      // Handle error
      console.log(error);
      toast({
        title: "Error updating profile",
        description: "An error occurred while updating the profile.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal size="md" onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>New Name</FormLabel>
            <Input
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Email</FormLabel>
            <Input
              type="email"
              placeholder="New Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleProfileUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}  

// export default UpdateProfileModal;
