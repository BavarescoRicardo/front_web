import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Artigo.css'
import axios from 'axios';

function NovoArtigo(){
    const permit = localStorage.getItem('tokens') == null
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";
    const [dados, setDados]=useState([]);

    const artigos = []

    const artigoGet = async()=>{
    if(!permit){
      await axios.get(baseUrlExterno, 
        { headers: {          
            Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
        }
      })
      .then(response => {
        setDados(response.data);
      }).catch(error=> {
        console.log(error);
      })
    }
}

    useEffect(()=>{
        artigoGet()
        console.log('Interval triggered');
    }, 1000);      

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1> A Nova  list4 Artigos  </h1>
                    </div>
                </div>
                <div className="row">

                    Lista:
                    
                    {dados.map(({ codigo, titulo, descricao }) => (
                        <article key={codigo}>
                            <div className="artigo">
                                <div className="figura">
                                    <p> Imagem lateral </p>
                                </div>
                                <p> Título: {titulo}  </p>
                                <p> Descrição: {descricao} </p>
                            </div>
                        </article>
                    ))}
                    
                    

                </div>

                <div className="div">
                    {!permit  
                        ? <Link to="/Publicar" className="btn btn-info"> Publicar novo</Link>
                        : <h1>Usuario não possui permissões</h1>
                    }
                </div>

            </div>

        </div>
    );    
}


export default NovoArtigo;
