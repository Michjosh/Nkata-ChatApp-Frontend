import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import { useHistory } from "react-router";
  import Login from "./Authentication/Login";
  import Signup from "./Authentication/Signup";
  import "../App.css"
  
  function Homepage() {
    const history = useHistory();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
  
      if (user) history.push("/chats");
    }, [history]);
  
    return (
      <div className="landingpage">
      <Box>
      <Container maxW="xl" centerContent
      >
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          // marginTop="15%"
          marginLeft="100%"
        >
          <Text fontSize="4xl" fontFamily="Work sans">
            Nkata...
          </Text>
        </Box>
        <Box bg="whitesmoke" w="100%" p={4} marginLeft="100%" marginBottom="4%" marginTop="-10%" paddingBottom="8%" borderRadius="lg" borderWidth="1px">
          <Tabs isFitted variant="soft-rounded">
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
      </Box>
      </div>
    );
  }
  
  export default Homepage;