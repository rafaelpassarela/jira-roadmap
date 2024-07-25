import React, { ChangeEvent, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import Cookies from 'js-cookie';
import Api from "../../helpers/Api";
import { toastAddMessage } from "../../components/toastMessage/ToastControllerComponent";
import FindItem, { FindItemModel } from "../../components/FindItemComponent";
import { IssueModelListListInner } from "roadmap-client-api";

interface FindTaskFormData {
    guid: string
    filter: string;
    subTasks: boolean;
}

interface IRoadmapFindTaskProps {
    guid: string;
    handleAddTask: (issue: IssueModelListListInner) => void;
}

export default function RoadmapFindTask(props: IRoadmapFindTaskProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState<FindTaskFormData>({
        guid: props.guid,
        subTasks: false,
        filter: Cookies.get('lastFilter') || ''
    });
    const [issues, setIssues] = useState<FindItemModel[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let aux: any;
        if (name === 'subTasks') {
            const target = e.target as HTMLInputElement; // Convertendo para HTMLInputElement
            aux = target.checked;
        } else {
            aux = value;
        }

        if (validated) {
            setValidated(false);
        }

        setFormData({
          ...formData,
          [name]: aux
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        Cookies.set('lastFilter', formData.filter);

        if (!e.currentTarget.checkValidity()) {
            return;
        }

        setIsLoading(true);
        Api.Issue().findIssues(formData).then((response) => {
            setIssues(response.list.map((issue) => {
                return {
                    ...issue,
                    selected: false
                }
            }));

        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            console.error(err);
            toastAddMessage({
                title: "Erro localizando tarefas",
                message: err,
                variant: "danger",
                timeout: 10000
            })
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div>
            <Form id="formLogin" noValidate validated={validated} onSubmit={handleSubmit} className="col-md-12">
                <Form.Group as={Col} md="12" controlId="filter">
                    <Form.Label>Informe a Tarefa ou Filtro</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="text"
                            name="filter"
                            placeholder="Digite uma tarefa ou um filtro JQL"
                            value={formData.filter}
                            onChange={handleChange}
                            required
                            maxLength={255}
                            aria-describedby="filter"
                        />
                        <Button className="roadmap-filter-button" variant="primary" id="input-code" type="submit" disabled={isLoading}>
                            {isLoading ?
                                <Spinner animation="border" role="status" size="sm" />
                            :
                                <FontAwesomeIcon icon={faFilter} />
                            }
                        </Button>
                        <Form.Control.Feedback type="invalid">
                            Informe um filtro válido.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Row>
                    <Form.Group controlId="subTasks" as={Col} md="6" className="dash-button-margin">
                        <Form.Check
                            id="subTasks"
                            type="switch"
                            name="subTasks"
                            label="Incluir Subtarefas"
                            checked={formData.subTasks}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </Form.Group>
                    <Col md="6">

                    </Col>
                </Row>

            </Form>

            {issues.map((issue) => {
                return (
                    <FindItem {...issue} key={issue.keyJira} handleAddTask={props.handleAddTask} />
                );
            })}
        </div>
    );

}