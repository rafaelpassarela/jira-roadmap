import { ReactNode } from "react";
import Message from "./MessageComponent";

interface IConfirmationMessageProps {
    text: string | ReactNode;
    title: string;
    show: boolean;
    centered?: boolean;
    size?: 'sm' | 'lg' | 'xl';
    onConfirm: (button: 'yes' | 'no') => void;
}

export default function ConfirmationMessage(props: IConfirmationMessageProps) {

    const handleClose = (idx: number) => {
        props.onConfirm(idx > 0 ? 'yes' : 'no');
    }

    return (
        <Message
            title={props.title}
            text={props.text}
            show={props.show}
            centered={true}
            size={props.size}
            onClose={handleClose}
            buttons={[
                { text: "Não", variant: "secondary" },
                { text: "Sim", variant: "primary" }
            ]}
        />
    )
}
