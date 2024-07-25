import React, { Component } from "react";
import './HomePage.css';
import PageFrame from "../../components/PageFrameComponent";
import { Link } from "react-router-dom";

interface IHomeState {
    dateAndTime: string;
    tokenResult: string;
}

class HomePage extends Component<any, IHomeState> {

    render() {
        return (
            <PageFrame pageHeader='Home'>
                <p>
                    Olá, veja seus cronogramas <Link to='/dash'>aqui</Link>
                </p>
            </PageFrame>
        );
    }

}

export default HomePage;
