import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SelecaoArtigo from './SelecaoArtigo';
import ParticipanteArtigo from './ParticipanteArtigo';

function PainelMestre(){

    const history = useHistory();

    const baseUrlListagem ="http://localhost:3033/loginsapi";
    const baseUrlExternoListagem ="https://tcc-spring-back-end.herokuapp.com/loginsapi";
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
                'https://tcc-spring-back-end.herokuapp.com/adicionaroleapi' : 
                'https://tcc-spring-back-end.herokuapp.com/removerroleapi', permissao, 
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

    async function removerLogin(idUser) {        
        try {
            const formDataUser = new FormData();
            formDataUser.append('idUser', idUser);
            await axios.post( 
                'https://tcc-spring-back-end.herokuapp.com/removerloginapi', formDataUser, 
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
            { 
                headers: {          
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
                            <th>Participa dos artigos</th> <th>Código</th> <th>Nome</th> <th>Alterar</th> <th>Alterar</th> <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(login=> (                                
                                <tr key={login.id}>
                                <td>
                                    <ParticipanteArtigo idUsuario={login.id}/>
                                </td>
                                <td> {login.id}</td>
                                <td> {login.username} </td>
                                <td> {login.roles.length}</td>
                                <td>
                                    <button onClick={()=> adicionarolePost(login.username, 1)} className="btn btn"> Promover: {login.id} </button>
                                </td>
                                <td>
                                    <button onClick={()=> adicionarolePost(login.username, 0)} className="btn btn"> Rebaixar: {login.id} </button>
                                    <button onClick={()=> removerLogin(login.id)} className="btn btn-link link-danger text-decoration-none"> Remover: {login.id} </button>
                                </td>
                                <td>
                                    <SelecaoArtigo cod={login.id}/>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );    
}

export default PainelMestre;
