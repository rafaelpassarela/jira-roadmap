import React, { Component } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HelpViewComponent from "./pages/help/HelpViewComponent";
import NotFoundViewComponent from "./pages/notFound/NotFoundViewComponent";
import LoginPage from "./pages/login/LoginPageComponent";
import HomePage from "./pages/home/HomePageComponent";
import UserConfigToken from "./pages/user/config/UserConfigToken";
import Cookies from 'js-cookie';
import DashPage from "./pages/dash/DashPageViewComponent";
import RoadmapView from "./pages/roadmap/RoadmapViewComponent";
import DashConfigView from "./pages/dash/dashConfig/DashConfigViewComponent";
import ProjectConfig from "./pages/project/config/ProjectConfig";

class RouterConfig extends Component {

    isAuthenticated() {
        let bearer: string | undefined = undefined;

        bearer = Cookies.get('Bearer');
        return !!bearer;
    }

    // access only if authenticated
    getAuthPath(element: React.ReactNode) {
        if (this.isAuthenticated()) {
            return element;
        } else {
            return <Navigate to="/login" replace />;
        }
    }

    // access only if not authenticated
    getNormalPath(element: React.ReactNode) {
        if (!this.isAuthenticated()) {
            return element;
        } else {
            return <Navigate to="/" replace />;
        }
    }

    render() {
        return (
            <div id="router-div">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/help' element={<HelpViewComponent />} />

                    {/* Routes not authenticated */}
                    <Route path='/login' element={this.getNormalPath(<LoginPage />)} />

                    {/* Routes only if authenticated */}
                    <Route path='/user/config' element={this.getAuthPath(<UserConfigToken />)} />
                    <Route path='/project/config' element={this.getAuthPath(<ProjectConfig />)} />
                    <Route path='/dash' element={this.getAuthPath(<DashPage />)} />
                    <Route path='/dash/config/:id' element={this.getAuthPath(<DashConfigView />)} />
                    <Route path='/dash/roadmap/:id' element={this.getAuthPath(<RoadmapView />)} />

                    <Route path='*' element={<NotFoundViewComponent />} />
                </Routes>
            </div>
        );
    }

}

export default RouterConfig;