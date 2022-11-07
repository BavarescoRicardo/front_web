import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaInfoCircle } from "@react-icons/all-files/fa/FaInfoCircle";
import { BiEdit } from "@react-icons/all-files/bi/BiEdit";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/Artigo.css'
import "../estilos/search-filter.css"
import ParticipantesModal from "../elementos/ParticipantesModal"
import axios from 'axios';

import FiltroArtigo from './FiltroArtigo';
import Paginacao from './Paginacao'


function ListaArtigos(){
    const history = useHistory();
    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/artigolista";
    const userUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/selusuario";
    const userUrlHerokuCont ="https://tcc-spring-back-end.herokuapp.com/artigo/artigoconta";

    const [show, setShow] = useState(false);
    const [participantes, setParticipantes]=useState([]);

    const [dados, setDados]=useState([]);    
    const [img, setImg]=useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [codImagem, setCodImagem] = useState([]);
    const [permissao, setPermissao] = useState(false);
    const [pagina, setPagina]=useState(0);
    const [contagem, setContagem]=useState([]);    

    let users =[];
    let codUsers =[];

    async function handleShow(codigo) {
        users = [];
        setParticipantes([])
        console.log("Codigo parametro");
        console.log(codigo);
        codUsers.forEach(element => {
            if (codigo == element[1].cod){
                console.log("Igual")
                // users.push([element[0], {cod: codigo}]);
                setParticipantes(participantes => [...participantes, element[0]])                    
            }
            console.log(participantes);
            setShow(true)            
        })        
    }

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

    useEffect(async ()=>{            
        await artigoGet(0);      
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

    return(
        <div className='lista-artigo'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Divulgação de Trabalhos Acadêmicos</h1>
                    </div>
                </div>
                <hr />                       
                <FiltroArtigo setDados={setDados}/>
        </div>

            {dados.map(({ codigo, titulo, descricao, codCurso, imagem, participantesArtigo }) => (
                <article key={codigo}>
                    <div className="card mb-5" style={{ display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                        {(imagem && img && dados.length > 0)? decodifImagem(imagem, codigo) : null}
                        {imagem? <img style={{ width: "95%", height: "85%", margin: "5px 5px" }} src={imageUrl[codImagem.indexOf(codigo)]} /> : null}
                        <div className="card-body">
                            <h5 className="card-title">{titulo}</h5>
                            <p className="card-text">{descricao}</p>
                            <div className="row">
                                <div className="col">
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="lista-artigo-flags">
                                        <p className="card-text">{"Curso: " + options[codCurso].label}
                                        <button type="button" class="btn btn-outline-dark btn-sm" onClick={() =>handleShow(codigo)}>
                                            Listar Participantes
                                        </button></p>
                                        
                                        {participantesArtigo.forEach(p => { 
                                            codUsers.push([p, {cod: codigo}]);
                                        })}

                                    </div>
                                </div>
                            </div>
                                                      
                        </div>
                    </div>                    
                </article>
            ))}

            <Paginacao contagem = {contagem} setPagina = {setPagina}/>
            <ParticipantesModal show = {show} setShow = {setShow} users = {participantes} />         

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
