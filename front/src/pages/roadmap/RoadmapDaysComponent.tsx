import { formatDate } from "../../helpers/DateHelper";
import "./Roadmap.css";

interface IRoadmapDaysProps {
    guid: string;
    date: string;
    isLastDay: boolean;
}

export default function RoadmapDays(props: IRoadmapDaysProps) {

    // roadmap-days-disabled
    const getContainerClassByWeekDay = () => {

        const currentDate = new Date().toISOString().split('T')[0];
        const isCurrentDay = props.date === currentDate;

        const weekdayIndex = new Date(props.date).getDay();
        const style = 'roadmap-days-container '
                    + (weekdayIndex >= 5 ? 'roadmap-days-disabled' : '')
                    + (isCurrentDay ? ' roadmap-days-today' : '');

        return style;
    }

    return (
        <>
            <div className={getContainerClassByWeekDay()} id={'roadmapday-' + (props.isLastDay ? 'last' : 'regular')}>
                <p className="roadmap-day-header" id={'roadmapday-header-' + (props.isLastDay ? 'last' : 'regular')}>
                    {formatDate(props.date, false, true)}
                </p>
            </div>
            <div className="roadmap-column-delimiter">&nbsp;</div>
        </>
    );
}