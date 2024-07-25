import { Col, Form, Row } from "react-bootstrap";
import { useQueryStringContext } from "../../contexts/QueryStringContext";
import { useEffect, useState } from "react";

interface IDashPageFilterProps {
    handleChange: () => void;
}

export default function DashPageFilter(props: IDashPageFilterProps) {

    const queryContext = useQueryStringContext();
    const [active, setActive] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setActive(queryContext.getQueryState().active);
    }, [queryContext]);

    const handleChange = () => {
        props.handleChange();
        queryContext.navegateTo({ ...queryContext.getQueryState(), active: !active });
    }

    return (
        <div className="dash-filter-size">
            <Row>
                <Col md={6}>
                    <h3>
                    Cronogramas {active ? 'ativos' : 'inativos'}
                    </h3>
                </Col>
                <Col className="dash-filter-align" md={6}>
                    <div className="dash-button-back dash-filter-margin">
                        <Form.Check type='switch' id='active-filter' checked={active === undefined ? true : active} onChange={handleChange}/>
                    </div>
                </Col>
            </Row>
        </div>
    );
}