import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/search-filter.css"
import axios from 'axios';


async function Autores(props){
    const [dados, setDados]=useState([]);  
    
    function chamaConsultar() { consultarParticipantes() }

    async function consultarParticipantes() {        
        try {
            const formData = new FormData();
            formData.append('idArtigo', props.idArtigo);
            await axios.post('https://tcc-spring-back-end.herokuapp.com/getparticipantes', formData).then(response => {
                setDados(response.data);
                console.log(dados)
            });
        } catch (error) {
            console.log("Erro " + error);
        }
    }

    return(        
        <div className="">
            {chamaConsultar()}
            {/* {dados} */}
        </div>
    );    
}

export default Autores;
