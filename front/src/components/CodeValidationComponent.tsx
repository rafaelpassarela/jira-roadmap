import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { ApiException, CodeLoginParam, ErrorModel, TokenResult } from "roadmap-client-api";
import Api from "../helpers/Api";
import CountdownTimer from "./CountdownTimerComponent";
import { useAuthContext } from "../contexts/AuthContext";

type CodeValidationProps = {
    userEmail: string;
}

type CodeValidationStates = {
    isLoading: boolean;
    codeSent: boolean;
    errorMessage: string;
    timerEnded: boolean;
}

type updateValueCallback = (codeSent: boolean, isLoading: boolean, errorMessage: string) => void;

function apiGenerateCode(userEmail: string, updateCallback: updateValueCallback) {
    updateCallback(false, true, '');
    Api.User().sendCode({email: userEmail}).then(() => {
        console.log('Code Ok');
        updateCallback(true, false, '');
    }).catch((reason: ApiException<ErrorModel>) => {
        let errMsg = Api.getErrorMessage(reason);
        console.log(errMsg);
        updateCallback(false, false, errMsg);
    });
}

export default function CodeValidation(props: CodeValidationProps) {

    const [states, setStates] = useState<CodeValidationStates>({
        isLoading: false,
        codeSent: false,
        errorMessage: '',
        timerEnded: false,
    });

    const authContext = useAuthContext();

    let validationCode: string = 'abc';

    const updateCallback = useCallback<updateValueCallback>((codeSent, isLoading, errorMessage) => {
        setStates(prevState => ({
            ...prevState,
            codeSent,
            timerEnded: codeSent,
            isLoading,
            errorMessage,
        }));
    }, []);

    useEffect(() => {
        let runEffect: boolean = true;
        if (runEffect) {
            apiGenerateCode(props.userEmail, updateCallback);
        }
    }, [props.userEmail, updateCallback]);

    function handleSubmit(event: any) {
        setStates({
            ...states,
            isLoading: true,
            errorMessage: ''
        });
        const params: CodeLoginParam = {
            code: validationCode,
            email: props.userEmail
        };

        Api.Auth().codeLogin(params).then((value: TokenResult) => {
            const hasTokenJira: boolean = (!value.user.hasJiraToken ? false : value.user.hasJiraToken);
            authContext.signInUser({
                avatarUrl: value.user.avatarUrl,
                email: value.user.email,
                guid: value.user.guid,
                nome: value.user.name,
                jiraToken: value.user.tokenJira,
                hasTokenJira: hasTokenJira,
            }, {
                accessToken: value.accessToken,
                expiration: value.expiration
            });
            // navigate('/');
            window.location.href = (hasTokenJira ? '/dash' : '/user/config');
            setStates({
                ...states,
                isLoading: false,
                errorMessage: ''
            });
        }).catch((reason: ApiException<ErrorModel>) => {
            let err = Api.getErrorMessage(reason);
            console.warn(err);

            setStates({
                ...states,
                isLoading: false,
                errorMessage: err
            });
        });
    };

    function retryCodeGeneration() {
        console.log('call Retry Code');
        setStates({
            ...states,
            codeSent: false,
            timerEnded: false,
            errorMessage: ''
        });

        apiGenerateCode(props.userEmail, updateCallback);
    }

    function handleCodeChange(event: ChangeEvent<HTMLInputElement>) { //FormEvent<HTMLInputElement>
        validationCode = event.target.value;

    }

    function endTimerCallback() {
        console.log('Callback end timer')
        if (states.timerEnded) {
            setStates({
                ...states,
                timerEnded: false
            });
        }
    }

    function getCodeForm() {
        let err = <div className="login-error-simple">{states.errorMessage}</div>;

        let footerElemen = (states.timerEnded) ? (
            <div>
                <CountdownTimer initialTime={60} onEndtimerCallback={endTimerCallback} />
                {err}
            </div>
        ) : (
            <div className="login-mens-code">
                Não recebeu o código, clique
                <Button variant="link" size="sm" id="input-code" onClick={retryCodeGeneration}>
                    aqui
                </Button>
                para tentar novamente.
                {err}
            </div>
        );

        return (
            <div>
                <div className="login-mens-code">
                    Você recebeu um código de seis dígitos no seu e-mail. <br/>
                    Por favor, insira-o no campo abaixo.
                </div>

                <div className="login-waiting-center ">
                    <InputGroup className="mb-2">
                        <Form.Control
                            placeholder="Digite o código de 6 dígitos"
                            aria-label="Digite o código de 6 dígitos"
                            aria-describedby="input-code"
                            onChange={handleCodeChange}
                            maxLength={6}
                        />
                        <Button variant="primary" id="input-code" disabled={states.isLoading} onClick={handleSubmit}>
                            Entrar
                        </Button>
                    </InputGroup>
                    {footerElemen}
                </div>
            </div>
        );
    }

    function getCurrentView() {
        if (states.codeSent) {
            return getCodeForm();
        }

        if (states.errorMessage !== '') {
            return (
                <div className='login-code-error'>
                    <Alert variant='danger'>
                        Não foi possível gerar o código de autenticação neste momento. <br/>
                        {states.errorMessage} <br/>
                        <Button variant="light" id="input-code" disabled={states.isLoading} onClick={retryCodeGeneration}>
                            Tentar Novamente
                        </Button>
                    </Alert>
                </div>
            )
        }

        return (
            <div className="login-waiting-center login-padding login-font-14">
                Gerando código de autenticação... <br/><br/>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return (
        getCurrentView()
    )
}