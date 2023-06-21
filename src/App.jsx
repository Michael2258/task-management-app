import React, { useContext } from "react";
import "./styles/css/index.min.css";
import { Box, Container, Grid } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SideBar from "./components/layout/SideBar";
import { ThemeContext } from "./context/ThemeContext";

function App() {
    const { isDarkTheme, setDarkTheme } = useContext(ThemeContext);

    return (
        <div className="theme-container" id={isDarkTheme ? "dark" : "light"}>
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
                            <MainLayout
                                isDarkTheme={isDarkTheme}
                                setDarkTheme={setDarkTheme}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
}

export default App;
