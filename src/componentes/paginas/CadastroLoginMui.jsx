import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
// import '../estilos/CadastroLogin.css'
import api from '../../servicos/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
function CadLoginMui(){

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
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            '& > :not(style)': {
            m: 1,
            width: 620,
            height: 480,
            marginTop: '10%'
            },
        }}
    >

        <Paper >            
            <h3 style={{textAlign:'center', marginTop:'12px'}}>Cadastro de Login</h3>            
            <div className="container">
                        <div className="form-group col-8 mb-3">
                            <label for="nome" >Nome</label>
                            <input type="text" name="nome" className="form-control" id="nome" onChange={handleChange}/>
                        </div>

                    <div className="form-group col-8 mb-3">
                            <label for="apelido" className="form-label">Apelido</label>
                            <input type="text" name="apelido" className="form-control" id="apelido" onChange={handleChange}/>
                    </div>


                    <div className="form-group col-8 mb-3">
                            <label for="senha" className="form-label">Senha</label>
                            <input type="text" name="senha" className="form-control" id="senha" onChange={handleChange}/>
                        </div>

                    <div className="row">
                        <div className="col">
                            <button style={{float: 'right'}} type="button" className="btn btn-secondary" onClick={()=> usuarioPost()}>Cadastrar</button>
                        </div>
                    </div>
            </div>
            </Paper>
        </Box>
    );    
}

export default CadLoginMui;
