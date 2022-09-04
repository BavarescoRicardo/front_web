import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const SelecaoArtigo = props => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigolista";
    //const [dados, setDados]=useState([]);    
    let opcoes = [
        {value: 0, label: "Selecione o artigo"}
    ];

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

    
    useEffect(async ()=>{      
        console.log("Seleciona dados");      
        await artigoGet();
    }, []); 

    return(        
    <div className="selecao">        
        <Select options={opcoes} isMulti />        
    </div>
    );    
    
}


export default SelecaoArtigo;