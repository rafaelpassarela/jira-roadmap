import { faSave, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, Image, InputGroup } from 'react-bootstrap';
import React, { ChangeEvent, useState } from 'react';
import Message from '../../../components/MessageComponent';
import Api from '../../../helpers/Api';
import { ApiException, ErrorModel } from 'roadmap-client-api';
import { useAuthContext } from '../../../contexts/AuthContext';
import AlertPanel from '../../../components/AlertPanelComponent';

export default function UserConfigTokenRegister() {

    const [showMessage, setShowMessage] = useState(false);
    const [updateDisabled, setUpdateDisabled] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userToken, setUserToken] = useState('');

    const authContext = useAuthContext();

    const handleCloseMessage = (idx: number) => {
        setShowMessage(false);
        setUpdateDisabled(false);
    };

    const saveNewToken = (token: string) => {
        setErrorMessage('');
        setUpdateDisabled(true);

        Api.User().configTokenJira(token).then(() => {
            console.log('Token config. ok');
            const user = authContext.user;
            user.hasTokenJira = true;
            // set jiraToken with only 3 first characters and 3 last characters, everithing else is masked
            user.jiraToken = token.substring(0, 3) + '*'.repeat(40) + token.substring(token.length - 3);

            authContext.signInUser(user, undefined);
            // after set the new token, reload the page
            window.location.reload();
        }).catch((reason: ApiException<ErrorModel>) => {
            let err = Api.getErrorMessage(reason);
            setErrorMessage(err);
            setUpdateDisabled(false);
        });

    };

    function getHintText() {
        return (
            <div>
                Para gerar o token Jira, você deve acessar a página de Configuração de Conta Atlassian&nbsp;
                <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noreferrer">
                    através deste link
                </a> ou acessar a página de configuração de conta no Jira &rarr; "Security" &rarr; "Create and manage API tokens".
                <p className='help-box-center'>
                    <Image className='help-box-img' src="/img/token/howto_01.png" alt="Token Jira" fluid thumbnail />
                </p>
                Uma vez na tela de gerenciamento de tokens, clique em "Create API token", informe um nome para o token e clique em "Create".
                <p className='help-box-center'>
                    <Image className='help-box-img' src="/img/token/howto_02.png" alt="Token Jira" fluid thumbnail />
                </p>

                Informe o código gerado e clique no botão de confirmação.
            </div>
        );
    }

    function handleSubmit(event: any) {
        setValidated(true);
        const form = document.getElementById('formToken') as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // const tokenInput = document.getElementById('userToken') as HTMLInputElement;
            // saveNewToken(tokenInput.value);
            saveNewToken(userToken);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let aux: any;
        if (name === 'active') {
            const target = e.target as HTMLInputElement; // Convertendo para HTMLInputElement
            aux = target.checked;
        } else {
            aux = value;
        }

        setUserToken(aux);
    }

    function preventSubmit(event: any) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <div>
            <p>
                Para planejar tarefas, é necessário ter um token Jira cadastrado.<br/>
                Sem ele, você só poderá visualizar o planejamento de outras pessoas.
            </p>
            <br />
            <Form id="formToken" noValidate validated={validated} onKeyDownCapture={preventSubmit}>
                <Form.Group as={Col} md="12" controlId="userToken">
                    <Form.Label>Informe seu token no campo abaixo e clique no botão ao lado para confirmar.</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Token Jira"
                            aria-label="Token Jira"
                            aria-describedby="userToken"
                            maxLength={250}
                            onChange={handleChange}
                            required
                        />
                        <Button variant="success" id="button-addon1" onClick={handleSubmit} disabled={updateDisabled}>
                            <FontAwesomeIcon icon={faSave} />
                        </Button>

                        <Form.Control.Feedback type="invalid">
                            Informe um token de usuário válido.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Text className="text-muted">
                    {userToken.length} caracteres informados.
                </Form.Text>
            </Form>

            <div className='help-box'>
                <Button variant="light" size='sm' onClick={() => {setShowMessage(true)}}>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    Ajuda para criar o token
                </Button>
            </div>

            <Message
                title="Configurando o Token Jira"
                text={getHintText()}
                show={showMessage}
                centered={true}
                size='lg'
                onClose={handleCloseMessage}
                buttons={[
                    { text: 'Fechar', variant: 'primary' }
                ]}
            />

            <AlertPanel message={errorMessage}/>
        </div>
    );
};
