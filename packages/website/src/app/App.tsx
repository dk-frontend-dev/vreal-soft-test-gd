import './App.scss';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {Route, Routes, useNavigate} from 'react-router';
import LoginPage from '@/pages/Login/Login.tsx';
import HomePage from '@/pages/Home/Home.tsx';
import MainLayout from '@/shared/layouts/MainLayout/MainLayout.tsx';
import {globalTheme} from '@/shared/themes/globalTheme.ts';
import GoogleAuthSuccessPage from '@/pages/GoogleAuthSuccessPage/GoogleAuthSuccessPage.tsx';
import {useEffect} from 'react';
import {useStore} from '@/store/store.ts';
import {getItem} from '@/shared/lib/localStorageLib.ts';
import {ACCESS_TOKEN_KEY} from '@/shared/constants/commonConstants.ts';
import {Routes as RoutePaths} from '@/shared/constants/routeConstants.ts';
import {getAllUsersApi, getCurrentUserApi} from '@/shared/api/userAPI.ts';

function App() {
  const navigate = useNavigate();
  const {setCurrentUser, currentUser, setAllUsers} = useStore();

  const fetchData = async () => {
    const [{data: currentUser}, {data: allUsers}] = await Promise.all([getCurrentUserApi(), getAllUsersApi()]);

    setCurrentUser(currentUser);
    setAllUsers(allUsers);
  };

  useEffect(() => {
    if (getItem(ACCESS_TOKEN_KEY)) {
      void fetchData();
      return;
    }

    navigate(RoutePaths.LOGIN);
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <MainLayout>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/" element={currentUser ? <HomePage /> : <p>Loading...</p>}></Route>
          <Route path="google-oauth-success-redirect">
            <Route path=":accessToken" element={<GoogleAuthSuccessPage />} />
          </Route>
        </Routes>
      </MainLayout>
    </ThemeProvider>
  );
}

export default App;
