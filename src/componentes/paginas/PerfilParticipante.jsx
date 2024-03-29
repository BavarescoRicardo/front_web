import React, { useState, useEffect} from 'react';
import '../estilos/Perfil.css'
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function PerfilParticipante(props){

    const [imageUrl, setImageUrl] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    var [usuarioData, setUsuarioData] = useState(null);
    const location = useLocation();

    useEffect(() => {   
        perfilGet();     
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
        if (usuarioData && (imageUrl == null)) {
            //console.log("esperou e carregou dados")
            setImageUrl('data:image/jpeg;base64,' + usuarioData.fotoPerfil)
        }
        
      }, [!usuarioData, selectedImage]);   
    
    const perfilGet = async()=>{        
        const formData = new FormData();
        console.log("props sao:  "+props)
        console.log(location.state.idUsuario)
        // formData.append('idLogin', location.idUsuario);
        formData.append('idLogin', location.state.idUsuario);
        await axios.post("http://localhost:3033/selecionaperfil", formData)
        .then(response => {                          
        if (response.data.login != null){
            setUsuarioData(response.data);            
        }            
        }).catch(error=> {
            console.log(error);
        })        
    }

    return(
        <div className='perfil'>
            <div className="cabecalho">
                <h1>Participante</h1>
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
              
                <div className="informacoes-perfil">
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


export default PerfilParticipante;
