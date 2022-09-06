import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const ParticipanteArtigo = (props) => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";

    const [dadoParticipa, setDadoParticipa]=useState([]);    
    
    
    async function artigosParticipa(idUsuario) {        
        try {
            console.log("tentando selecionar participantes id dos artigo");
            const formData = new FormData();
            formData.append('idUsuario', idUsuario);
            await axios.post('http://localhost:3033/selparticipantes/', formData, 
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
            dadoParticipa.map( (number) => <li>{ number }</li>)
        }
    </div>
    );    
    
}


export default ParticipanteArtigo;