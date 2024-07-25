import { Spinner } from "react-bootstrap";
import './css/Loader.css';

interface ILoaderComponentProps {
    show: boolean;
    variant?: string;
    small?: boolean;
    message?: string;
}

export default function LoaderComponent(props: ILoaderComponentProps) {

    return (
        props.show ?
            <div className="loader-overlay">
                <div className="loader-content">
                    <Spinner className="loader-spinner" animation="border" role="status" variant={props.variant || 'primary'} size={props.small ? 'sm' : undefined} />
                    <p>
                        {props.message || 'Aguarde...'}
                    </p>
                </div>
            </div>
            : null
    )

}