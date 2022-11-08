import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import "../estilos/search-filter.css"
import axios from 'axios';

function FiltroArtigo(props){

    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";
    const [filtro, setFiltro]=useState(
        {
          codCurso: 0,
          textoFiltro: "",
          pg: 0
        }
    );


    const handleSelect = (s) => {
        setFiltro(filtro => ({
            ...filtro,
            codCurso: s.value,
         }));
    };

    const handleChange = e=> 
    {
        // Montar objeto usuario
        const {name, value}=e.target;
        setFiltro(
        {
            ...filtro,
            [name]: value
        });        
    }


    const options = [
        { value: 0, label: 'Computação' },
        { value: 1, label: 'Elétrica' },
        { value: 2, label: 'Civil' },
        { value: 3, label: 'Mecânica' },
        { value: 4, label: 'Produção' },
        { value: 5, label: 'Química' },
        { value: 6, label: 'Florestal' },
        { value: 7, label: 'Ambiental' },
        { value: 8, label: 'Biomédica' }
    ]

    const artigoGetFiltrado = async()=>{
        await axios.post(baseUrlHeroku, filtro)
        .then(response => {
            props.setDados(response.data);
        }).catch(error=> {
            console.log(error);
        })
    }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          height: 35,
        }),
        control: () => ({
          width: 115,
          height: 25,
          marginTop: -5          
        }),
        singleValue: (provided, state) => {
      
          return { ...provided };
        }
      }


    return(        
        <div className="row searchFilter" >
            <div className="col-sm-12" >
                <div className="input-group" >
                    <input id="textoFiltro" name="textoFiltro" placeholder='Filtrar por:  Título, Conteúdo' type="text" className="form-control" aria-label="Text input with segmented button dropdown" onChange={handleChange} />
                    <div className='searchFilter-selecao'>
                        <Select 
                            styles={customStyles}
                            options={options} 
                            isMulti={false}
                            hideSelectedOptions={false}
                            placeholder = 'Cursos'                       
                            onChange={(sel) => handleSelect(sel)}
                            /> 
                    </div>
                    <button id="searchBtn" type="button" class="btn btn-primary btn-search" style={{ minWidth: '90px'}} onClick={()=> artigoGetFiltrado()} ><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Pesquisar</span></button>
                </div>
            </div>
        </div>
    );    
}

export default FiltroArtigo;
