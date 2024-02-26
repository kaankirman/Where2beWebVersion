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
  addImage: {
    cursor: "pointer",
    width: "80px",
    margin: "100px",
    marginLeft: "80px",
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
