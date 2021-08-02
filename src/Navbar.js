import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = ({ setToken, token }) => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    let history = useHistory();

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const logOut = () => {
        setToken({ token: undefined });
        history.push('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarBA" aria-controls="navbarBA" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarBA">
                    <ul className="navbar-nav ms-3 me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        {token === 'medico' ? (
                            <li className="nav-item">
                                <Link className="nav-link" to="/medico/diagnosticar">Diagnosticar</Link>
                            </li>
                        ) : null}
                    </ul>
                    <span className="navbar-nav ms-3 me-3 nav-item">
                        <a className="nav-link" href="/" onClick={logOut}>Cerrar Sesión</a>
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;