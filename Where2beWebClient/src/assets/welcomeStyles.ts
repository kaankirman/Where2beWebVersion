import React from "react";

type Styles = {
  content: React.CSSProperties;
  textInput: React.CSSProperties;
  textField: React.CSSProperties;
  buttonField:React.CSSProperties;
  buttons:React.CSSProperties;
};

export const styles: Styles = {
  content: {
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  },
  textInput: {
    border: "none",
    fontSize: "13px",
    outline:"none"
  },
  textField: {
    padding: "10px 16px",
    border: "2px solid white",
    borderRadius: "15px",
    backgroundColor: "white",
    margin: 8,
    width:200,
  },
  buttonField:{
    display:"flex",
    flexDirection:"column",
    width:200
  },
  buttons:{
    margin:5,
    borderRadius:"0.5",
    border:"none",
    backgroundColor:"inherit",
    fontWeight:650,
    cursor:"pointer"

  }
};
