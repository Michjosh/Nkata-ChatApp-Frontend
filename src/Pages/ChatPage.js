import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import TopNavigation from "../components/sections/TopNav";
import { ChatState } from "../Context/ChatProvider";
import "../styles.css";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="Chatpage">
      {user && <TopNavigation />}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "91.5vh", padding: "10px" }}>
        <div className="mychats">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="chatbox">
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
};  

export default Chatpage;
