import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
    const {pronpt, setPronpt, reply, setReply, currThreadId, setCurrThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: pronpt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
            
        }
        setLoading(false);
    }

    // Append new chat to prevChats
    useEffect(() => {
        if(pronpt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: pronpt
                },{
                    role: "assistant",
                    content: reply
                }]
            ))
        }

        setPronpt("");
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>PromptBot <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    <hr />
                    <div className="dropDownItem"><i class="fa-solid fa-right-from-bracket"></i>Log out</div>
                </div>
            }
            <Chat />
            <ScaleLoader color="#fff" loading={loading}/>
            <div className="chatInput">
                <div className="inputBox">
                    <input type="text" placeholder="Ask anything" value={pronpt} onChange={(e) => setPronpt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}/>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    PromptBot can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;