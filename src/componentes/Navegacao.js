import React from 'react'
import Login from './paginas/Login';
import Artigo from './paginas/Artigo';
import NovoArtigo from './paginas/NovoArtigo';
import PainelMestre from './paginas/PainelMestre';
import Publicar from './paginas/PublicarArtigo';
import Perfil from './paginas/Perfil';
import CadastroLogin from './paginas/CadastroLogin'
import EditarPerfil from './paginas/EditarPerfil'
import './estilos/Navegacao.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Detalhe from './paginas/DetalheArtigo';
import EditarDetalhe from './paginas/DetalheArtigoEditar';

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
                                <Link to="/Artigo" className="nav-link">Publicações</Link>
                            </li>
                            <li>
                                <Link to="/Perfil" className="nav-link">Perfil</Link>
                            </li>
                            <li>
                                <Link to="/Login" className="nav-link">Login</Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>

            <Switch>
                <Route exact path="/"> <NovoArtigo/>                                         </Route>
                <Route path="/Login"> <Login/>                                          </Route>
                <Route path="/NovoArtigo"> <NovoArtigo/>                                </Route>
                <Route path="/Artigo"> <Artigo/>                                        </Route>
                <Route exact path="/DetalheArtigo/:id"> <Detalhe/>                      </Route>
                <Route exact path="/DetalheArtigoEditar/:id"> <EditarDetalhe/>          </Route>
                <Route path="/Publicar"> <Publicar/>                                    </Route>
                <Route path="/Perfil"> <Perfil/>                                        </Route>
                <Route path="/CadLogin"> <CadastroLogin/>                               </Route>
                <Route path="/PainelMestre"> <PainelMestre/>                            </Route>
                <Route path="/EditarPerfil" component={EditarPerfil} /> 
            </Switch>
        </div>
        </Router>
    )
}

export default Navegacao
