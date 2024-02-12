import React from "react";

type Styles = {
  active: React.CSSProperties;
  logo: React.CSSProperties;
  carousel: React.CSSProperties;
  carouselImg: React.CSSProperties;
  cardStyle: React.CSSProperties;
  addImage: React.CSSProperties;
};

export const styles: Styles = {
  active: {
    backgroundColor: "#2c7da0 !important",
  },
  logo: {
    fontFamily: "'sunnyFont', sans-serif",
    marginTop: 10,
    marginLeft: 10,
    fontSize: 60,
    marginBottom: 0,
  },
  carousel: {
    width: "100vh",
    height: 400,
    overflow: "hidden",
    display: "flex",
    gap: 10,
  },
  carouselImg: {
    width: "100%", // Width of the container
    height: "198px", // Height of the container, make sure the container has a fixed height
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
  },
  cardStyle: {
    marginRight:"50px",
    width:"auto",
    height:"300px"
  },
  addImage:{
    cursor:"pointer",
    width:"100px",
    margin:"100px"
  },
};
