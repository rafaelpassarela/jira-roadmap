import React from 'react';
import './App.css';
import RouterConfig from './RouterConfig';
import AppNavBar from './components/navbar/AppNavBar';
import AuthContextProvider from './contexts/AuthContext';
import ToastController from './components/toastMessage/ToastControllerComponent';

function App() {
    return (
        <div id='main-div'>
            <AuthContextProvider>
                <AppNavBar/>
                <RouterConfig />
            </AuthContextProvider>

            <ToastController position="bottom-end" />
        </div>
    );
}

export default App;
