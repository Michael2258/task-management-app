import React from "react";
import "./styles/css/index.min.css";
import { Box, Container, Grid } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SideBar from "./components/layout/SideBar";

function App() {
    return (
        <Box height="100vh" className="main-box">
            <Container
                className="main-container"
                maxWidth={false}
                disableGutters
            >
                <Grid container className="container">
                    <Grid className="side-bar" item>
                        <SideBar />
                    </Grid>

                    <Grid className="main-layout" item>
                        <MainLayout />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default App;
