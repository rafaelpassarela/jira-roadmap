import { Button } from "react-bootstrap";
import { faFileCirclePlus, faPenToSquare, faUserGroup, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IRoadmapModel } from "../../class/RoadmapModel";
import { useQueryStringContext } from "../../contexts/QueryStringContext";
import { DashParamsModel } from "roadmap-client-api";
import PageFrame from "../../components/PageFrameComponent";
import LoaderComponent from "../../components/LoaderComponent";
import Api from "../../helpers/Api";
import DashPageFilter from "./DashPageFilter";
import { formatDate } from "../../helpers/DateHelper";

export default function DashPageList() {
    const queryContext = useQueryStringContext();
    const paramActive = useRef<boolean | undefined>(queryContext.getQueryState().active);
    const [roadmapList, setRoadmapList] = useState<IRoadmapModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const filterUrl = queryContext.getNavURL();

    useEffect(() => {
        const oldParam = paramActive.current;

        paramActive.current = queryContext.getQueryState().active;
        // console.log('paramActive: Old=', oldParam, ' New=', paramActive.current);

        if (paramActive.current === undefined || oldParam === paramActive.current) {
            // console.log('EXIT');
            return;
        }
        // console.log('LOAD');

        const dashParams: DashParamsModel = {
            filter: {active: queryContext.getQueryState().active ? 1 : 0}
        };
        Api.Roadmap().getDash(dashParams).then((response) => {
            setRoadmapList(response.list as IRoadmapModel[]);
            setIsLoading(false);
        }).catch((reason) => {
            const err = Api.getErrorMessage(reason);
            // alert('Erro ao carregar os roadmaps: ' + err);
            console.error(err);
        });
    }, [roadmapList, queryContext]);

    const getItemDescription = (description: string) => {
        if (description && description.length > 30)
            return description.substring(0, 30) + '...';

        return description;
    }

    const handleFilterChange = () => {
        setIsLoading(true);
    }

    return (
        <PageFrame pageHeader="Meus Cronogramas" expanded>
            <LoaderComponent message="Aguarde... Carregando lista de cronogramas" show={isLoading}/>
            <DashPageFilter handleChange={handleFilterChange} />

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <Link to={"/dash/config/new" + filterUrl}>
                                <Button className="project-grid-btn" variant="outline-primary" size="sm" title="Novo">
                                    <FontAwesomeIcon icon={faFileCirclePlus} />
                                </Button>
                            </Link>
                        </th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Data de Início</th>
                        <th>Data de Término</th>
                    </tr>
                </thead>
                <tbody>
                    {roadmapList.map((roadmap) => (
                        <tr key={roadmap.guid} className="dash-tr-center">
                            <td>
                                <Link to={"/dash/config/" + roadmap.guid + filterUrl}>
                                    <Button className="project-grid-btn" variant="outline-primary" size="sm" title="Editar">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <Link to={"/dash/roadmap/" + roadmap.guid}>
                                    {roadmap.name}
                                </Link>
                                {roadmap.shares.length > 0 ?
                                    <FontAwesomeIcon className="dash-shared" icon={faUserGroup} title="Compartilhado" />
                                : null}
                            </td>
                            <td>{getItemDescription(roadmap.description)}</td>
                            <td>
                                {formatDate(roadmap.startDate) + ' '}
                                {new Date(roadmap.startDate) > new Date() ?
                                    <FontAwesomeIcon className="dash-warning" icon={faWarning} title="Não Iniciado" />
                                : null}
                            </td>
                            <td>
                                {formatDate(roadmap.endDate) + ' '}
                                {new Date(roadmap.endDate) < new Date() ?
                                    <FontAwesomeIcon className="dash-warning" icon={faWarning} title="Expirado" />
                                : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PageFrame>
    );
}