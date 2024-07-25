import { useParams } from "react-router-dom";
import '../DashPage.css';
import PageFrame from "../../../components/PageFrameComponent";
import DashConfigForm from "./DashConfigFormComponent";
import { useQueryStringContext } from "../../../contexts/QueryStringContext";

export default function DashConfigPage() {

    const queryContext = useQueryStringContext();
    const { id } = useParams();

    const getHeaderCaption = () => {
        if (id === 'new') {
            return "Novo Cronograma";
        }

        return "Editar Cronograma";
    }

    const getUrl = () => {
        return queryContext.getNavURL();
    }

    return (
        <PageFrame pageHeader={getHeaderCaption()} expanded>
            <DashConfigForm
                id={id || 'new'}
                redirect="dash"
                url={getUrl()}
            />
        </PageFrame>
    );
}