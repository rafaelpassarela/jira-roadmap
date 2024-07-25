import { useState, useEffect } from 'react';
import './LoginPage.css';
import Api from '../../helpers/Api';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ConfigItem } from 'roadmap-client-api';
import { LoginBaseProps } from './LoginPageComponent';
import AlertPanel from '../../components/AlertPanelComponent';

interface LoginUserNameParam extends LoginBaseProps {
    errorMessage: string;
    defaultUsername: string;
    emailCallback: (newEmail : string) => void;
}

export default function LoginUserName(props: LoginUserNameParam) {

    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mailDomain, setMailDomain] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setValidated(props.defaultUsername !== '');
        Api.Config().getConfig(1).then((config: ConfigItem) => {
            setMailDomain(config.value);
            setIsLoading(false);
        }).catch((reason: any) => {
            console.log(reason);
            setIsLoading(false);
        });
    }, [setMailDomain, setIsLoading, setValidated, props.defaultUsername]);

    function handleSubmit(event: any) {
        setValidated(true);
        const form = document.getElementById('formLogin') as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const nameInput = document.getElementById('userName') as HTMLInputElement;
            props.emailCallback(nameInput.value);
            props.statusCallback('validating_username');
        }
    };

    function preventSubmit(event: any) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit(event);
        }
    }

    return (
        <div className="login-frames">
            <Form id="formLogin" noValidate validated={validated} onKeyDownCapture={preventSubmit}>
                <Form.Group as={Col} md="12" controlId="userName">
                    <Form.Label>Informe o seu e-mail cadastrado no Jira</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="text"
                            defaultValue={props.defaultUsername}
                            placeholder="Usuário Jira"
                            aria-label="Usuário Jira"
                            aria-describedby="userName"
                            maxLength={150}
                            required
                        />
                        <InputGroup.Text id="userName">{mailDomain}</InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            Informe um nome de usuário válido.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Row>
                    <Col sm="12">
                        <Button variant="primary" disabled={isLoading} onClick={handleSubmit}>Entrar</Button>
                    </Col>
                </Row>

                <AlertPanel message={props.errorMessage} />
            </Form>
        </div>
    );
}
