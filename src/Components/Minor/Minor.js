import "./Minor.css";
import { pics } from "../../Images/images";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
const Minor = () => {
  const [extended, setextended] = useState(false);
  const {onSent,setrecentprompt,prevprompt,newChat}=useContext(Context)
  const loadprompt=async(prompt)=>{
    setrecentprompt(prompt)
    await onSent(prompt)
  }
  return (
    <div className="minor">
      <div className="top">
        <img onClick={()=>{setextended(extended?false:true)}} className="menu" src={pics.menu_icon} alt="menu pic" />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={pics.plus_icon} alt="newchat pic" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevprompt.map((item,index)=>{
              return(
                    <div onClick={()=>loadprompt(item)} className="recent-entry">
              <img src={pics.message_icon} alt="" />
              <p>{item.slice(0,18)}...</p>
            </div>
              )
            })}
        
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={pics.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={pics.history_icon} alt="" />
          {extended?<p>History</p>:null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={pics.setting_icon} alt="" />
        {extended?<p>Settings</p>:null}  
        </div>
      </div>
    </div>
  );
};

export default Minor;
