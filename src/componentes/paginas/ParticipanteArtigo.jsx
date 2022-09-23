import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const ParticipanteArtigo = (props) => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";

    const [dadoParticipa, setDadoParticipa]=useState([]);    

    const [selecionado, setSelecionado]=useState(
        {
          idArtigo: 0,
          idUsuario: 0
        }
    ); 
    
    async function removeArtigo(idArtigo) {        
        try {
            console.log("removendo o artigo de  id: "+idArtigo);
            console.log("removendo o usuario de  id: "+props.idUsuario);

            selecionado.idArtigo = idArtigo;
            selecionado.idUsuario = props.idUsuario;

            await axios.post('https://tcc-spring-back-end.herokuapp.com/participanteremover/', selecionado, 
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


    async function artigosParticipa(idUsuario) {        
        try {
            console.log("tentando selecionar participantes id dos artigo");
            const formData = new FormData();
            formData.append('idUsuario', idUsuario);
            await axios.post('https://tcc-spring-back-end.herokuapp.com/selparticipantes/', formData, 
            { 
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
            })
            .then(async response => {                    
                if(response.data){
                    setDadoParticipa(response.data);
                }else{
                    console.log("error ao publicar");    
                }
            }).catch(error=> {
                console.log("Erro " + error);
            })            
        } catch (error) {
            console.log("Erro " + error);
        }
    }


    useEffect(async ()=>{      
        await artigosParticipa(props.idUsuario);
    }, []); 

    return(        
    <div className="selecao">        
        {
            dadoParticipa.map( 
                (number) => <li>
                    { number }
                    <button onClick={()=> removeArtigo(number)} className="btn btn-link link-danger text-decoration-none"> Remover </button>
                </li>
            )
        }
    </div>
    );    
    
}


export default ParticipanteArtigo;