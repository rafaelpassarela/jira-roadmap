import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import Message from '../../../components/MessageComponent';
import Api from '../../../helpers/Api';
import { ApiException, ErrorModel } from 'roadmap-client-api';
import { useAuthContext } from '../../../contexts/AuthContext';

interface IUserConfigTokenShowProps {
    partialToken: string;
}

export default function UserConfigTokenShow(props: IUserConfigTokenShowProps) {

    const [showMessage, setShowMessage] = useState(false);
    const [deleteDisabled, setDeleteDisabled] = useState(false);
    const authContext = useAuthContext();

    const removeToken = () => {
        setShowMessage(!showMessage);
    }

    const handleCloseMessage = (idx: number) => {
        setShowMessage(false);
        // idx = 1, remove token
        if (idx === 1) {
            setDeleteDisabled(true);
            Api.User().removeTokenJira().then(() => {
                console.log('Token removed');
                const user = authContext.user;
                user.hasTokenJira = false;
                user.jiraToken = '';
                authContext.signInUser(user, undefined);
                // after remove the token, reload the page
                window.location.reload();
            }).catch((reason: ApiException<ErrorModel>) => {
                let err = Api.getErrorMessage(reason);
                console.error(err);
            });
        }
    };

    return (
        <div>
            Seu token Jira já está configurado, mas não será exibido por questões de segurança. <br />
            <br />
            <Form.Group as={Col} md="12" controlId="userToken">
                    <Form.Label>Token parcial exibido abaixo:</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="text"
                            defaultValue={props.partialToken}
                            placeholder="Token Jira"
                            aria-label="Token Jira"
                            aria-describedby="userToken"
                            maxLength={100}
                            disabled
                            required
                        />

                        <Button variant="outline-danger" id="button-addon1" onClick={removeToken} disabled={deleteDisabled}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </Button>

                        <Form.Control.Feedback type="invalid">
                            Informe um token de usuário válido.
                        </Form.Control.Feedback>
                    </InputGroup>
            </Form.Group>

            <Message
                title="Atenção!"
                text="Deseja remover seu token Jira?" show={showMessage}
                onClose={handleCloseMessage}
                buttons={[
                    { text: 'Cancelar', variant: 'outline-primary' },
                    { text: 'Sim', variant: 'outline-danger' }
                ]}
            />
        </div>
    );
};
