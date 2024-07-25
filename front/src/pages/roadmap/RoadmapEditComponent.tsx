import "./Roadmap.css";
import Message from "../../components/MessageComponent";
import DashConfigForm from "../dash/dashConfig/DashConfigFormComponent";

interface IRoadmapEditProps {
    show: boolean;
    guid: string;
    handleClose: (isSaving: boolean) => void;
}

export default function RoadmapEdit(props: IRoadmapEditProps) {

    function handleClose(isSaving: boolean) {
        props.handleClose(isSaving);
    }

    function getEditNode() {
        return (
            <div className="roadmap-edit-container">
                <DashConfigForm
                    id={props.guid}
                    redirect="none"
                    handleClose={ handleClose }
                />
            </div>
        );
    }

    return (
        <Message
            title="Editar Cronograma"
            text={getEditNode()}
            show={props.show}
            centered={true}
            size='lg'
            onClose={() => props.handleClose(false)}
            buttons={[]}
        />
    );
}