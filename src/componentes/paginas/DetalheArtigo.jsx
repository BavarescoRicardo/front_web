import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../estilos/Detal.css';

function Detalhe(){
    
    const { id } = useParams();
    const permit = localStorage.getItem('tokens') == null
    const baseUrl ="http://localhost:3033/artigo/artigodettalhe";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigodettalhe";

    const formData = new FormData();
    formData.append('idArtigo', id);
    const [artigos, setArtigos]=useState([]);
    const [imageUrl, setImageUrl] = useState([]);  
    
    const detalhrGet = async()=>{
        console.log("requisicao: "+id)
      await axios.post(baseUrl, formData)
      .then(response => {
        
        response.data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                if (key == 'fotoPublicacao'){
                    console.log("foto aqui:");
                    setImageUrl('data:image/jpeg;base64,' + value)    
                }
                console.log(`${key} ${value}`);
            });
            console.log('-------------------');
        });

        setArtigos(response.data);
      }).catch(error=> {
        console.log(error);
      })
    }

    useEffect(()=>{
        detalhrGet();        
      }, [])

      return(
        <div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <h1> Detalhe do artigo Cabecalho </h1>
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
                            <div className="col">
                                <div className="informacoes" style={{height: '250px'}}>
                                    <img style={{ width: "95%", height: "85%", margin: "10px 5px" }} src={imageUrl} />
                                </div>
                            </div>
                        </div>
                        <div className="col">                            
                        </div>
                    </div>


                    {artigos.map(({ codigo, titulo, descricao, imagem }) => (
                        <article key={codigo}>
                            <div className="row">
                                <div className="col">
                                    <div className="textoDetalhe">
                                        <p> Título: {titulo}  </p>
                                        <p> Descrição: {descricao} </p>
                                        <p><Link to={`/DetalheArtigo/${codigo}`}  className="btn btn"> Ver: {codigo}</Link></p>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}


                    <div class="row">
                        <div className="col">
                            <div className="informacoes" style={{height: '200px'}}>
                                <h3>Imagem 2 </h3>
                                </div>
                        </div>

                        <div className="col">
                            <p>comentarios ao lado </p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        <div className="col">
                            <div className="informacoes" style={{height: '150px'}}>
                                <h3>Imagem 3 </h3>
                            </div>
                        </div>
                        </div>

                        <div className="col">
                            <p>comentarios ao lado </p>
                        </div>
                    </div>             
                </div>
            </section>
        
            <section>
                <div className="btn-fim-editar">
                    {!permit  
                        ? <Link to={`/DetalheArtigoEditar/${id}`}  className="btn btn"> Editar esta publicação: {id}</Link>
                        : <h1>Sem permissões</h1>
                    }
                </div>
            </section>
            
        </div>        
    );    
}

export default Detalhe;