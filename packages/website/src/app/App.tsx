import './App.scss'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes, useNavigate} from "react-router";
import LoginPage from "@/pages/Login/Login.tsx";
import HomePage from "@/pages/Home/Home.tsx";
import MainLayout from "@/shared/layouts/MainLayout/MainLayout.tsx";
import {globalTheme} from "@/shared/themes/globalTheme.ts";
import GoogleAuthSuccessPage from "@/pages/GoogleAuthSuccessPage/GoogleAuthSuccessPage.tsx";
import {useEffect} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import {useStore} from "@/store/store.ts";
import {AxiosResponse} from "axios";
import {User} from "@prisma/client";
import {getItem} from "@/shared/lib/localStorageLib.ts";
import {ACCESS_TOKEN_KEY} from "@/shared/constants/commonConstants.ts";
import {Routes as RoutePaths} from "@/shared/constants/routeConstants.ts";

function App() {
    const navigate = useNavigate();
    const {setCurrentUser, currentUser, setAllUsers} = useStore();

    const getCurrentUser = async () => {
        const {data}: AxiosResponse<User> = await httpClient.get('users');
        setCurrentUser(data);
    }

    const getAllUsers = async () => {
        const {data}: AxiosResponse<User[]> = await httpClient.get('users/all');
        setAllUsers(data);
    }


    useEffect(() => {
        if (getItem(ACCESS_TOKEN_KEY)) {
            void getCurrentUser();
            void getAllUsers();
            return;
        }

        navigate(RoutePaths.LOGIN);
    }, [])

    return (
        <ThemeProvider theme={globalTheme}>
            <CssBaseline/>
            <MainLayout>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/" element={currentUser ? <HomePage/> : <p>Loading...</p>}></Route>
                    <Route path="google-oauth-success-redirect">
                        <Route path=":accessToken" element={<GoogleAuthSuccessPage />} />
                    </Route>
                </Routes>
            </MainLayout>
        </ThemeProvider>
    )
}

export default App
