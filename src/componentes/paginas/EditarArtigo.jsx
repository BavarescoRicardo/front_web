import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import '../estilos/Publicar.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

function EditarArtigo(props) {
    const history = useHistory();
    const location = useLocation();

    const baseUrlArtigoHeroku ="http://localhost:3033/artigo/salvarartigo";
    const editarUrlHeroku ="http://localhost:3033/artigo/artigo";
    const baseUrlHerokuImg ="http://localhost:3033/artigo/imagem";
    
    var codigoArtigo = 0;
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [atualizar, setAtualizar] = useState(0);

    const [artigo, setArtigo]=useState(
        {
          codigo: 0,
          titulo: '',
          descricao: '',
          observacao: ''
        }
    );

    useEffect(async () => {
        artigoGet();
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }        
        
        if ((artigo.codigo > 0) && (selectedImage == null)) {
            setImageUrl('data:image/jpeg;base64,' + artigo.imagem)
        }
        if(atualizar < 2)
            componentatualiza();
      }, [selectedImage, atualizar]);

      function componentatualiza(){
        setTimeout(() => {
            setAtualizar(atualizar+1)
        }, 1000);
      }

    const artigoGet = async()=>{

        const formData = new FormData();
        formData.append('idArtigo', location.idArtigo);

        await axios.post(editarUrlHeroku, formData,
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString(),
                    'Content-Type': 'multipart/form-data'            
                }
            })
        .then(response => {
            console.log(response.data)
            setArtigo(response.data)            
        }).catch(error=> {
            console.log(error);
        })
    }

    // codigo para postar foto inicio
    function postarFoto () {
        if (!selectedImage) {
            return;
        }
        console.log("Imagem selecionada okei, tentando postar.. ")
        let formData = new FormData();
        try {
            formData.append('artigo', codigoArtigo);
            formData.append('image', selectedImage);
            // Requisicao para postar imagem
            axios.post(baseUrlHerokuImg, formData,
                {          
                    headers: {          
                        Authorization: 'Bearer ' + localStorage.getItem('tokens').toString(),
                        'Content-Type': 'multipart/form-data'            
                    }
                })
                .then(res => {
                        alert("Imagem salva com sucesso.")
                        history.push('/');
                })
            
        } catch (error) {
            alert("Erro ao postar imagem: "+ error)
        }


    };
    // fim postar foto

    
    const handleChange = e=> 
    {
        // Montar objeto usuario
        const {name, value}=e.target;
        setArtigo(
        {
            ...artigo,
            [name]: value
        });        
    }  
    
    const artigoPost = async()=>{        
        console.log("Postando artigo novo")

        try {
            await axios.post(baseUrlArtigoHeroku, artigo, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
              if(response.data){
                //setArtigo(response.data)
                console.log('Publicado artigo')
                codigoArtigo = response.data.codigo
                postarFoto()                
              }else{
                console.log("error ao publicar");    
              }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
        alert("Artigo editado com sucesso.")
      }    
    
    return(        
        <div className="publica-artigo">            
            <div className='cad-login' style={{marginTop: '1%', paddingBottom: '10%'}}>
                <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: '10%'}}>
                    <div className="card-body">
                        <h5 className="card-title" style={{marginBottom: '15px'}}>Editar Artigo</h5>
                        <div className="image">                            
                            {(selectedImage || artigo.imagem)? <img src={imageUrl} /> : null}
                        </div>

                        <div className="formulario-artigo">
                            <div className="camposcad-artigo">
                                <div className="row">
                                    <div className="col">
                                        <label>Observação</label>
                                        <input type="text" name="observacao" onChange={handleChange} value={artigo.observacao} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>Titulo</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" name="titulo" onChange={handleChange} value={artigo.titulo} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <label>Descriçao</label>
                                        <input type="text" name="descricao" onChange={handleChange} value={artigo.descricao}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>Curso:  </label>
                                        <select style={{marginRight: "10%", float: "right"}} name='codCurso' id='codCurso' value={artigo.codCurso} onChange={handleChange}>
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
                            </div>
                        </div>
                    
                            <div className="row">
                                    <div className="row">
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
                                </div>

                                <div className="col">
                                    <button style={{float: 'right'}} type="button" className="btn btn-secondary" onClick={()=> artigoPost()}>Cadastrar</button>
                                </div>
                            </div>
                        </div>
            </div>            
        </div>
    );    
}

export default EditarArtigo;
