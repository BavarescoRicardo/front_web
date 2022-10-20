import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import axios from 'axios';

const ParticipanteArtigo = (props) => {  
    const baseUrl ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";
    const baseUrlExterno ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";

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

    function formataNumero(numero){
        var zeros = '0';
        if (numero < 1000){
            zeros += '0';
        }
        if (numero < 100){
            zeros += '0';
        }
        if (numero < 10){
            zeros += '0';
        }
        numero = zeros+numero;
        return numero;
    }

    async function artigosParticipa(idUsuario) {        
        try {
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
    <div className="selecao" style={{marginLeft: '10px'}}>        
        {
            dadoParticipa.map(
                (number) => <li>
                    {number = formataNumero(number)}
                    <button onClick={()=> removeArtigo(number)} className="btn btn-link link-danger text-decoration-none"> <FaTrash /> </button>
                </li>
            )
        }
    </div>
    );    
    
}


export default ParticipanteArtigo;