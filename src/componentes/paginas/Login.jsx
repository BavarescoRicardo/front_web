import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import '../estilos/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logarimg from '../../assets/academico.png';
import { Link } from 'react-router-dom'
import axios from 'axios';
import qs from 'qs';

const Login = props => {  
    const history = useHistory();  
    localStorage.clear();    

    var [usuariolog, setUsuariolog]=useState(
        {
            username: '',
            password: ''
        }
    );
    const urlex = 'https://tcc-spring-back-end.herokuapp.com/blog/login'
    const userUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/selusuario";

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

    useEffect(() => {   
        verificarLogado();        
      }, []);
    
    async function usuarioPost(event) {
        try {
            const datau = qs.stringify(usuariolog)

            await axios.post(urlex, datau)
            .then(async response => {
                if(response.data){                                        
                    localStorage.setItem('tokens', response.data.access_token)
                    verificarLogado()
                    history.push({ pathname: '/Perfil',  usuario: usuariolog })
                  }else{
                    alert("Login não encontrado.")
                    console.log("error ao fazer login");                        
                  }
            }).catch(error=> {
              console.log(error);
              alert("Login não encontrado.")
            })            
        } catch (error) {
            console.log('catch erro '+error);
            alert("Login não encontrado.")
        }
    }    

    const verificarLogado = async()=>{  
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
                props.setLogado(true);
                if (response.data.login != null){
                    props.setPermissao((response.data.login.roles.find(({ name }) => name == 'ROLE_ADMIN')));
                }else {
                    props.setPermissao(false);
                }          
            }).catch(error=> {
                console.log(error);
            })
        } else {
            props.setLogado(false)
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