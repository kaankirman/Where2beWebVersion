import React from "react";

type Styles = {
  active: React.CSSProperties;
  logo: React.CSSProperties;
  carousel: React.CSSProperties;
  carouselImg: React.CSSProperties;
  cardStyle: React.CSSProperties;
  addImageContainer: React.CSSProperties;
  addImage: React.CSSProperties;
  fileContainer: React.CSSProperties;
  flexRow: React.CSSProperties;
  flexColumn: React.CSSProperties;
  mapContainer: React.CSSProperties;
  fileImageContainer: React.CSSProperties;
  fileImage: React.CSSProperties;
  googleMapsTextInput: React.CSSProperties;
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
    padding: "1px",
    width: "100%", // Width of the container
    height: "198px", // Height of the container, make sure the container has a fixed height
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
  },
  cardStyle: {
    border: "none",
    marginRight: "50px",
    width: "auto",
    height: "300px",
  },
  addImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30vh",
  },
  addImage: {
    cursor: "pointer",
    width: "80px",
    margin: "100px",
    marginLeft: "80px",
  },
  fileContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    height: "60vh",
    width: "98%",
    marginTop: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  mapContainer: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  fileImageContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    overflow: "hidden",
    objectFit: "cover",
  },
  fileImage: {
    objectPosition: "center",
    width: "100%",
    height: "40vh",
    display: "block",
  },
  googleMapsTextInput: {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    padding: `0 12px`,
    borderRadius: `10px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
    position: "absolute",
    left: "50%",
    marginLeft: "-120px",
    marginTop: "10px",
  },
};

type Breakpoint = {
  max: number;
  min: number;
};

type ResponsiveItem = {
  breakpoint: Breakpoint;
  items: number;
};

type ResponsiveStyles = {
  superLargeDesktop: ResponsiveItem;
  desktop: ResponsiveItem;
  adjustedDesktop: ResponsiveItem;
  tablet: ResponsiveItem;
  mobile: ResponsiveItem;
};

export const responsive: ResponsiveStyles = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 4,
  },
  adjustedDesktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const responsiveImages: ResponsiveStyles = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 5,
  },
  adjustedDesktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
