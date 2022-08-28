import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Artigo(){
    const permit = localStorage.getItem('tokens') == null
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";
    const [data, setData]=useState([]);

    const artigoGet = async()=>{
    if(!permit){
      await axios.get(baseUrlExterno, 
        { headers: {          
            Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
        }
      })
      .then(response => {
        setData(response.data);
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
                        <h1> Lista de Artigos publicados </h1>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>Código</th> <th>Titulo</th> <th>Descrição</th> <th>Detalhar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(artigo=> (
                                <tr key={artigo.codigo}>
                                <td> {artigo.codigo }</td>
                                <td> {artigo.titulo }</td>
                                <td> {artigo.descricao }</td>
                                <td><Link to={`/DetalheArtigo/${artigo.codigo}`}  className="btn btn"> Ver: </Link></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
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


export default Artigo;
