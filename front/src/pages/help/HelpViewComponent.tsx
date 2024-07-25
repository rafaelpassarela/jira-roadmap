import React, { Component } from "react";
import { Link } from "react-router-dom";

class HelpViewComponent extends Component {

    render() {
        return (
            <div>
                <Link to='/'>Home</Link> <br/>
                <Link to='/login'>Login</Link> <br/>
            </div>
        );
    }

}

export default HelpViewComponent;