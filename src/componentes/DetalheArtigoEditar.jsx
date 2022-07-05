import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './estilos/Detal.css';
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
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/foto";
    const baseUrlArtigoExterno ="http://45.191.187.35:3033/artigo/salvardetalhe";
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
        if (!selectedImage) {
            return;
        }
        console.log("Imagem selecionada okei, tentando postar.. ")
        let formData = new FormData();
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
    };
    // fim postar foto

    const artigoDetalhePost = async()=>{        

        try {
            detalheArtigo.codArtigo = id;
            await axios.post(baseUrlArtigoExterno, detalheArtigo, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            // .then(async response => {
            //   if(response.data){
            //     history.push('/Artigo');
            //   }else{
            //     console.log("error ao publicar");    
            //   }
            // }).catch(error=> {
            //   console.log(error);
            // })            
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
                        <div className="col">
                            <h2> Conteúdo </h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="informacoes" style={{height: '250px'}}>
                                {selectedImage? <img style={{ width: "95%", height: "85%", margin: "10px 5px" }} src={imageUrl} /> : null}
                            </div>
                        </div>
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
                            <button onClick={postarFoto} type="button" class="btn btn-secondary">Publicar imagem</button>
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