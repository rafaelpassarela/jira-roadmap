import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { IProjectConfigModel } from "../ProjectConfigProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faSave } from "@fortawesome/free-solid-svg-icons";
import Api from "../../../helpers/Api";
import { toastAddMessage } from "../../../components/toastMessage/ToastControllerComponent";

interface IProjectEditPorops extends IProjectConfigModel {
    handleClose: (isSaving: boolean) => void;
}

export default function ProjectConfigEdit(props: IProjectEditPorops) {

    const [formData, setFormData] = useState<IProjectConfigModel>(props);
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        if (!e.currentTarget.checkValidity()) {
            e.stopPropagation();
            return;
        }
        setIsLoading(true);
        Api.Project().saveProject(formData).then((response) => {
            toastAddMessage({
                title: 'Projeto salvo',
                message: 'O projeto foi salvo com sucesso!',
                variant: 'info',
                timeout: 10000
            });
            props.handleClose(true);
        }).catch((reason) => {
            const error = Api.getErrorMessage(reason);
            toastAddMessage({
                title: 'Erro ao salvar',
                message: error,
                variant: 'danger',
                timeout: 10000
            });
            console.error(error);
        });
    };

    return (
        <Form id="formLogin" noValidate validated={validated} onSubmit={handleSubmit} className="col-md-10">
            <Form.Group as={Col} md="12" controlId="projectKey">
                <Form.Label>Chave do Projeto</Form.Label>
                <InputGroup className="mb-1" hasValidation>
                    <Form.Control
                        type="text"
                        name="projectKey"
                        placeholder="ABC"
                        value={formData.projectKey}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        aria-describedby="projectKey"
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Informe uma chave válida.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="startDate">
                <Form.Label>Campo para Data Inicio</Form.Label>
                <InputGroup className="mb-1" hasValidation>
                    <Form.Control
                        type="text"
                        name="startDate"
                        placeholder="customfield_123"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        aria-describedby="startDate"
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Informe um campo válido.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="dueDate">
                <Form.Label>Campo para Data Fim</Form.Label>
                <InputGroup className="mb-1" hasValidation>
                    <Form.Control
                        type="text"
                        name="dueDate"
                        placeholder="customfield_456"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        aria-describedby="dueDate"
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Informe um campo válido.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Row>
                <Col md="6">
                    <Button variant="primary" type="button" className="dash-button-margin" disabled={isLoading} onClick={() => props.handleClose(false)} >
                        <FontAwesomeIcon icon={faLeftLong} />
                        Voltar
                    </Button>
                </Col>
                <Col md="6" className="dash-button-back">
                    <Button variant="success" type="submit" className="dash-button-margin" disabled={isLoading}>
                        <FontAwesomeIcon icon={faSave} />
                        Salvar
                    </Button>
                </Col>
            </Row>
        </Form>
    );

}
