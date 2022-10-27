import React, { useEffect, useState } from 'react';
import	{ useHistory } from 'react-router-dom';
import '../estilos/Publicar.css'
import api from '../../servicos/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';

function PublicarNoticia(){

    const history = useHistory();;
    const baseUrlArtigoHeroku ="https://tcc-spring-back-end.herokuapp.com/noticia/salvar";
    const baseUrlHerokuImg ="https://tcc-spring-back-end.herokuapp.com/noticia/imagem";

    var codigoArtigo = 0;
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

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
        try {
            formData.append('artigo', codigoArtigo);
            formData.append('image', selectedImage);
            // Requisicao para postar imagem
            api.post(baseUrlHerokuImg, formData,
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

    const [artigo, setArtigo]=useState(
        {
          codigo: 0,
          titulo: '',
          descricao: '',
          observacao: ''
        }
    );  
    
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
        delete artigo.codigo;
        console.log("Postando artigo novo")

        try {
            await api.post(baseUrlArtigoHeroku, artigo, 
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
      }    
    
    return(        
        <div className="publica-artigo">            
            <div className='cad-login' style={{marginTop: '1%', paddingBottom: '10%'}}>
                <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto", marginTop: '10%'}}>
                    <div className="card-body">
                        <h5 className="card-title">Publicar Noticia</h5>
                        <div className="image">                            
                            {selectedImage? <img src={imageUrl} /> : null}
                        </div>

                        <div className="formulario-artigo">
                            <div className="camposcad-artigo">
                                <div className="row">
                                    <div className="col">
                                        <label>Observação</label>
                                        <input type="text" name="observacao" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>Titulo</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" name="titulo" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>Descrição</label>
                                        <input type="text" name="descricao" onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <label>Curso:  </label>
                                        <select style={{marginRight: "10%", float: "right"}} name='codCurso' id='codCurso' onChange={handleChange}>
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

export default PublicarNoticia;
