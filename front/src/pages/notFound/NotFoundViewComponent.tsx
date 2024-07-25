import { useState } from "react";
import { Button } from "react-bootstrap";
import './NotFoundView.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PageFrame from "../../components/PageFrameComponent";

export default function NotFoundViewComponent() {

    const maxImgs: number = 16;
    const [imgNumber, setImgNumber] = useState( getRandomInt() );

    function getRandomInt() {
        const min = 1;
        return Math.floor(Math.random() * (maxImgs - min + 1) + min);
    }

    function handleChangeImg() {
        let number: number = getRandomInt();
        setImgNumber(number);
    }

    return (
        <PageFrame pageHeader="404 - Página não encontrada">
            Ups! Ocorreu um erro
            <img src={"/img/404_" + imgNumber + ".gif"} alt="404 - Not Found" className="not-found-img" />
            <h2>O servidor indica um erro "404 não encontrado"</h2>
            Provavelmente uma página que realmente não existe.
            <div className="not-found-btn-padding">
                <Link to={"/"}>
                    <Button variant="secondary">
                        <FontAwesomeIcon icon={faHouse} />
                        Home
                    </Button>
                </Link>{' '}
                <Button variant="secondary" onClick={handleChangeImg}>
                    <FontAwesomeIcon icon={faShuffle} />{' '}
                    Próxima Imagem ({imgNumber} / {maxImgs})
                </Button>
            </div>
        </PageFrame>
    )
}