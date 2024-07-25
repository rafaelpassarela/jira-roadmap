import { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { LoginBaseProps, UserInfo } from "./LoginPageComponent";
import { ApiException, ErrorModel, UserValidationParam, UserValidationResult } from "roadmap-client-api";
import Api from "../../helpers/Api";

export interface EmailValidationParam extends LoginBaseProps {
    userEmail: string;
    errorCallback: (error : string) => void;
    userInfoCallback: (newUserInfo : UserInfo) => void;
}

export default function LoginEmailValidation(props: EmailValidationParam) {

    useEffect(() => {
        let runEffect: boolean = true;

        if (runEffect) {
            runEffect = false;
            const params: UserValidationParam = {
                userName: props.userEmail
            };
            Api.User().validate(params).then((value: UserValidationResult) => {
                props.userInfoCallback({
                    userAvatar: value.avatarUrl,
                    userEmail: value.email,
                    userName: value.name
                });
                props.statusCallback('code_validation');
            }).catch((reason: ApiException<ErrorModel>) => {
                const err: string = Api.getErrorMessage(reason);
                props.errorCallback(err);
                props.statusCallback('enter_username');
            });
        }
    }, [props]);

    return (
        <div className="login-frames">
            <Container fluid="md">
                <Row>
                    <Col className="login-waiting-center">
                        Aguarde, validando usuário <b>{props.userEmail}</b>...
                    </Col>
                </Row>
                <Row>
                    <Col className="login-waiting-center login-padding">
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
