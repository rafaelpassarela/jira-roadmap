import { Col, Container, Row } from "react-bootstrap";
import { IssueModelListListInner } from "roadmap-client-api";
import './css/TaskComponent.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faShare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export interface FindItemModel extends IssueModelListListInner {
    handleAddTask?: (issue: IssueModelListListInner) => void;
}

export default function FindItem(props: FindItemModel) {

    const [exists, setExists] = useState(props.exists);

    const handleAddTask = () => {
        setExists(true);
        if (props.handleAddTask) {
            props.handleAddTask(props);
        }
    }

    return (
        <div className="issue-container">
            <div className="task-description no-warp-text" title={props.summary}>
                {props.summary}
            </div>
            <Container className="task-font-small">
                <Row style={{ gap: 2 }}>
                    <Col className="mx-0 px-0">
                        <div className="task-type-box">
                            <img className='task-type-img' src={props.icoUrl} alt={props.issueType} title={props.issueType} />
                            <a href={props.issueUrl} target="_blank" rel="noreferrer">
                                {props.keyJira}
                            </a>
                        </div>
                    </Col>
                    <Col className="mx-0 px-0 no-warp-text">
                        <div className="task-type-box" title={props.status}>
                            {props.status}
                        </div>
                    </Col>
                    <Col className="mx-0 px-0">
                        <div className="task-type-box no-warp-text">
                            {props.assignee}
                        </div>
                    </Col>
                    <Col xs={1} className="mx-0 px-0">
                        {exists ?
                            <div className="issue-button issue-button-disabled">
                                <FontAwesomeIcon icon={faCheck} title="Já está no cronograma" />
                            </div>
                        :
                            <div className="issue-button issue-button-add" onClick={handleAddTask}>
                                <FontAwesomeIcon icon={faShare} title={"Adicionar " + props.keyJira + " ao cronograma"}/>
                            </div>
                        }
                    </Col>
                </Row>
            </Container>
        </div>

    );
}