import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import SelecaoArtigo from './SelecaoArtigo';
import ParticipanteArtigo from './ParticipanteArtigo';

function PainelMestre(){

    const history = useHistory();

    const baseUrlListagem ="http://localhost:3033/loginsapi";
    const baseUrlExternoListagem ="http://localhost:3033/loginsapi";
    const [data, setData]=useState([]);    
    const [atualizar, setAtualizar]=useState(false);    
    
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
                'http://localhost:3033/adicionaroleapi' : 
                'http://localhost:3033/removerroleapi', permissao, 
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
                alert(error)
                console.log(error);
            })            
        } catch (error) {
            alert(error)
            console.log(error);
        }
        setAtualizar(true);
    }

    async function mudarSenha(nomerol) {        
        try {
            // Define para qual usuario vai trocar a senha
            const formDataUser = new FormData();
            formDataUser.append('idLogin', nomerol);
            formDataUser.append('senhaNova', "senha");
            

            await axios.post('http://localhost:3033/mudarsenhalogin', formDataUser, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
                if(response.data){
                    alert(response.data)
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
            formDataUser.append('idLogin', idUser);
            await axios.post( 
                'http://localhost:3033/removeusuariopelologin', formDataUser, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
                if(response.data){
                }else{
                    console.log("error ao publicar");    
                }
            }).catch(async error=> {
                // Caso o servidor não posso remover um usuario manda requisicao para remover login
                formDataUser.append('idUser', idUser);
                await axios.post( 
                    'http://localhost:3033/removerloginapi', formDataUser, 
                { headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
                })                
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
        setAtualizar(false);
    }, [atualizar]);      

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
                                    <button onClick={()=> mudarSenha(login.id)} className="btn btn"> Mudar Senha: {login.id} </button>
                                </td>
                                <td>
                                    <button onClick={()=> adicionarolePost(login.username, 0)} className="btn btn"> Rebaixar: {login.id} </button>
                                    <button onClick={()=> removerLogin(login.id)} className="btn btn-link link-danger text-decoration-none"> <FaTrash /> {login.id} </button>
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
