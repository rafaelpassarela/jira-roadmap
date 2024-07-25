import React, { useCallback, useEffect, useRef, useState } from 'react';
import './css/TaskComponent.css';
import { CloseButton, Col, Container, Row } from 'react-bootstrap';

interface ITaskComponentProps {
    keyJira: string;
    summary: string;
    status: string;
    assignee?: string | undefined;
    startDate: string;
    endDate: string;
    issueType: string;
    icoUrl: string; // https://domain.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium
    issueUrl: string; // https://domain.atlassian.net/browse/CAR-73
    top: number;
    left: number;
    width: number;
    cssClass: string;
    AxisLimitX?: number;
    level: number;
    handleRemoveTask: (keyJira: string) => void;
    handleUpdateTask: (keyJira: string, top: number, left: number, width: number) => void;
}

export default function Task(props: ITaskComponentProps) {

    const [position, setPosition] = useState({ x: props.left, y: props.top });
    const [width, setWidth] = useState(props.width);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const divRef = useRef<HTMLDivElement>(null);
    const issueKeyDiv = useRef<HTMLAnchorElement | null>(null);
    const headerHeight: number = parseInt(document.documentElement.style.getPropertyValue('--roadmap-title-height').replace('px', '')) + 30;

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // console.log('MOUSE DOWN');
        if (props.level >= 2 || e.target === divRef.current?.querySelector('.task-close-button')) {
            // console.log('CLOSE BUTTON');
            return;
        }

        if (e.target === divRef.current?.querySelector('.task-resize-handle')) {
            setIsResizing(true);
        } else {
            setIsDragging(true);
            const rect = divRef.current!.getBoundingClientRect();
            setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
        if (divRef.current) {
            divRef.current.classList.add('grabbing');
        }
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);

        if (divRef.current) {
            divRef.current.classList.remove('grabbing');

            // console.info('Atualizar banco com a nova pos da tarefa: ', 'X', position.x, 'Y', position.y, 'W', width);
            props.handleUpdateTask(props.keyJira, position.y, position.x, width);
        }
    }, [position, width, props]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
    //const handleMouseMove = (e: MouseEvent) => {
        if (!divRef.current) return;

        const offSet = 75; // divRef.current.offsetHeight;
        if (isDragging) {
            // Obter a rolagem da página
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;

            // Obter o retângulo delimitador da janela do navegador
            const windowWidth = props.AxisLimitX ?? window.innerWidth; // window.innerWidth;
            const windowHeight = window.innerHeight;

            // Calcular a nova posição dentro dos limites da janela do navegador
            //   const rawX = Math.max(0, Math.min(e.clientX + scrollX - dragOffset.x, windowWidth + scrollX - divRef.current.offsetWidth));
            const rawX = Math.max(0, Math.min(e.clientX + scrollX - dragOffset.x, windowWidth + scrollX));
            let newX = (Math.trunc(rawX / offSet) * offSet) + 10; // Quantizar para o múltiplo de 75 pixels mais próximo
            if (props.AxisLimitX && newX > props.AxisLimitX) {
                newX = props.AxisLimitX;
            }
            newX = Math.max(10, newX);

            const rawY = Math.max(0, Math.min(e.clientY + scrollY - dragOffset.y, windowHeight + scrollY - divRef.current.offsetHeight));
            const newY = Math.round(Math.max(headerHeight + offSet, rawY) / 5) * 5; // Mantemos o movimento vertical suave

            setPosition({ x: newX, y: newY });
        } else if (isResizing) {
            const rawWidth = Math.max(offSet, e.clientX - divRef.current.getBoundingClientRect().left); // min width = 75px
            const newWidth = (Math.round(rawWidth / offSet) * offSet) - 5; // Quantize to the nearest 75 pixels
            setWidth(newWidth);
        }
    }, [isDragging, isResizing, dragOffset, headerHeight, props.AxisLimitX]);

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        if (issueKeyDiv.current && !isDragging) {
            // const maxWidth = issueKeyDiv.current.clientWidth - 5;
            const maxWidth = issueKeyDiv.current.parentElement!.clientWidth - 24;
            let fontSize = 100; // Initial font size, adjust as needed
            issueKeyDiv.current.style.fontSize = (fontSize / 100) + 'em';
            while (issueKeyDiv.current.scrollWidth > maxWidth && fontSize > 50) { // Minimum font size limit
                fontSize = fontSize - 5;
                issueKeyDiv.current.style.fontSize = (fontSize / 100) + 'em';
            }
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

    const getTaskStyle = () => {
        // console.log(headerHeight, '| x: ', position.x, ' | y: ', position.y);

        return {
            top: position.y,
            left: position.x,
            width: width
        }
    }

    return (
        <div style={getTaskStyle()} className={"task-container no-select task-status-" + props.cssClass} ref={divRef} onMouseDown={handleMouseDown}>
            <div className="task-description no-warp-text" title={props.summary}>
                {props.summary}
            </div>
            <Container className="task-font-small">
                <Row style={{ gap: 2 }}>
                    <Col className="mx-0 px-0">
                        <div className="task-type-box">
                            <img className='task-type-img' src={props.icoUrl} alt={props.issueType} title={props.issueType} />
                            <a href={props.issueUrl} target="_blank" rel="noreferrer" ref={issueKeyDiv}>
                                {props.keyJira}
                            </a>
                        </div>
                    </Col>
                    <Col className="mx-0 px-0 no-warp-text">
                        <div className="task-type-box" title={props.status}>
                            {props.status}
                        </div>
                    </Col>
                    <Col className="mx-0 px-0">
                        <div className="task-type-box no-warp-text">
                            {props.assignee}
                        </div>
                    </Col>
                </Row>
            </Container>
            {props.level < 2 ?
                <CloseButton
                    className="task-close-button"
                    aria-label="Remover Tarefa"
                    title="Remover Tarefa"
                    onClick={() => props.handleRemoveTask(props.keyJira)}
                />
            : null}
            <div className="task-resize-handle" />
        </div>
    );

}
