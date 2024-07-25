import "./Roadmap.css";
import { Button, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faClock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RoadmapFindTask from "./RoadmapFindTask";
import { IssueModelListListInner } from "roadmap-client-api";

interface IRoadmapOffcanvasProps {
    guid: string;
    handleAddTask: (issue: IssueModelListListInner) => void;
}

export default function RoadmapOffcanvas(props: IRoadmapOffcanvasProps) {

    const [show, setShow] = useState(false);
    const [panel, setPanel] = useState<'task' | 'history'>('task');

    const handleClose = () => setShow(false);

    const showPanel = (option: 'task' | 'history') => {
        setPanel(option);
        setShow(true);
    }

    const getShowButtons = () => {
        return (
            <div className="roadmap-button-column">
                <Button className="btn btn-primary" size="sm" onClick={() => showPanel("task")}>
                    <FontAwesomeIcon icon={faListCheck} />
                </Button>
                <Button className="btn btn-primary" size="sm" onClick={() => showPanel("history")}>
                    <FontAwesomeIcon icon={faClock} />
                </Button>
            </div>
        );
    }

    return (
        <div>
            {!show ? <div>{getShowButtons()}</div> : null}
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{panel === "task" ? 'Localizar Tarefas' : 'Histórico'}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {panel === "task" ?
                        <RoadmapFindTask guid={props.guid} handleAddTask={props.handleAddTask} />
                    :
                        'Histórico'
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}