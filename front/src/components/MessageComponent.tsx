import React, { ReactNode } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IMessageButton {
    text: string;
    variant: string;
}

interface IMessageProps {
    text: string | ReactNode;
    title: string;
    show: boolean;
    centered?: boolean;
    size?: 'sm' | 'lg' | 'xl';
    buttons: IMessageButton[];
    onClose: (idx: number) => void;
}

export default function Message(props: IMessageProps) {

    return (
        <Modal
            show={props.show}
            onHide={() => props.onClose(-1)}
            backdrop="static"
            keyboard={false}
            centered={props.centered}
            size={props.size}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.text}
            </Modal.Body>
            {props.buttons.length > 0 ?
                <Modal.Footer>
                {props.buttons.map((button, index) => (
                    <Button key={index} variant={button.variant} onClick={() => props.onClose(index)}>
                        {button.text}
                    </Button>
                ))}
                </Modal.Footer> : null
            }
        </Modal>
    )
};
