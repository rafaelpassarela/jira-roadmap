import { Alert } from "react-bootstrap";

interface IAlertPanelProps {
    message: string;
    title?: string;
    variant?: string;
    dismissible?: boolean;
}

export default function AlertPanel(props: IAlertPanelProps) {

    const getVariant = () => {
        if (props.variant === undefined) {
            return 'danger';
        } else {
            return props.variant;
        }
    }

    const getTitle = () => {
        if (props.title !== undefined) {
            return <Alert.Heading>{props.title}</Alert.Heading>;
        } else {
            return <span></span>;
        }
    }

    return (
        <span>
            {props.message !== '' ? (
                <div className='login-padding'>
                    <Alert variant={getVariant()} dismissible={props.dismissible}>
                        {getTitle()}
                        <p>
                            {props.message}
                        </p>
                    </Alert>
                </div>
            ) : (
                <span></span>
            )}
        </span>
    );
}