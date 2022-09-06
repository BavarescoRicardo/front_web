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

    const baseUrl ="http://localhost:3033/artigo/foto";
    const baseUrlExterno ="http://localhost:3033/artigo/foto";
    const baseUrlArtigoDetal ="http://localhost:3033/artigo/salvardetalhe";
    const { id } = useParams()

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

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
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
            
        }
        
      }, [selectedImage]);

    // codigo para postar foto inicio
    function postarFoto () {
        console.log("Caiu na func postar foto")
        console.log(selectedImage)
        if (!selectedImage) {
            return;
        }
        console.log("Imagem selecionada okei, tentando postar.. ")
        let formData = new FormData();
        try {
            formData.append('detalheArtigo', id);
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
            detalheArtigo.codArtigo = id;
            await axios.post(baseUrlArtigoDetal, detalheArtigo, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
              if(response.data){
                console.log("Agora tenta postar a foto! ");
                postarFoto();
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
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <h1> Editar os detalhe do artigo: {id} </h1>
                        </div>
                    </div>
                </div>                
            </section>
            <section>
                <div className="container">
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="titulo">Título</label>
                            <input type="text" name='titulo' style={{marginTop: "-2%"}} onChange={handleChange}/>
                        </div>
                    </div>                    
                    <div className="row">
                        <div className="col">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea style={{width: '100%'}} name="descricao" onChange={handleChange} cols="30" rows="5"></textarea>
                        </div>
                    </div> 
                </div>
                    <div className="imagem-detalhe">
                        <div className="row">
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            name="fotoPublicacao"
                            style={{ display: 'none' }}
                            onChange={e => setSelectedImage(e.target.files[0])}
                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" size='small' color="secondary" component="span">
                                Buscar foto
                            </Button>
                        </label>
                        </div>
                        <div className="row">
                            <div className="col">
                                
                            </div>
                        </div>

                    </div>                    

            </section>
        
            <section>
                rodape
                <div className="btn-fim-editar">
                    <button onClick={artigoDetalhePost} type="button" class="btn btn-secondary">Confirmar</button>
                </div>
            </section>
            
        </div>        
    );    
}

export default EditarDetalhe;