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
    const [img, setImg]=useState(false);
    const [imageUrl, setImageUrl] = useState(0);

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

    useEffect(async ()=>{            
        await artigoGet();      
        console.log('Invocou use efeito');
        setImg(true)
    }, []); 


    function decodifImagem(foto){
        // Decodifica a imagem do banco de dados
        console.log(dados.length)
        if (dados.length > 0) {
            console.log("esperou e carregou dados")
            console.log(dados)
            console.log("Chamou como callback")
            console.log(dados[7])

            setImageUrl('data:image/jpeg;base64,' + foto)
            setImg(false)
        }
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1> A Nova  lista de Artigos  </h1>
                    </div>
                </div>
                <div className="row">

                    <h4>Lista</h4>                    
                    
                    {dados.map(({ codigo, titulo, descricao, imagem }) => (
                        <article key={codigo}>
                            <div className="artigo">
                                <div className="foto">
                                    <p> Imagem lateral </p>
                                    {(imagem && img)? decodifImagem(imagem) : null}
                                    {imagem? <img style={{ width: "95%", height: "85%", margin: "-50px 5px" }} src={imageUrl} /> : null}
                                </div>
                                <div className="texto">
                                    <p> Título: {titulo}  </p>
                                    <p> Descrição: {descricao} </p>
                                    <p><Link to={`/DetalheArtigo/${codigo}`}  className="btn btn"> Ver: {codigo}</Link></p>
                                </div>
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
