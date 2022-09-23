import React, { useState, useEffect} from 'react';
import Login from './paginas/Login';
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
import axios from 'axios';

const Navegacao = () => {

    const userUrl ="http://45.191.187.35:3033/selusuario/";
    const userUrlHeroku ="https://api-conclusao-backend.herokuapp.com/selusuario";
    const [permissao, setPermissao] = useState(false);

    const verificarPermissao = async()=>{  
        console.log("Verificando a permissão para o usuario ") 
        if(localStorage.getItem('tokens') != null){  
            await axios.get(userUrlHeroku, 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(response => {                                   
                if (response.data.login != null){
                    setPermissao((response.data.login.roles.find(({ name }) => name === 'ROLE_ADMIN')));
                }else {
                    setPermissao(false);
                }          
            }).catch(error=> {
                console.log(error);
            })
        }
    }

    useEffect(() => {   
        verificarPermissao();        
      }, []);

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
                                <Link to="/Perfil" className="nav-link">Perfil</Link>
                            </li>
                            <li>
                                <Link to="/Login" className="nav-link">Login</Link>
                            </li>
                            <li>                               
                                {permissao  
                                    ? <Link to="/PainelMestre" className="nav-link">Gerenciamento</Link>
                                    : <h1> </h1>
                                } 
                            </li>                            
                        </div>
                    </ul>
                </div>
            </nav>

            <Switch>
                <Route exact path="/"> <NovoArtigo/>                                         </Route>
                <Route path="/Login"> <Login/>                                          </Route>
                <Route path="/NovoArtigo"> <NovoArtigo/>                                </Route>
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
