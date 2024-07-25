import React from "react";
import '../ProjectConfig.css';
import { IProjectConfigItemProps } from "../ProjectConfigProps";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProjectConfigItem(props: IProjectConfigItemProps) {

    return (
        <tr>
            <td className="project-grid-row">
                <Button
                    className="project-grid-btn"
                    variant="outline-primary"
                    size="sm"
                    title="Editar"
                    disabled={props.projectKey === 'DEFAULT'}
                    onClick={() => props.handleUpdate(props)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                    className="project-grid-btn"
                    variant="outline-danger"
                    size="sm"
                    title="Remover"
                    disabled={props.projectKey === 'DEFAULT'}
                    onClick={() => props.handleRemove(props.projectKey)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </td>
            <td className="project-grid-row">
                {props.projectKey}
            </td>
            <td className="project-grid-row">
                {props.startDate}
            </td>
            <td className="project-grid-row">
                {props.dueDate}
            </td>
        </tr>
    );
}

