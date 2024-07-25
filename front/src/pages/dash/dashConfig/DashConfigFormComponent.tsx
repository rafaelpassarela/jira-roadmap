import { faCircleQuestion, faSave, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import AlertPanel from "../../../components/AlertPanelComponent";
import LoaderComponent from "../../../components/LoaderComponent";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "../DashPage.css";
import Api from "../../../helpers/Api";
import { toastAddMessage } from "../../../components/toastMessage/ToastControllerComponent";
import { IRoadmapModel } from "../../../class/RoadmapModel";

interface IDashConfigFormProps {
    id: string;
    redirect: 'dash' | 'roadmap' | 'none';
    url?: string;
    handleClose?: (isSaving: boolean) => void;
}

export default function DashConfigForm(props: IDashConfigFormProps) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');
    const [formData, setFormData] = useState<IRoadmapModel>({
        guid: '',
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        active: true,
        shares: []
    });

    useEffect(() => {
        if (props.id !== 'new' && formData.guid === '') {
            Api.Roadmap().loadRoadmap(props.id || '', 0).then((response) => {
                setFormData({
                    guid: response.guid,
                    name: response.name,
                    description: response.description,
                    startDate: response.startDate,
                    endDate: response.endDate,
                    active: response.active,
                    shares: response.shares
                });
                setIsLoading(false);
            }).catch((reason) => {
                const err = Api.getErrorMessage(reason);
                console.error(err);
                toastAddMessage({
                    title: "Erro carregando cronograma.",
                    message: err,
                    variant: "danger",
                    timeout: 10000
                });
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [props.id, formData.guid]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let aux: any;
        if (name === 'active') {
            const target = e.target as HTMLInputElement; // Convertendo para HTMLInputElement
            aux = target.checked;
        } else {
            aux = value;
        }

        setFormData({
          ...formData,
          [name]: aux
        });
    };

    function doRedirect(guid: string, isSaving: boolean) {
        switch (props.redirect) {
            case 'dash':
                navigate('/dash' + props.url);
                break;
            case 'roadmap':
                navigate('/dash/roadmap/' + guid);
                break;
            case 'none':
                // Do nothing
                props.handleClose && props.handleClose(isSaving);
                break;
            default:
                // Handle unexpected value
                console.log('Unexpected value: ' + props.redirect);
                break;
        }
    }

    const handleBack = (guid: string) => {
        doRedirect(guid, false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValidated(true);
        setValidationMessage(formData.startDate > formData.endDate ? 'A data de fim deve ser maior que a data de início.' : '');
        if (formData.startDate > formData.endDate || !e.currentTarget.checkValidity()) {
            return;
        }

        setIsLoading(true);
        Api.Roadmap().saveRoadmap(formData).then((response) => {
            toastAddMessage({
                title: 'Cronograma salvo',
                message: 'Seu cronograma foi salvo com sucesso!',
                variant: 'info',
                timeout: 10000
            })
            doRedirect(response.guid, true);
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            toastAddMessage({
                title: "Erro salvando cronograma.",
                message: err,
                variant: "danger",
                timeout: 10000
            });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <Form id="formLogin" noValidate validated={validated} onSubmit={handleSubmit} className="col-md-10">
            <Form.Group as={Col} md="12" controlId="name">
                <Form.Label>Título do Cronograma</Form.Label>
                <InputGroup className="mb-1" hasValidation>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Digite o título do cronograma"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        maxLength={100}
                        aria-describedby="name"
                        disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                        Informe um título válido.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="description">
                <Form.Label>Descrição</Form.Label>
                <InputGroup className="mb-1" hasValidation>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Digite a descrição"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={250}
                        rows={6}
                        aria-describedby="description"
                        disabled={isLoading}
                    />
                </InputGroup>
            </Form.Group>

            <Row>
                <Form.Group controlId="startDate" as={Col} md="6">
                    <Form.Label>Data de Início</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe uma data de inicio válida.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="endDate" as={Col} md="6">
                    <Form.Label>Data de Fim</Form.Label>
                    <InputGroup className="mb-1" hasValidation>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                        />
                        <Form.Control.Feedback type="invalid">
                            Informe uma data de fim válida.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="active" as={Col} md="6" className="dash-button-margin">
                    <Form.Check
                        id="active"
                        type="switch"
                        name="active"
                        label="Ativo"
                        checked={formData.active}
                        onChange={handleChange}
                        disabled={isLoading}
                    />
                    <small>
                        <FontAwesomeIcon icon={faCircleQuestion} />
                        Cronogramas desativados ficam inacessíveis e são listados separadamente.
                    </small>
                </Form.Group>
                <Col md="6">

                </Col>
            </Row>

            <Row>
                <Col md="6">
                    <Button variant="primary" type="button" onClick={() => handleBack(formData.guid)} className="dash-button-margin" disabled={isLoading}>
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

            <AlertPanel variant="danger" message={validationMessage} />
            <LoaderComponent show={isLoading} />
        </Form>
    )
}