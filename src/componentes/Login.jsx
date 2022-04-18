import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './estilos/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logarimg from '../assets/noun_portal.png';
import { Link } from 'react-router-dom'
import api from '../servicos/api'
//import axios from 'axios';

const Login = props => {    

    var [usuariolog, setUsuariolog]=useState(
        {
            username: '',
            password: ''
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
        const formData = new FormData();
        formData.append('username', usuariolog.username);
        formData.append('password', usuariolog.password);

        try {
            await api.post('http://localhost:3055/blog/login', usuariolog)
            .then(async response => {
                console.log(response.data)

            //   if(response.data){
            //     console.log(response.data)
            //     localStorage.setItem('access_token', response.data)
            //     history.push({ pathname: '/Perfil',  usuario: usuariolog })
            //     console.log('salvo dados  ' + localStorage.getItem('access_token'))
            //   }else{
            //     console.log("error ao fazer login");    
            //   }
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
            <input type="text" placeholder="Login" name="username" onChange={handleChange}></input>                
            <input type="password" placeholder="Senha" name="password" onChange={handleChange} />
        </div>
        <div className="btnconfirma">
            <button className="btn btn-secondary btn-sm" type="submit" onClick={usuarioPost}>Logar</button>
        </div>
        <div className="btncadastrp">
            <Link to="/CadLogin" className="btn btn-info" >Cadastrar login</Link>
        </div>
    </div>
    );    
    
}


export default Login;