import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../estilos/Detal.css';
import Button from '@material-ui/core/Button';

function EditarDetalhe(){

    const [detalheArtigo, setDetalheArtigo] =
    useState(
        {
            titulo: '',
            descricao: '',
            codArtigo: 0
        }
    );

    const baseUrl ="https://tcc-spring-back-end.herokuapp.com/artigo/foto";
    const baseUrlExterno ="https://tcc-spring-back-end.herokuapp.com/artigo/foto";
    const baseUrlArtigoDetal ="https://tcc-spring-back-end.herokuapp.com/artigo/salvardetalhe";
    const baseUrlEditarHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/dettalheedicao";
    const { id } = useParams()

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [atualizar, setAtualizar] = useState(0);

    function componentatualiza(){
        setTimeout(() => {
            setAtualizar(atualizar+1)
        }, 1000);
      }

    const detalheGet = async()=>{
        const formData = new FormData();
        formData.append('idDetalhe', id);

        await axios.post(baseUrlEditarHeroku, formData, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }})
        .then(response => {
            setDetalheArtigo(response.data);
        }).catch(error=> {
          console.log(error);
        })
      }

    const handleChange = e=> 
    {
        // Montar objeto usuario
        const {name, value}=e.target;
        setDetalheArtigo(
        {
            ...detalheArtigo,
            [name]: value
        });        
    }

    useEffect(() => {   
        detalheGet();
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));            
        }

        if ((detalheArtigo.codigo > 0) && (selectedImage == null)) {
            setImageUrl('data:image/jpeg;base64,' + detalheArtigo.fotoPublicacao)
        }
        
        if(atualizar < 2)
            componentatualiza();
      }, [selectedImage, atualizar]);

    // codigo para postar foto inicio
    function postarFoto (codigoDetal) {
        console.log("Caiu na func postar foto")
        console.log(selectedImage)
        if (!selectedImage) {
            return;
        }
        console.log("Imagem selecionada okei, tentando postar.. ")
        let formData = new FormData();
        try {
            formData.append('detalheArtigo', codigoDetal);
            formData.append('image', selectedImage);
            // Requisicao para postar imagem
            axios.post(baseUrlExterno, formData,
                {          
                    headers: {          
                        Authorization: 'Bearer ' + localStorage.getItem('tokens').toString(),
                        'Content-Type': 'multipart/form-data'            
                    }
                })
                .then(res => {
                        alert("Imagem salva com sucesso.")
                })
            
        } catch (error) {
            alert("Erro ao postar imagem: "+ error)
        }


    };
    // fim postar foto

    const artigoDetalhePost = async()=>{        

        try {
            detalheArtigo.codigo = id;
            await axios.post(baseUrlArtigoDetal, detalheArtigo, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
              if(response.data){
                console.log("Agora tenta postar a foto! ");
                postarFoto(response.data.codigo);
                alert("Artigo salvo com sucesso.")
              }else{
                console.log("error ao publicar");    
              }
            }).catch(error=> {
              console.log(error);
            })
                       
        } catch (error) {
            console.log(error);
        }
      } 

      return(
        <div>
            <div className='cad-login' style={{marginTop: '1%', paddingBottom: '10%'}}>
                <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: '10%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Editar detalhe do Artigo</h5>
                        <div className="image">                            
                            {(selectedImage || detalheArtigo.fotoPublicacao)? <img src={imageUrl} /> : null}
                        </div>

                        <div className="formulario-artigo">
                            <div className="camposcad-artigo">
                                <div className="row">
                                    <div className="col">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>Titulo</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" name="titulo" onChange={handleChange} value={detalheArtigo.titulo} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                    <label>Descriçao</label>
                                        <input type="text" name="descricao" onChange={handleChange} value={detalheArtigo.descricao} />
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
                                <button style={{float: 'right'}} type="button" className="btn btn-secondary" onClick={()=> artigoDetalhePost()}>Confirmar</button>
                            </div>
                        </div>
                    </div>
            </div>
            
        </div>        
    );    
}

export default EditarDetalhe;