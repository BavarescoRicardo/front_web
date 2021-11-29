import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import './estilos/CadastroLogin.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
function CadLogin(){

    const baseUrl ="https://localhost:44390/api/Usuario";
    const history = useHistory();

    const [data, setData]=useState([]);

    const [usuariolog, setUsuariolog]=useState(
    {
        id: '',
        nome: '',
        senha: '',
        ApelidoLogin: '',
        permissao: ''
    });

    const handleChange = e=> 
    {
        // Montar objeto usuario
        const {name, value}=e.target;
        setUsuariolog(
        {
            ...usuariolog,
            [name]: value
    });
    }   
    
    const usuarioPost = async()=>{
        delete usuariolog.id;
        await axios.post(baseUrl, usuariolog)
        .then(response => {
          setData(response.data);
          history.push('/Perfil');
        }).catch(error=> {
          console.log(error);
        })
      }    
    
    return(        
        <div className="cadstrolog">            
            <div className="menucad">
                <h1>Cadastro</h1>
                <h2>Login</h2>
            </div>
            <div className="formulario">
                <div className="card">   
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <label>Acesso</label>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <input type="radio" name="permissao" value="0" onChange={handleChange}/>Adm
                                    <input type="radio" name="permissao" value="1" onChange={handleChange}/>User
                                </div>
                        </div>
                    </div>                                          
                </div>
                <div className="camposcad">
                    <div className="row">
                        <div className="col">
                            <label>Nome</label>
                            <input type="text" name="nome" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Apelido</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <input type="text" name="ApelidoLogin" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <label>Senha</label>
                            <input type="password" name="senha" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button style={{float: 'right'}} type="button" className="btn btn-secondary" onClick={()=> usuarioPost()}>Cadastrar</button>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>
    );    
}

export default CadLogin;