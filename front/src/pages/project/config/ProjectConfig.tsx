import PageFrame from "../../../components/PageFrameComponent";
import '../ProjectConfig.css';
import ProjectConfigList from "./ProjectConfigListComponent";

export default function ProjectConfig() {

    return (
        <PageFrame pageHeader='Configuração de Projetos'>
            <p className="project-margim">
                Configure os campos <b>Data de início</b> e <b>Data de entrega</b> utilizados no Jira
                para serem atualizados durante a sincronização dos cronogramas.
            </p>
            <ProjectConfigList />
        </PageFrame>
    );
}