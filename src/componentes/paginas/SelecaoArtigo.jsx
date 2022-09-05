import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const SelecaoArtigo = props => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";

    const [dados, setDados]=useState([]);
    
    const opcoes = [
        {value: 0, label: "Selecione o artigo"}
    ]    

    const artigoGet = async()=>{
        await axios.get(baseUrlExterno)
        .then(response => {            

            response.data.forEach((item) => {                
              opcoes.push({value: item.codigo, label: item.titulo})              
            });


        }).catch(error=> {
            console.log(error);
        })
    }

    async function confirmarParticipant(artigo, usuario) {        
        try {            
            dados.idArtigo = artigo;
            dados.idUsuario = usuario;

            // controle
            if((artigo <= 0) || (usuario < 0))
                return;

            console.log("Dados artigo idArtigo: ");
            console.log(usuario);
            await axios.post('http://localhost:3033/adiconaparticipante', dados, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
                if(response.data){
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
        await artigoGet();
    }, []); 

    const handleSelect = () => {
        console.log(dados[0].value);
        console.log(dados[0].label);
    };

    return(        
    <div className="selecao">        
        <Select options={opcoes} isMulti onChange={(sel) => setDados(sel)} />    

        <button class="btn btn-secondary" onClick={handleSelect}> Confirmar</button>
    </div>
    );    
    
}


export default SelecaoArtigo;