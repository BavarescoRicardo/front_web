import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle";
import { BiEdit } from "@react-icons/all-files/bi/BiEdit";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Artigo.css'
import Select from 'react-select'

import "../estilos/search-filter.css"


import axios from 'axios';

function ListaArtigos(){
    const history = useHistory();
    const baseUrlHeroku ="http://localhost:3033/artigo/artigolista";
    const userUrlHeroku ="http://localhost:3033/selusuario";
    const userUrlHerokuCont ="http://localhost:3033/artigo/artigoconta";

    const [dados, setDados]=useState([]);    
    const [img, setImg]=useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [codImagem, setCodImagem] = useState([]);
    const [permissao, setPermissao] = useState(false);
    const [pagina, setPagina]=useState(0);
    const [contagem, setContagem]=useState([]);
    
    var n = 5;

    const [filtro, setFiltro]=useState(
        {
          codCurso: 0,
          textoFiltro: "",
          pg: 0
        }
    );

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

    const contagemArtigo = async()=>{   
        if(localStorage.getItem('tokens') != null){  
            await axios.get(userUrlHerokuCont)
            .then(response => {                          
            if (response.data != null){
                setContagem(response.data);
            }else {
                setPermissao(false);
            }          
            }).catch(error=> {
                console.log(error);
            })
        }  
    }

    const artigoGet = async()=>{
        await axios.get(baseUrlHeroku+"?pg="+pagina)
        .then(response => {
            setDados(response.data);

            verificarPermissao();
            contagemArtigo();
        }).catch(error=> {
            console.log(error);
        })
    }

    const artigoGetFiltrado = async()=>{
        await axios.post(baseUrlHeroku, filtro)
        .then(response => {
            setDados(response.data);
            verificarPermissao();
        }).catch(error=> {
            console.log(error);
        })
    }

    useEffect(async ()=>{            
        await artigoGet(0);      
        console.log('Invocou use efeito');
        setImg(true)
    }, [pagina]); 


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
            await axios.post('http://localhost:3033/artigo/remover/', formData, 
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

    async function editarArtigo(idArtigo) {        
        try {
            history.push({ pathname: '/EditarArtigo',  idArtigo: idArtigo })
        } catch (error) {
            console.log("Erro " + error);
        }
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

      const handleSelect = (s) => {
        setFiltro(filtro => ({
            ...filtro,
            codCurso: s.value,
         }));
    };

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
            </div>

            {dados.map(({ codigo, titulo, descricao, codCurso, imagem }) => (
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
                                    ? <button onClick={()=> editarArtigo(codigo)} className="btn btn-link link-dark text-decoration-none"> Editar <BiEdit color="black" size={20} /> </button>
                                    : <h1> </h1>
                                }

                                {permissao  
                                    ? <button onClick={()=> removeArtigo(codigo)} className="btn btn-link link-danger text-decoration-none"> <FaTrash color="black" size={15} /> </button>
                                    : <h1> </h1>
                                }
                            </p>
                            <div className="texto-card-cod">
                                <p className="card-text">{"Curso: " + options[codCurso].label}</p>
                            </div>                            
                        </div>
                    </div>
                </article>
            ))}

            <nav style={{backgroundColor: 'whitesmoke', padding: '0', maxWidth: '10%', marginLeft: 'auto', marginRight: 'auto'}}>
                <ul className="pagination pagination-sm" style={{backgroundColor: 'whitesmoke', margin: '2px', maxWidth: '90%', marginRight: '1%'}}>
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    {
                        [...Array(contagem)].map(
                            (e, i) => 
                                <li>
                                    <a className="page-link" href="#" onClick={() => setPagina(i)}>{i+1}</a>
                                </li>
                        )
                    }

                    <li className="page-item">                        
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>

            <div className="publicar-novo-lista-artigo" >
                {permissao  
                    ? <Link to="/Publicar" className="btn btn-info" style={{marginTop:'10px', float: 'right', marginRight: '1%'}}> Publicar novo</Link>
                    : <h1> </h1>
                }
            </div>

        </div>
    );    
}


export default ListaArtigos;
