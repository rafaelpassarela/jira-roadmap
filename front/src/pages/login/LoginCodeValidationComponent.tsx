// import { useState } from "react";
import { UserInfo } from "./LoginPageComponent";
import CodeValidation from "../../components/CodeValidationComponent";

export default function LoginCodeValidation(userInfo: UserInfo) {

    return (
        <div className="login-perfil-container login-frames">
            <img className="login-avatar login-avatar-size" src={userInfo.userAvatar} alt={userInfo.userName} />
            <div className="login-infouser login-perfil-container">
                <div className="login-username">{userInfo.userName}</div>
                <div className="login-useremail">{userInfo.userEmail}</div>
                <CodeValidation userEmail={userInfo.userEmail} />
            </div>
        </div>
    )
}
