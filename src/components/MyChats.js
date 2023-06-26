import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./sections/GroupChatModal";
import { Button, Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "../styles.css";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      setChats(response.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
  <Box>
      <Box>
        <Box
          flexDir="column"
          alignItems="center"
          p={3}
          bg="white"
          w={{ base: "100%", md: "50%" }}
          borderRadius="lg"
          borderWidth="1px"
          display="flex"
          backgroundColor="#F8F8F8"
          min-height="100vh"
          width="50vw"
        >
          <Box
            pb={3}
            px={3}
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"
            d="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            flexWrap="wrap"
            overflowY="hidden"
          >
            Chats
            <GroupChatModal>
              <Button
                d="flex"
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                rightIcon={<AddIcon />}
              >
                New Group Chat
              </Button>
            </GroupChatModal>
          </Box>
        </Box>
        </Box>
      <Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="25vw"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          flexWrap="wrap"
        >
          {chats ? (
            <Stack overflowY="scroll" w="60vw">
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  key={chat._id}
                  w="150vw"
                >
                  <Text>
                    {!chat.isGroupChat
                      ? loggedUser &&
                        chat.users &&
                        getSender(loggedUser, chat.users)?.name
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && chat.latestMessage.sender && (
                    <Text fontSize="xs">
                      <Box>
                        <Avatar
                          size="sm"
                          cursor="pointer"
                          name={user.name}
                          src={user.pic}
                        />
                      </Box>
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
      </Box>
  );
};

export default MyChats;
