import React from "react";

type Styles = {
  logo: React.CSSProperties;
  content: React.CSSProperties;
  textInput: React.CSSProperties;
  textField: React.CSSProperties;
  buttonField:React.CSSProperties;
  button:React.CSSProperties;
};

const accentColor = "#F7DE32";

export const styles: Styles = {
  logo: {
    fontFamily: "'sunnyFont', sans-serif",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 0,
    fontSize:120,
    color: accentColor,
    cursor:"pointer"
  },
  content: {
    alignItems:"flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  },
  textInput: {
    border: "none",
    fontSize: "20px",
    outline:"none",
    alignItems:"center",
    width: "100%",
    WebkitBoxShadow: "0 0 0 1000px white inset",
  },
  textField: {
    padding: "16px 16px",
    border: "2px solid white",
    borderRadius: "100px",
    backgroundColor: "white",
    margin: 5,
    width:350,
    height:70,
  },
  buttonField:{
    display:"flex",
    flexDirection:"column",
    width:"auto",
    margin:15
  },
  button:{
    fontSize:20,
    margin:5,
    borderRadius:100,
    border:"none",
    backgroundColor:accentColor,
    color:"white",
    fontWeight:650,
    cursor:"pointer",
    width:150,
    height:50,
    alignSelf:"center"
  
  }
};
