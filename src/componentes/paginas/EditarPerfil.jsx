import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../estilos/EditarPerfil.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../servicos/api'
import Button from '@material-ui/core/Button';

import Resizer from "react-image-file-resizer";

function Perfil(){
    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/salvausuario";
    const baseUrlHerokuft ="https://tcc-spring-back-end.herokuapp.com/postaFt";

    const [selectedImage, setSelectedImage] = useState(null); 
    const history = useHistory();
    const [imageUrl, setImageUrl] = useState(null);

    const formData = new FormData();
    
    // Modelo do usuario a ser salvo
    const [usuariolog, setUsuariolog]=useState(
        {
          codigo: 0,
          nomeCompleto: '',
          bio: '',
          curso: '',
          descricao: '',
          observacao: '',
          grau: ''
        }
    );
    useEffect(async () => {
        selecionaUsuario();

        if (usuariolog && (imageUrl == null)) {
            console.log('definindo imagem')
            setImageUrl('data:image/jpeg;base64,' + usuariolog.fotoPerfil)
        }
      }, [selectedImage]);


      const selecionaUsuario = async()=>{        
        if(!imageUrl && (localStorage.getItem('tokens') != null)){            
            await api.get("https://tcc-spring-back-end.herokuapp.com/selusuario", 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(async response => {                          
            // Definindo usuario e foto 
            if (response.data.login != null){
                setUsuariolog(response.data)
                setImageUrl('data:image/jpeg;base64,' + response.data.fotoPerfil)
            }            
            }).catch(error=> {
                console.log(error);
            })
        }
    }       

    
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

        // codigo para postar foto inicio
        function postarFoto () {
            if (!selectedImage) {
                return
            }

            const formData = new FormData();
            formData.append("image", selectedImage);

            api.post(baseUrlHerokuft, formData,
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
    
    async function usuarioEdita(){                

        try {
            await api.post(baseUrlHeroku, usuariolog, 
                { headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
                })        
            .then(async response => {
              if(response.data){
                postarFoto();
                history.push('/');
              }else{
                console.log("error ao cadastrar usuario");    
              }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
    }
 


    const resizeFile = (file) =>
        new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            600,
            "JPEG",
            80,
            0,
            (uri) => {
            resolve(uri);
            },
            "base64"
        );
        });

    const dataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
        splitDataURI[0].indexOf("base64") >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        return new Blob([ia], { type: mimeString });
    };

    async function onChange(event) {
        const file = event.target.files[0];
        const image = await resizeFile(file);
        console.log(image);
        
        setImageUrl(image);
        setSelectedImage(dataURIToBlob(image));

    };


    return(
        <div className='editar-perfil'>
            <div className="cabecalho-perfil">
                <h1>Perfil usuário </h1>
            </div>
            <div className="foto-perfil">
                {(selectedImage ||usuariolog.fotoPerfil)? <img style={{ width: "90%", height: "85%", margin: "10px"}} src={imageUrl} /> : null}
            </div>                   
            <div>
                <div className="informacoes-perfil-editar">
                    <div className="row">
                        <div className="col">
                            <h2>Nome: </h2>
                            <input type="text" name="nomeCompleto" value={usuariolog.nomeCompleto} onChange={handleChange} />
                        </div>
                    </div>                    
                        <div className="row">
                            <div className="col">
                                <h2>Bio:  </h2>
                                <input type="text" name="bio" value={usuariolog.bio} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Descrição:  </h2>
                                <input type="text" name="descricao" value={usuariolog.descricao} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Curso:  </h2>
                                <select style={{marginLeft: "50px"}} name='curso' onChange={handleChange}>
                                    <option value="">Selecione o curso </option>
                                            <option value="0">Eng. Computação </option>
                                            <option value="1">Eng. Eletrica </option>
                                            <option value="2">Eng. Civil </option>
                                            <option value="3">Eng. Mecânica </option>
                                            <option value="4">Eng. Produção </option>
                                            <option value="5">Eng. Química </option>
                                            <option value="6">Eng. Florestal </option>
                                            <option value="7">Eng. Ambiental </option>
                                            <option value="8">Eng. Biomédica </option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Observação:  </h2>
                                <input type="text" name="observacao" value={usuariolog.observacao} onChange={handleChange} />
                            </div>
                        </div>                
                        <div className="row">
                            <div className="col">
                                <div className="contato">
                                    <h2>contato: </h2>
                                    <input type="text" name="grau" value={usuariolog.grau} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: '3%'}}>
                            <div className="col">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: 'none' }}
                                    onChange={e => {onChange(e)} }/>
                                <label htmlFor="select-image">
                                    <Button variant="contained" size='small' color="secondary" component="span" style={{width: '120px', height: '35px'}}>
                                        Buscar foto
                                    </Button>
                                </label>                                                        
                            </div>
                            <div className="col">
                                <button style={{width: '120px', height: '35px'}} className='btn btn-secondary' onClick={()=> usuarioEdita()} >Salvar</button>
                            </div>                            
                        </div>
                    </div>
            </div>            
        </div>
    );    
}


export default Perfil;
