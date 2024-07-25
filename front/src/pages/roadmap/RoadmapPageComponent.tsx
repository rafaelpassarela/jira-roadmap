import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Api from "../../helpers/Api";
import LoaderComponent from "../../components/LoaderComponent";
import { IssueModelListListInner, LoadRoadmap200Response, RoadmapModelSharesInner } from "roadmap-client-api";
import RoadmapHeader from "./RoadmapHeaderComponent";
import { useNavigate } from "react-router-dom";
import { toastAddMessage } from "../../components/toastMessage/ToastControllerComponent";
import RoadmapOffcanvas from "./RoadmapOffcanvasComponent";
import RoadmapDays from "./RoadmapDaysComponent";
import Task from "../../components/TaskComponent";

class RoadmapData extends LoadRoadmap200Response {
}

export default function RoadmapPage() {

    const [isLoading, setIsLoading] = useState(true);
    const [roadmapData, setRoadmapData] = useState<RoadmapData>(new RoadmapData());
    const [lastTop, setLastTop] = useState<number>(250);

    const navigate = useNavigate();
    const { id } = useParams();
    const days: string[] = useMemo(() => [], []);

    useEffect(() => {
        Api.Roadmap().loadRoadmap(id || '', 1).then((response) => {
            setRoadmapData(response);

            if (days.length === 0 || days[0] !== response.startDate || days[days.length - 1] !== response.endDate) {
                const fromDate = new Date(response.startDate);
                const toDate = new Date(response.endDate);
                const aux: string[] = [];
                for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
                    const formattedDate = date.toISOString().split('T')[0];
                    aux.push(formattedDate);
                }
                days.push(...aux);
            }
            setIsLoading(false);
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            try {
                if (reason.code === 404) {
                    toastAddMessage({
                        title: 'Cronograma não encontrado',
                        message: err,
                        variant: 'danger'
                    });
                    navigate('/404');
                }
            } catch (error) {
                console.error(error);
            }
        });
    }, [id, navigate, days]);

    const handleSaving = () => {
        // load only the main data
        Api.Roadmap().loadRoadmap(id || '', 1).then((response) => {
            setRoadmapData(response);
            setIsLoading(false);
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            console.error(err);
        });
    }

    const handleSyncIssues = () => {
        setIsLoading(true);
        Api.Roadmap().syncRoadmapIssues(id || '').then((response) => {
            setRoadmapData(response);
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            console.error(err);
            toastAddMessage({
                title: 'Erro sincronizando tarefas',
                message: err,
                variant: 'danger'
            });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleAddTask = (issue: IssueModelListListInner) => {
        // add to state
        const aux: IssueModelListListInner = { ...issue, top: lastTop };
        setLastTop(lastTop > 800 ? 250 : lastTop + 30);
        setRoadmapData(prevState => {
            const updatedList = [...(prevState.issues || []), aux];
            return { ...prevState, issues: updatedList };
        });

        // send to api
        Api.Issue().addIssue(roadmapData.guid, aux).then(() => {
            toastAddMessage({
                title: 'Tarefa adicionada',
                message: 'Tarefa ' + issue.keyJira + ' adicionada ao cronograma',
                variant: 'info'
            });
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            toastAddMessage({
                title: 'Erro adicionando tarefa',
                message: err,
                variant: 'danger'
            });
        });
    }

    const handleRemoveTask = (keyJira: string) => {
        setRoadmapData(prevState => {
            const updatedList = (prevState.issues || []).filter((issue) => issue.keyJira !== keyJira);
            return { ...prevState, issues: updatedList };
        });

        // send to api
        Api.Issue().removeIssue(roadmapData.guid, keyJira).then(() => {
            toastAddMessage({
                title: 'Tarefa removida',
                message: 'Tarefa ' + keyJira + ' removida do cronograma',
                variant: 'info'
            });
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            toastAddMessage({
                title: 'Erro removendo tarefa',
                message: err,
                variant: 'danger'
            });
        });
    };

    const handleUpdateTask = (keyJira: string, top: number, left: number, width: number) => {
        const issue = {
            key: keyJira,
            top,
            left,
            width
        };
        Api.Issue().updateIssue(roadmapData.guid, issue).then(() => {
            toastAddMessage({
                title: 'Tarefa atualizada',
                message: 'Tarefa ' + keyJira + ' foi atualizada',
                variant: 'info'
            });
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            console.error(err);
            toastAddMessage({
                title: 'Erro atualizando tarefa',
                message: err,
                variant: 'danger'
            });
        });
    }

    const handleUpdateShareList = (list: Array<RoadmapModelSharesInner>) => {
        setRoadmapData(prevState => {
            return { ...prevState, shares: list };
        });
    }

    const getAxisLimitX = () => {
        return ((days.length - 1) * 75) + 10;
    }

    return (
        <div className="max-height">
            <LoaderComponent message="Aguarde... Carregando cronograma" show={isLoading}/>
            <RoadmapHeader
                guid={roadmapData.guid}
                name={roadmapData.name}
                description={roadmapData.description}
                shareList={roadmapData.shares}
                level={roadmapData.level === undefined ? 2 : roadmapData.level}
                onSaving={handleSaving}
                onSyncIssues={handleSyncIssues}
                onUpdateShareList={handleUpdateShareList}
            />
            <div className="roadmap-main-content">
                {roadmapData.level !== undefined && roadmapData.level < 2 ?
                    <RoadmapOffcanvas guid={roadmapData.guid} handleAddTask={handleAddTask}/>
                : null }

                {/* monta os dias do cronograma */}
                {days.length > 0 && <>
                    {days.map((day, index) => {
                        return (
                            <RoadmapDays
                                key={index}
                                guid={roadmapData.guid}
                                date={day}
                                isLastDay={index === days.length - 1}
                            />
                        );
                    })}
                </>}

                {/* adiciona a lista de tarefas */}
                {roadmapData.issues && roadmapData.issues.map((issue) => {
                    return (
                        <Task
                            key={issue.keyJira}
                            assignee={issue.assignee}
                            summary={issue.summary}
                            endDate={issue.endDate}
                            startDate={issue.startDate}
                            icoUrl={issue.icoUrl}
                            issueUrl={issue.issueUrl}
                            issueType={issue.issueType}
                            keyJira={issue.keyJira}
                            status={issue.status}
                            left={issue.left}
                            top={issue.top}
                            width={issue.width}
                            cssClass={issue.css}
                            AxisLimitX={getAxisLimitX()}
                            level={roadmapData.level === undefined ? 2 : roadmapData.level}
                            handleRemoveTask={handleRemoveTask}
                            handleUpdateTask={handleUpdateTask}
                        />
                    );
                })}
            </div>
        </div>
    );
}