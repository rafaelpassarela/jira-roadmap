import { Nav, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

export default function AppNavBar() {

    const authContext = useAuthContext();

    function getUserMenu() {
        if (authContext.userLogged) {
            const user = authContext.user;
            return (
                <div>
                <NavDropdown title={
                    <span>
                        <img className="login-avatar"
                            src={user.avatarUrl}
                            alt="user pic"
                            width="30"
                            height="30"
                        /> {user.nome}
                    </span>} id="collapsible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/user/config">Token Jira</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/project/config">Projetos</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={() => authContext.signOutUser()}>Sair</NavDropdown.Item>
                </NavDropdown>
                </div>
            );
        }

        return (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img alt="Jira Roadmap" src="/favicon.png" width="30" height="30" className="d-inline-block align-top"/>{' '}
                    Jira Roadmap
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    { authContext.userLogged ? (
                        <Nav.Link as={Link} to="/dash">Meus Cronogramas</Nav.Link>
                    ) : null }
                    </Nav>
                    <Nav>
                        {getUserMenu()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}