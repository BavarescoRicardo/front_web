import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Artigo.css'
import axios from 'axios';

function NovoArtigo(){
    const permit = localStorage.getItem('tokens') == null
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://localhost:3033/artigo/artigolista";
    const [dados, setDados]=useState([]);    
    const [img, setImg]=useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [codImagem, setCodImagem] = useState([]);

    const artigoGet = async()=>{
        await axios.get(baseUrlExterno)
        .then(response => {
            setDados(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }    

    useEffect(async ()=>{            
        await artigoGet();      
        console.log('Invocou use efeito');
        setImg(true)
    }, []); 


    function decodifImagem(foto, codigo){
        // Decodifica a imagem do banco de dados
        if (dados.length > 0) {
            setImageUrl(imageUrl => [...imageUrl, ('data:image/jpeg;base64,' + foto)])
            setCodImagem(codImagem => [...codImagem, codigo])

            setImg(false)
        }
    }

    async function removeArtigo(idArtigo) {        
        try {
            console.log("removendo o artigo de  id: "+idArtigo);
            const formData = new FormData();
            formData.append('idArtigo', idArtigo);
            await axios.post('http://localhost:3033/artigo/remover/', formData, 
            { 
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
            }).then(response => {
                window.location.reload();
            });
        } catch (error) {
            console.log("Erro " + error);
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
                                    {(imagem && img && dados.length > 0)? decodifImagem(imagem, codigo) : null}
                                    {imagem? <img style={{ width: "95%", height: "85%", margin: "5px 5px" }} src={imageUrl[codImagem.indexOf(codigo)]} /> : null}                                    
                                </div>
                                <div className="texto">
                                    <p> Título: {titulo}  </p>
                                    <p> Descrição: {descricao} </p>
                                    <p>
                                        <Link to={`/DetalheArtigo/${codigo}`}  className="link-dark text-decoration-none"> Ver </Link>
                                        {!permit  
                                            ? <button onClick={()=> removeArtigo(codigo)} className="btn btn-link link-danger text-decoration-none"> Remover</button>
                                            : <h1> </h1>
                                        }                                        
                                    </p>
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
