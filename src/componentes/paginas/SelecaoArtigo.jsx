import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const SelecaoArtigo = (props) => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://localhost:3033/artigo/artigolista";
    
    var opcoes = [
        {value: 0, label: "Selecione o artigo"}
    ]  
    
    const [selecionado, setSelecionado]=useState(
        {
          idArtigo: 0,
          idUsuario: 0
        }
    );  

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

    async function confirmarParticipant() {        
        try {
            
            console.log("Dados artigo selecionado: ");
            console.log(selecionado);

            await axios.post('http://localhost:3033/adiconaparticipante', selecionado, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
                if(response.data){
                    alert("Adicionado participante ao artigo");                    
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

    const handleSelect = (s) => {
        setSelecionado(selecionado => ({
            ...selecionado,
            idArtigo: s[0].value,
            idUsuario: props.cod
         }));

    };

    return(        
    <div className="selecao">        
        <Select options={opcoes} 
            isMulti
            hideSelectedOptions={false}
            onChange={(sel) => handleSelect(sel)} />    
        
        <button class="btn btn-secondary" onClick={confirmarParticipant}> Confirmar</button>
    </div>
    );    
    
}


export default SelecaoArtigo;