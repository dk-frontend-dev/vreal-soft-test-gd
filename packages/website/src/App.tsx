import './App.scss'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router";
import LoginPage from "@/pages/Login/Login.tsx";
import HomePage from "@/pages/Home/Home.tsx";
import MainLayout from "@/shared/layouts/MainLayout/MainLayout.tsx";
import {globalTheme} from "@/shared/theme/globalTheme.ts";

function App() {
    return (
        <ThemeProvider theme={globalTheme}>
            <CssBaseline/>
            <MainLayout>
                <Routes >
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/" element={<HomePage />}></Route>
                </Routes>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App
