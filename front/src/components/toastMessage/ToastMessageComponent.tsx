import { Toast } from "react-bootstrap";
import { IToastMessageProps } from "./ToastControllerComponent";
import { useState } from "react";

export default function ToastMessage(props: IToastMessageProps) {

    const [show, setShow] = useState<boolean>(true);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={props.timeout || 5000} autohide bg={props.variant}>
            <Toast.Header>
                <strong className="me-auto">{props.title || 'Jira Roadmap'}</strong>
                <small>{props.timeInfo || ''}</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )

}