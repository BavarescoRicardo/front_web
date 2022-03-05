import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './estilos/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logarimg from '../assets/noun_portal.png';
import { Link } from 'react-router-dom'
import api from '../servicos/api'
//import axios from 'axios';

const Login = props => {

    const Url ="/fazerlogin";    
    const history = useHistory();
    var respft = false;
    

    var [usuariolog, setUsuariolog]=useState(
        {
            id: 0,
            nome: '',
            nomelogin: '',
            senhalogin: '',
            permit: 0
        }
    );
    

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
    
    async function usuarioPost(event) {
        delete usuariolog.id;

        try {
            await api.post('http://10.0.0.172:3055/fazerloginapi', usuariolog)
            .then(async response => {
              // setData(response.data);
              if(response.data){
                // history.push('/');
                history.push({ pathname: '/Perfil',  usuario: usuariolog })
              }else{
                console.log("error ao salvar");    
              }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
      }  
    return(        
    <div className="login">
        <div className="imagemlogin img-fluid">
            <img src={logarimg} alt="Login" />
        </div>

        <div className="camposlogin form-group"> 
            <input type="text" placeholder="Login" name="nomelogin" onChange={handleChange}></input>                
            <input type="password" placeholder="Senha" name="senhalogin" onChange={handleChange} />
        </div>
        <div className="btnconfirma">
            <button class="button" class="btn btn-secondary btn-sm" type="submit" onClick={usuarioPost}>Logar</button>
        </div>
        <div className="btncadastrp">
            <Link to="/CadLogin" class="btn btn-info" >Cadastrar login</Link>
        </div>
    </div>
    );    
    
}


export default Login;