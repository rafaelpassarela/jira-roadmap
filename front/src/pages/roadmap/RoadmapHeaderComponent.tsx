import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faPenToSquare, faRotate, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RoadmapModelSharesInner } from "roadmap-client-api";
import RoadmapEdit from "./RoadmapEditComponent";
import ConfirmationMessage from "../../components/ConfirmationMessageComponent";
import RoadmapShare from "./RoadmapShareComponent";
import "./Roadmap.css";

interface IRoadmapHeaderProps {
    guid: string;
    name: string;
    description: string;
    shareList: Array<RoadmapModelSharesInner>;
    level: number;
    onSaving: () => void;
    onSyncIssues: () => void;
    onUpdateShareList: (list: Array<RoadmapModelSharesInner>) => void;
}

export default function RoadmapHeader(props: IRoadmapHeaderProps) {

    const [showEdit, setShowEdit] = useState(false);
    const [showSyncConf, setShowSyncConf] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.name === undefined) return;

        const divElement = document.querySelector('.roadmap-title') as HTMLDivElement;
        if (divElement) {
            const height = divElement.offsetHeight + 30;
            document.documentElement.style.setProperty('--roadmap-title-height', `${height}px`);
        }
    }, [props.name]);

    const handleEdit = (isSaving: boolean) => {
        setShowEdit(false);
        if (isSaving) {
            props.onSaving();
        }
    }

    const confirmSync = (button: 'yes' | 'no') => {
        setShowSyncConf(false);
        if (button === 'yes') {
            props.onSyncIssues();
        }
    }

    const getConfirmationText = () => {
        return (
            <span>
                Deseja sincronizar as tarefas do Jira com o cronograma?<br/><br/>
                <small>
                    Os seguintes dados serão atualizados no cronograma:
                    <ul>
                        <li>Status das tarefas</li>
                        <li>Responsável</li>
                        <li>Descrição</li>
                        <li>Tipo de item</li>
                    </ul>
                    Os seguintes dados serão atualizados no Jira:
                    <ul>
                        <li>Data de início</li>
                        <li>Data de término</li>
                    </ul>
                </small>
            </span>
        );
    }

    return (
        <div className="roadmap-title">
            <div className="roadmap-title-container">
                <Container>
                    <Row>
                        <Col md={10}>
                            <h3>{props.name || ' '}</h3>
                        </Col>
                        <Col md={2} className="roadmap-right-align">
                            <Button size="sm" variant="outline-info" title="Voltar para o Dash" onClick={() => navigate('/dash')}>
                                <FontAwesomeIcon icon={faLeftLong} className="roadmap-header-button" />
                            </Button>
                            <Button size="sm" variant="outline-info" title="Editar dados do Cronograma" onClick={() => setShowEdit(true)} disabled={props.level === 2}>
                                <FontAwesomeIcon icon={faPenToSquare} className="roadmap-header-button" />
                            </Button>
                            <Button size="sm" variant="outline-info" title="Compartilhar Cronograma" onClick={() => setShowShare(true)} disabled={props.level === 2}>
                                <FontAwesomeIcon icon={faUsers} className="roadmap-header-button" />
                            </Button>
                            <Button size="sm" variant="outline-warning" title="Sincronizar tarefas com o Jira" onClick={() => setShowSyncConf(true)} disabled={props.level === 2}>
                                <FontAwesomeIcon icon={faRotate} className="roadmap-header-button" />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p>{props.description || ' '}</p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <RoadmapEdit
                show={showEdit}
                guid={props.guid}
                handleClose={handleEdit}
            />

            <RoadmapShare
                guid={props.guid}
                show={showShare}
                list={props.shareList}
                handleClose={() => setShowShare(false)}
                onUpdateShareList={props.onUpdateShareList}
            />

            <ConfirmationMessage
                show={showSyncConf}
                title="Sincronizar tarefas com o Jira"
                text={getConfirmationText()}
                onConfirm={confirmSync}
            />
        </div>
    );
}