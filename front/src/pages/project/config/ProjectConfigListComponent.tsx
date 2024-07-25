import React, { useEffect, useState } from 'react';
import Api from '../../../helpers/Api';
import '../ProjectConfig.css';
import { Button, Container, Table } from 'react-bootstrap';
import { ProjectConfigModelListListInner } from 'roadmap-client-api';
import LoaderComponent from '../../../components/LoaderComponent';
import ProjectConfigItem from './ProjectConfigItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { IProjectConfigModel } from '../ProjectConfigProps';
import Message from '../../../components/MessageComponent';
import ProjectConfigEdit from './ProjectConfigEditComponent';
import { toastAddMessage } from '../../../components/toastMessage/ToastControllerComponent';

interface IProjectModel extends ProjectConfigModelListListInner {

}

export default function ProjectConfigList() {

    const [projects, setProjects] = useState<IProjectModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState<IProjectConfigModel | undefined>(undefined);

    const getProjects = () => {
        Api.Project().getProjects().then((response) => {
            setProjects(response.list as IProjectModel[]);
            setIsLoading(false);
        }).catch((reason) => {
            const error = Api.getErrorMessage(reason);
            console.error(error);
            toastAddMessage({
                title: 'Erro carregando projetos',
                message: error,
                variant: 'danger',
                timeout: 10000
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        getProjects();
    }, []);

    const handleUpdate = (object: IProjectConfigModel | undefined) => {
        setEditData(object);
        setShowEdit(true);
    }

    const handleRemove = (projectKey: string) => {
        setIsLoading(true);
        Api.Project().removeProject(projectKey).then((response) => {
            toastAddMessage({
                title: 'Projeto removido',
                message: 'O projeto foi removido com sucesso!',
                variant: 'info',
                timeout: 10000
            });
            getProjects();
        }).catch((reason) => {
            const error = Api.getErrorMessage(reason);
            toastAddMessage({
                title: 'Erro ao salvar',
                message: error,
                variant: 'danger',
                timeout: 10000
            });
            setIsLoading(false);
            console.error(error);
        });
    }

    const handleCloseEdit = (isSaving: boolean) => {
        setShowEdit(false);
        if (isSaving) {
            setIsLoading(true);
            getProjects();
        }
    }

    const getEditNode = () => {
        return (
            <div className="roadmap-edit-container">
                <ProjectConfigEdit
                    dueDate={editData ? editData.dueDate : ''}
                    projectKey={editData ? editData.projectKey : ''}
                    startDate={editData ? editData.startDate : ''}
                    handleClose={handleCloseEdit}
                />
            </div>
        );
    }

    return (
        <Container>
            <LoaderComponent message="Aguarde... Carregando lista de projetos" show={isLoading}/>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>
                            <Button className="project-grid-btn" variant="outline-primary" size="sm" title="Novo" onClick={() => handleUpdate(undefined)}>
                                <FontAwesomeIcon icon={faFileCirclePlus} />
                            </Button>
                        </th>
                        <th>Chave Projeto</th>
                        <th>Data Inicio</th>
                        <th>Data Fim</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <ProjectConfigItem
                            key={project.projectKey}
                            projectKey={project.projectKey}
                            startDate={project.startDate}
                            dueDate={project.dueDate}
                            handleRemove={handleRemove}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </tbody>
            </Table>

            <Message
                title={editData?.projectKey.trim() === undefined ? 'Configurar Novo Projeto' : 'Editar Projeto ' + editData?.projectKey.trim()}
                text={getEditNode()}
                show={showEdit}
                centered={true}
                size='lg'
                onClose={() => handleCloseEdit(false)}
                buttons={[]}
            />
        </Container>
    );
}