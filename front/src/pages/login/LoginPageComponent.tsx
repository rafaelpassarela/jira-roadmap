import { useState } from 'react';
import './LoginPage.css';
import LoginCodeValidation from './LoginCodeValidationComponent';
import LoginUserName from './LoginUserNameComponent';
import LoginEmailValidation from './LoginEmailValidationComponent';
import PageFrame from '../../components/PageFrameComponent';

/*
LoginView
-> UserName -> Emailvalidation -> CodeValidation
*/

export interface LoginBaseProps {
    statusCallback: (newStatus : LoginStatus) => void;
}

export type UserInfo = {
    userName: string;
    userEmail: string;
    userAvatar: string;
}

export type LoginStatus = "enter_username" | "validating_username" | "code_validation" | "error";

export type ChangeStatusCallback = (newStatus: LoginStatus) => void;

export default function LoginPage() {

    const [status, setStatus] = useState<LoginStatus>("enter_username");
    const [email, setEmail] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userAvatar: '',
        userName: '',
        userEmail: ''
    });

    let headerText = 'Efetuar Login';

    function statusCallback(newStatus : LoginStatus) {
        setStatus(newStatus);
    }

    function emailCallback(newEmail : string) {
        setEmail(newEmail);
    }

    function errorMessageCallback(error: string) {
        setErrorMessage(error);
    }

    function userInfoCallback(newUserInfo : UserInfo) {
        setUserInfo(newUserInfo);
    }

    function getCurrentView() {
        switch (status) {
            case "enter_username":
                return (
                    <LoginUserName
                        defaultUsername={email}
                        errorMessage={errorMessage}
                        statusCallback={statusCallback}
                        emailCallback={emailCallback}
                    />
                )

            case "validating_username":
                return (
                    <LoginEmailValidation
                        userEmail={email}
                        statusCallback={statusCallback}
                        errorCallback={errorMessageCallback}
                        userInfoCallback={userInfoCallback}
                    />
                )

            case "code_validation":
                return (
                    <LoginCodeValidation
                        userAvatar={userInfo.userAvatar}
                        userEmail={userInfo.userEmail}
                        userName={userInfo.userName}
                    />
                )
        }
        return (
            <div>Status desconhecido {status}.</div>
        )
    }

    function getHeader() {
        switch (status) {
            case 'enter_username':
                return 'Efetuar Login';
            case 'validating_username':
                return 'Validando Usuário';
            case 'code_validation':
                return 'Código de Autenticação';
            default:
                break;
        }
        return headerText;
    }

    return (
        <PageFrame pageHeader={getHeader()}>
            {getCurrentView()}
        </PageFrame>
    );
}