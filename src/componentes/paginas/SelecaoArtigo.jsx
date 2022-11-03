import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import axios from 'axios';

const SelecaoArtigo = (props) => {  
    const baseUrl ="http://localhost:3033/artigo/artigolista";
    const baseUrlExterno ="http://localhost:3033/artigo/artigolistaparticipante";
    
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
        await axios.get(baseUrlExterno,
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }})
        .then(response => {
            
            // console.log(response.data);
            response.data.forEach((item) => {
              console.log('laco dados request')
              if(!item.codigo > 0)
                return;
              opcoes.push({value: item.codigo, label: item.titulo})              
            });


        }).catch(error=> {
            console.log(error);
        })
    }

    async function confirmarParticipant() {        
        try {
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
                alert(error)
                console.log("Erro " + error);
            }).then(() => {
                window.location.reload();
            })
        } catch (error) {
            alert(error)
            console.log("Erro " + error);
        }        
    }   
    
    useEffect(async ()=>{      
        await artigoGet();
    }, [opcoes]); 

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
            label="Selecionar"
            hideSelectedOptions={false}
            onChange={(sel) => handleSelect(sel)} />    
        
        <button class="btn btn-secondary" onClick={confirmarParticipant}> Confirmar</button>
    </div>
    );    
    
}


export default SelecaoArtigo;