import React, { Component, useState, useEffect} from 'react';
import '../estilos/Perfil.css'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

function Perfil(props){    
    const history = useHistory();  

    const getUserUrl ="http://45.191.187.35:3033/getusuario/";
    const userUrl ="http://45.191.187.35:3033/selusuario/";
    const baseUrl ="http://localhost:3033/userPostaFt";
    const baseUrlExterno ="http://45.191.187.35:3033/postaFt";

    const [imageUrl, setImageUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    var [usuarioData, setUsuarioData] = useState(null);
    
    useEffect(() => {   
        imagemGet();     
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
        if (usuarioData && (imageUrl == null)) {
            //console.log("esperou e carregou dados")
            setImageUrl('data:image/jpeg;base64,' + usuarioData.fotoPerfil)
        }
        
      }, [!usuarioData, selectedImage]);
    

    // codigo para postar foto inicio
    function postarFoto () {
        if (!selectedImage) {
            return
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        axios.post(baseUrlExterno, formData,
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            })
            .then(res => {
                    alert("Imagem salva com sucesso.")
            })
    };
    // fim postar foto    
    
    const imagemGet = async()=>{        
        if(!imageUrl && (localStorage.getItem('tokens') != null)){            
            await axios.get(userUrl, 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(response => {                          
            //console.log(response.data);
            if (response.data.login != null){
                console.log('existia usuario '+response.data);
                setUsuarioData(response.data);            
            }else{
                alert("Não existe usuário cadastrado para este login.")
                history.push({ pathname: '/EditarPerfil' })
            }
            
            }).catch(error=> {
            console.log(error);
            })
        }
    }

    return(
        <div className='perfil'>
            <div className="cabecalho">
                <h1>Perfil usuário </h1>
            </div>

            <div className="container">  
                <div className="row">
                    <div className="col-6">
                        <h2>Nome Completo: {usuarioData? usuarioData.nomeCompleto : null}  </h2>
                    </div>
                    <div className="col">                        
                        <h2>Apelido: {usuarioData? usuarioData.login.nomelogin : null} </h2>
                    </div>
                    
                    <div className="col">
                        <div className="foto">                            
                            {usuarioData? <img style={{ width: "95%", height: "85%", margin: "10px 5px" }} src={imageUrl} /> : null}
                        </div>
                    </div>
                </div>                       
              
                <div className="informacoes">
                <div className="row">
                        <div className="col">
                            <h2>Descrição: {usuarioData? usuarioData.descricao : null} </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h2>Bio: {usuarioData? usuarioData.bio : null} </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Observações: {usuarioData? usuarioData.observacao : null} </h2>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: 'none' }}
                            onChange={e => setSelectedImage(e.target.files[0])}
                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" size='small' color="secondary" component="span">
                                Buscar foto
                            </Button>
                        </label>
                        </div>
                        <div className="col">
                        <button onClick={postarFoto} >
                            Postar foto
                        </button>
                    </div>
                </div>
                <div className="row">
                    <section className="link">
                    <NavLink to="/" activeClassName="active">
                            Voltar
                    </NavLink>
                    </section>
                </div>
            </div>
        </div>
    );    
}


export default Perfil;
