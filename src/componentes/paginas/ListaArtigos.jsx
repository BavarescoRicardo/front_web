import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Artigo.css'
import Select from 'react-select'

import "../estilos/search-filter.css"


import axios from 'axios';

function ListaArtigos(){
    const baseUrl ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";
    const baseUrlExterno ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";
    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";

    const [dados, setDados]=useState([]);    
    const [img, setImg]=useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [codImagem, setCodImagem] = useState([]);

    const [permissao, setPermissao] = useState(false);
    const userUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/selusuario";

    const verificarPermissao = async()=>{   
        if(localStorage.getItem('tokens') != null){  
            await axios.get(userUrlHeroku, 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(response => {                          
            console.log(response.data)
            if (response.data.login != null){
                setPermissao((response.data.login.roles.find(({ name }) => name === 'ROLE_ADMIN')));

            }else {
                setPermissao(false);
            }          
            }).catch(error=> {
                console.log(error);
            })
        }
        else {
            setPermissao(false);
        }  
    }

    const artigoGet = async()=>{
        await axios.get(baseUrlHeroku)
        .then(response => {
            console.log(response.data);
            setDados(response.data);
            verificarPermissao();
        }).catch(error=> {
            console.log(error);
        })
    }    

    useEffect(async ()=>{            
        await artigoGet();      
        console.log('Invocou use efeito');
        setImg(true)
    }, []); 


    function decodifImagem(foto, codigo){
        // Decodifica a imagem do banco de dados
        if (dados.length > 0) {
            setImageUrl(imageUrl => [...imageUrl, ('data:image/jpeg;base64,' + foto)])
            setCodImagem(codImagem => [...codImagem, codigo])

            setImg(false)
        }
    }

    async function removeArtigo(idArtigo) {        
        try {
            const formData = new FormData();
            formData.append('idArtigo', idArtigo);
            await axios.post('https://tcc-spring-back-end.herokuapp.com/artigo/remover/', formData, 
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

    const options = [
        { value: 'comp', label: 'Computação' },
        { value: 'elet', label: 'Elétrica' },
        { value: 'civi', label: 'Civil' },
        { value: 'meca', label: 'Mecânica' },
        { value: 'prod', label: 'Produção' }
    ]

    const styles = {
        fontSize: 14,
        height: 35,
      }

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
          height: 35,
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: 100,
          height: 25,
          minWidth: 120,
          marginTop: -5
        }),
        singleValue: (provided, state) => {
      
          return { ...provided };
        }
      }

    return(
        <div className='lista-artigo'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Divulgação de Trabalhos Acadêmicos</h1>
                    </div>
                </div>
                <hr />              
                
                <div className="row searchFilter" >
                    <div className="col-sm-12" >
                    <div className="input-group" >
                    <input id="table_filter" placeholder='Filtrar por:  Título, Conteúdo' type="text" className="form-control" aria-label="Text input with segmented button dropdown" />
                    <div className='searchFilter-selecao'>
                        <Select 
                            styles={customStyles}
                            options={options} 
                            isMulti={false}
                            hideSelectedOptions={false}                        
                            // onChange={(sel) => handleSelect(sel)}
                            /> 
                    </div>
                        <button id="searchBtn" type="button" class="btn btn-primary btn-search" style={{width: '130px', minWidth: '90px'}} ><span class="glyphicon glyphicon-search" >&nbsp;</span> <span class="label-icon" >Pesquisar</span></button>
                    </div>
                    </div>
                </div>
            </div>

            {dados.map(({ codigo, titulo, descricao, imagem }) => (
                <article key={codigo}>
                    <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                        {(imagem && img && dados.length > 0)? decodifImagem(imagem, codigo) : null}
                        {imagem? <img style={{ width: "95%", height: "85%", margin: "5px 5px" }} src={imageUrl[codImagem.indexOf(codigo)]} /> : null}                                    
                        <div className="card-body">
                            <h5 className="card-title">{titulo}</h5>
                            <p className="card-text">{descricao}</p>
                            <p>
                                <Link to={`/DetalheArtigo/${codigo}`} style={{ marginLeft: "10px" }}  className="link-dark text-decoration-none"> Ver Detalhes <FaInfoCircle /> </Link>
                                {permissao  
                                    ? <button onClick={()=> removeArtigo(codigo)} className="btn btn-link link-danger text-decoration-none"> <FaTrash color="black" /> </button>
                                    : <h1> </h1>
                                }                                        
                            </p>
                        </div>
                    </div>
                </article>
            ))}                    

            <div className="div">
                {permissao  
                    ? <Link to="/Publicar" className="btn btn-info" style={{float: 'right', marginRight: '2%'}}> Publicar novo</Link>
                    : <h1> </h1>
                }
            </div>
        </div>
    );    
}


export default ListaArtigos;
