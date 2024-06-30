import React from "react";
import { CircularProgress, Container } from "@mui/material";

// Define the interface for the component props
interface ScreenLoaderLayoutProps {
  loaderMessage: string; // Specify that loaderMessage is a string
}

// Use the interface in the component definition
const ScreenLoaderLayout: React.FC<ScreenLoaderLayoutProps> = ({
  loaderMessage,
}) => {
  return (
    <Container
      style={{
        height: "100vh", 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
      }}
    >
      <CircularProgress color="secondary" />
      <div>
        <h4>{loaderMessage}</h4> 
      </div>
    </Container>
  );
};

export default ScreenLoaderLayout;
