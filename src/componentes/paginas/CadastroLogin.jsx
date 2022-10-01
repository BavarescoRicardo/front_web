import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import '../estilos/CadastroLogin.css'
import api from '../../servicos/api'
import 'bootstrap/dist/css/bootstrap.min.css';
function CadLogin(){

    const baseUrl ="https://tcc-spring-back-end.herokuapp.com/salvaloginapi";
    const baseUrlExterno ="https://tcc-spring-back-end.herokuapp.com/salvaloginapi";
    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/salvaloginapi";
    const history = useHistory();

    // const [data, setData]=useState([]);

    const [usuariolog, setUsuariolog]=useState(
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
    
    const usuarioPost = async()=>{        
        delete usuariolog.id;

        try {
            await api.post(baseUrlExterno, usuariolog)            
            .then(async response => {
              // setData(response.data);
              if(response.data){
                history.push('/');
              }else{
                console.log("error ao fazer login");    
              }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
      }    
    
    return(   
    <div className='cad-login' style={{marginTop: '1%', paddingBottom: '10%'}}>
        <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: '10%'}}>
            <div className="card-body">
            <h5 className="card-title">Cadastro de Login</h5>
                        <div className="form-group col-10 mb-3">
                            <label for="nome" >Nome</label>
                            <input type="text" name="nome" className="form-control" id="nome" onChange={handleChange}/>
                        </div>

                    <div className="form-group col-10 mb-3">
                            <label for="nomelogin" className="form-label">Apelido</label>
                            <input type="text" name="nomelogin" className="form-control" id="nomelogin" onChange={handleChange}/>
                    </div>


                    <div className="form-group col-10 mb-3">
                            <label for="senhalogin" className="form-label">Senha</label>
                            <input type="text" name="senhalogin" className="form-control" id="senhalogin" onChange={handleChange}/>
                        </div>

                    <div className="row">
                        <div className="col">
                            <button style={{float: 'right', marginRight: '2%'}} type="button" className="btn btn-secondary" onClick={()=> usuarioPost()}>Cadastrar</button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    );    
}

export default CadLogin;
