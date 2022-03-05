import React from 'react'
import Produto from './Produto';
import Login from './Login';
import Artigo from './Artigo';
import Perfil from './Perfil';
import CadastroLogin from './CadastroLogin'
import EditarPerfil from './EditarPerfil'
import './estilos/Navegacao.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Navegacao = () => {
    return (
        <Router>
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div  className="container">
                    <ul className="navbar-nav">
                        <div className="navbar-nav">
                            <li>
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li>
                                {/* <Link to="/Esp" className="nav-link">Esp32</Link> */}
                                <Link to="/Artigo" className="nav-link">Publicações</Link>
                            </li>
                            <li>
                                <Link to="/Perfil" className="nav-link">Perfil</Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>

            <Switch>
                <Route exact path="/"> <Login/>            </Route>
                <Route path="/Produto"> <Produto/>         </Route>
                <Route path="/Login"> <Login/>             </Route>
                <Route path="/Artigo"> <Artigo/>               </Route>
                <Route path="/Perfil"> <Perfil/>               </Route>
                <Route path="/CadLogin"> <CadastroLogin/>  </Route>
                <Route path="/EditarPerfil" component={EditarPerfil} /> 
            </Switch>
        </div>
        </Router>
    )
}

export default Navegacao
