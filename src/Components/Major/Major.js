import React, { useContext } from "react";
import "./Major.css";
import { pics } from "../../Images/images";
import { Context } from "../../context/Context";
import runChat from "../../config/gemini";

const Major = () => {
  const {
    onSent,
    recentprompt,
    showResult,
    loading,
    resultdata,
    setinput,
    input,
  } = useContext(Context);
  return (
    <div className="major">
      <div className="navbar">
        <p>Gemini By Mohamed Emad</p>
        <img src={pics.profile_pic} alt="" />
      </div>
      <div className="major-container">
        {!showResult ? (
          <>
            {" "}
            <div className="greet">
              <p>
                <span>Hello,User</span>
              </p>
              <p>How Can I help You Today?</p>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={pics.user_icon} alt="" />
              <p>{recentprompt}</p>
            </div>
            <div className="result-data">
              <img src={pics.profile_pic} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
              )}
            </div>
          </div>
        )}

        <div className="major-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setinput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Ask me .."
            />
            <div>
              <img src={pics.gallery_icon} alt="" />
              <img src={pics.mic_icon} alt="" />
          {input?<img onClick={() => onSent()} src={pics.send_icon} alt="" />:null}    
            </div>
          </div>
          <p className="bottom_info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Major;
