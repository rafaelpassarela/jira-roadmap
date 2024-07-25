import { RoadmapModelSharesInner } from "roadmap-client-api";

export interface IRoadmapModel {
    guid: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    active: boolean;
    shares: Array<RoadmapModelSharesInner>;
}
