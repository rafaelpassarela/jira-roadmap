import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Table } from "react-bootstrap";
import { AddShareParam, RoadmapModelSharesInner } from "roadmap-client-api";
import Api from "../../helpers/Api";
import Message from "../../components/MessageComponent";
import { toastAddMessage } from "../../components/toastMessage/ToastControllerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import RoadmapShareItem from "./RoadmapShareItemComponent";

interface IRoadmapShareProps {
    guid: string;
    show: boolean;
    list: Array<RoadmapModelSharesInner>;
    handleClose: () => void;
    onUpdateShareList: (list: Array<RoadmapModelSharesInner>) => void;
}

export default function RoadmapShare(props: IRoadmapShareProps) {

    const [userEmail, setUserEmail] = useState<string>('');
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>('');

    const formData: AddShareParam = {
        guid: props.guid,
        email: '',
        readOnly: false
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setUserEmail(value);
        }
        setUserEmail(value);
    };

    const handleChangeReadOnly = (email: string, readOnly: boolean) => {
        sendData(email, readOnly);
    }

    function handleClose() {
        props.handleClose();
    }

    const sendData = (email: string, readOnly: boolean) => {
        setIsLoading(true);

        formData.email = email;
        formData.readOnly = readOnly;

        Api.Roadmap().share(formData).then((response) => {
            // console.log(response);
            toastAddMessage({
                title: 'Compartilhamento salvo',
                message: 'Cronograma compartilhado com sucesso para ' + formData.email + '!',
                variant: 'info',
                timeout: 10000
            });
            props.onUpdateShareList(response.list);
        }).catch((reason) => {
            const error = Api.getErrorMessage(reason);
            setMessage(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        setMessage('');
        if (!e.currentTarget.checkValidity()) {
            e.stopPropagation();
            return;
        }
        sendData(userEmail, true);
    };

    const handleRemove = (userEmail: string) => {
        Api.Roadmap().removeShare({guid: props.guid, email: userEmail}).then((response) => {
            // console.log(response);
            toastAddMessage({
                title: 'Compartilhamento removido',
                message: 'Cronograma removido com sucesso para ' + userEmail + '!',
                variant: 'info',
                timeout: 10000
            });
            props.onUpdateShareList(response.list);
        }).catch((reason) => {
            const error = Api.getErrorMessage(reason);
            toastAddMessage({
                title: 'Erro',
                message: error,
                variant: 'danger',
                timeout: 10000
            });
        });
    }

    function getEditNode() {
        return (
            <div>
                <Container>
                    <p>
                        Aqui você pode definir quais usuários têm acesso ao cronograma. Por padrão, apenas você tem acesso.
                        Aproveite para especificar se eles podem editar o cronograma ou apenas visualizá-lo em modo somente leitura.
                    </p>
                    <Form id="formLogin" noValidate validated={validated} onSubmit={handleSubmit} className="col-md-12">
                        <Form.Group as={Col} md="12" controlId="email">
                            <InputGroup className="mb-1" hasValidation>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    placeholder="Informe o email ou nome de usuário"
                                    value={userEmail}
                                    onChange={handleChange}
                                    required
                                    maxLength={255}
                                    aria-describedby="email"
                                    disabled={isLoading}
                                />
                                <Button variant="outline-primary" id="button-addon1" type="submit" disabled={isLoading}>
                                    <FontAwesomeIcon icon={faSave} />
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                    Informe um email ou nome de usuário válido.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <div className="roadmap-share-error">
                        {message}
                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Usuário</th>
                                <th>Somente Leitura</th>
                            </tr>
                        </thead>
                    {props.list ?
                        <tbody>
                            {
                                props.list.map((item) => {
                                    return (
                                        <RoadmapShareItem
                                            key={item.id}
                                            item={item}
                                            handleRemove={handleRemove}
                                            handleChange={handleChangeReadOnly}
                                        />
                                    );
                                })
                            }
                        </tbody>
                    : ''}
                    </Table>
                </Container>
            </div>
        );
    }

    return (
        <Message
            title="Compartilhar Cronograma"
            text={getEditNode()}
            show={props.show}
            centered={true}
            size='lg'
            onClose={() => handleClose()}
            buttons={[]}
        />
    );
}
