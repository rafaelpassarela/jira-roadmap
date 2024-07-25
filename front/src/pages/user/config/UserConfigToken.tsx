import React, { useEffect, useState } from 'react';
import '../UserConfig.css';
import PageFrame from '../../../components/PageFrameComponent';
import { useAuthContext } from '../../../contexts/AuthContext';
import UserConfigTokenShow from './UserConfigTokenShowComponent';
import UserConfigTokenRegister from './UserConfigTokenCreateComponent';

export default function UserConfigToken() {
    const auth = useAuthContext();
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        setHasToken(auth.user?.jiraToken ? true : false);
    }, [auth.user?.jiraToken]);

    return (
        <PageFrame pageHeader='Configuração do Token Jira'>
            <div className="image-container">
                <img src="/img/jira-logo.png" alt="Logo Jira" className="image-b" />
                <img src="/img/api_token.png" alt="Lock" className="image-a" />
            </div>

            {hasToken ?
                <UserConfigTokenShow partialToken={auth.user.jiraToken}/>
              : <UserConfigTokenRegister />
            }
        </PageFrame>
    );
};
