import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SelecaoArtigo from './SelecaoArtigo';

function PainelMestre(){

    const history = useHistory();

    const baseUrlListagem ="http://localhost:3033/loginsapi";
    const baseUrlExternoListagem ="http://45.191.187.35:3033/loginsapi";
    const [data, setData]=useState([]);    
    
    const [permissao, setPermissao]=useState(
        {
          username: 'jos',
          roleName: 'ROLE_ADMIN'
        }
    ); 

    async function adicionarolePost(nomerol, admin) {        
        try {
            // Dine para qual usuario vai dar a permissão
            permissao.username = nomerol

            await axios.post(admin ? 
                'http://45.191.187.35:3033/adicionaroleapi' : 
                'http://45.191.187.35:3033/removerroleapi', permissao, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
                if(response.data){
                // history.push('/PainelMestre');
                }else{
                    console.log("error ao publicar");    
                }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
      }   


    const artigoGet = async()=>{
        if (localStorage.getItem('tokens') == null ) {
            alert("Usuário não possui permissões de administrador.")
            history.push({ pathname: '/' })
        } else {
            await axios.get(baseUrlExternoListagem, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(response => {
            setData(response.data);
            }).catch(error=> {
            console.log(error);
            })
        }
    }

    useEffect(()=>{
        artigoGet()
        console.log('Interval triggered');
    }, 1000);      

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1> Lista de Logins e suas Permissões </h1>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>Código</th> <th>Nome</th> <th>Permissão</th> <th>Alterar</th> <th>Alterar</th> <th>Participa do artigos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(login=> (
                                <tr key={login.id}>
                                <td> {login.id }</td>
                                <td> {login.username }</td>
                                <td> {login.roles.length}</td>
                                <td><button onClick={()=> adicionarolePost(login.username, 1)} className="btn btn"> Promover: {login.id} </button></td>
                                <td><button onClick={()=> adicionarolePost(login.username, 0)} className="btn btn"> Rebaixar: {login.id} </button></td>
                                <td>
                                    <SelecaoArtigo/>
                                    {/* <select name="artigosel" id="artigosel">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select> */}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="div">
                    {/* <button className="btn btn-danger" onClick={postarNovo}> Publicar novo </button> */}
                    <Link to="/Publicar" className="btn btn-info" >Publicar novo</Link>
                </div>

            </div>

        </div>
    );    
}

export default PainelMestre;
