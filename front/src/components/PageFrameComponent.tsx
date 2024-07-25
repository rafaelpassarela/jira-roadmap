import React from "react";
import { Container, Row } from "react-bootstrap";

interface PageFrameProps {
    pageHeader?: string;
    expanded?: boolean;
    children: React.ReactNode;
}

export default function PageFrame(props: PageFrameProps) {

    const getExpandedTag = () => {
        // replace width: 730px !important; with width: 90% !important;
        return props.expanded ? {
            minWidth:'90%'
        } : undefined;
    }

    return (
        <Container className="page-main">
            {props.pageHeader === undefined
            ? null
            :
                <Row>
                    <div className="page-header">
                        <h1 className="blink">{props.pageHeader}</h1>
                    </div>
                </Row>
            }

            <Row className="page-content-outer">
                <div className="page-content-inner line-border" style={getExpandedTag()}>
                    {props.children}
                </div>
            </Row>
        </Container>
    )
}