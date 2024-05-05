import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext()
const ContextProvider=(props)=>{
  const [input,setinput]=useState("")
  const [recentprompt,setrecentprompt]=useState("")
  const [prevprompt,setprevprompt]=useState([])
  const [showResult,setshowResult]=useState(false)
  const [loading,setloading]=useState(false)
  const [resultdata,setresultdata]=useState("")
  const delayPara=(index,nextword)=>{
    setTimeout(function () {
      setresultdata(prev=>prev+nextword)
      
    },75*index)
  }
  const newChat=()=>{
    setloading(false)
    setshowResult(false)
  }
  const onSent= async (prompt)=>{
  setresultdata("")
  setloading(true)
  setshowResult(true)
  let response;
  if (prompt !==undefined) {
    response= await runChat(prompt)
    setrecentprompt(prompt)
  }else{
    setprevprompt(prev=>[...prev,input])
    setrecentprompt(input)
    response= await runChat(input)
  }

  let responseArray=response.split("**")
  let newResponse="" ;
  for(let i=0 ; i<responseArray.length;i++){
    if(i===0 || i%2 !==1){
      newResponse += responseArray[i]
    }
    else{
      newResponse +="<b>"+responseArray[i]+"</b>"
    }
  }
  let newResponse2=newResponse.split("*").join("<br/>")
  let newResponseArray=newResponse2.split(" ");
  for(let i=0;i<newResponseArray.length;i++){
    const nextword=newResponseArray[i];
    delayPara(i,nextword+" ")
  }
  setloading(false)
  setinput("")
  }
  const contextValue={input,setinput,prevprompt,setprevprompt,recentprompt,setrecentprompt,
    showResult,setshowResult,loading,setloading,resultdata,setresultdata,onSent,newChat

  }
  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider