import { ThemeProvider } from '@mui/material';
import React from 'react';
import { theme } from './shared/utils/theme';
import {BrowserRouter as Router,  Route,Routes } from 'react-router-dom';
import HomePages from './pages/Home.pages';
import RegisterPages from './pages/Register.pages.';
import SignInPage from './pages/Signin.page';


function App() {
  return (
    <ThemeProvider theme={theme} >
            <Router>
              <Routes>
                <Route path='/' element={<HomePages/>}/>
                <Route path='/register' element={<RegisterPages/>}/>
                <Route path='/signin' element={<SignInPage/>}/>
              </Routes>
            </Router>
    </ThemeProvider>
  );
}

export default App;
