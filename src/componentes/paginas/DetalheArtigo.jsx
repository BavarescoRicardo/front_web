import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { GrEdit } from "@react-icons/all-files/gr/GrEdit";
import axios from 'axios';
import '../estilos/Detal.css';

function Detalhe(){
    
    const { id } = useParams();
    const [permit, setPermit]=useState(null);
    const userUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/verificaparticipante/";
    const userUrlHerokuArtigo ="https://tcc-spring-back-end.herokuapp.com/artigo/removerdetalhe/";
    const editarUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/artigo";

    const artigoGet = async()=>{

        const formData = new FormData();
        formData.append('idArtigo', id);

        await axios.post(editarUrlHeroku, formData)
        .then(response => {
            setArtigo(response.data)            
        }).catch(error=> {
            console.log(error);
        })
    }

    const [artigo, setArtigo]=useState(
        {
          codigo: 0,
          titulo: '',
          descricao: '',
          observacao: ''
        }
    );

    async function verificaParticipante() {        
        try {
            const formData = new FormData();
            formData.append('idArtigo', id);
            await axios.post(userUrlHeroku, formData, 
            { 
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
            })
            .then(async response => {
                if(response.data){
                    alert("Usuário pode editar este artigo");
                    setPermit(true);
                }else{
                    console.log("error ao verificar");    
                }
            }).catch(error=> {
              console.log("Erro " + error);
            })            
        } catch (error) {
            console.log("Erro " + error);
        }
    }

    const artigoDetalheRemover = async(id)=>{        

        try {
            console.log("tentando remover id dos artigo do participante");
            const formData = new FormData();
            formData.append('idArtigo', id);

            await axios.post(userUrlHerokuArtigo, formData, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
              if(response.data){
                alert("Removido com sucesso !");
                window.location.reload();
              }
            }).catch(error=> {
              console.log(error);
            })
                       
        } catch (error) {
            console.log(error);
        }
      } 

    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/artigo/artigodettalhe";

    const formData = new FormData();
    formData.append('idArtigo', id);
    const [artigos, setArtigos]=useState([]);
    const [imageUrl, setImageUrl] = useState([null]); 
    const [codImagem, setCodImagem] = useState([null]); 
    const [efeito, setEfeito] = useState(false); 
    
    const detalhrGet = async()=>{        
      await axios.post(baseUrlHeroku, formData)
      .then(response => {
        setArtigos(response.data);
      }).catch(error=> {
        console.log(error);
      })
    }

    useEffect(async ()=>{
        await detalhrGet();
        artigoGet();
        setEfeito(true);
        verificaParticipante();
      }, [])

      function decodifImagem(imagem, codigo){
        // Se artigo nao contem imagem entao apenas retorna
        if (imagem == undefined) {
            return;
        } else {
            // Decodifica a imagem do banco de dados
            setImageUrl(imageUrl => [...imageUrl, ('data:image/jpeg;base64,' + imagem)])
            setCodImagem(codImagem => [...codImagem, codigo])

            setEfeito(false);
        }        
    }

      return(
        <div className='lista-artigo'>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {/* {artigo.codigo > 0 ? null: artigoGet()} */}
                            <h1> Detalhes do artigo {artigo.titulo} </h1> {/* substituir id pelo titulo do artigo*/}
                        </div>
                    </div>
                </div>                
            </section>                    
            {artigos.map(({ codigo, codArtigo, titulo, descricao, fotoPublicacao }) => (
                <article key={codigo}>
                    <div className="card mb-3" style={{ display: "flex", marginLeft: "auto", marginRight: "auto"}}>
                        {(!efeito)  && (fotoPublicacao) ? null  : decodifImagem(fotoPublicacao, codigo)}
                        <img style={{ width: "95%", height: "85%", margin: "5px 5px" }} src={imageUrl[codImagem.indexOf(codigo)]} />                                    
                        <div className="card-body">
                            <h5 className="card-title">{titulo}</h5>                                
                            <p className="card-text">{descricao}</p>
                                {permit  
                                    ? <Link to={`/DetalheArtigoEditar/${codigo}`}  className="btn btn"><GrEdit/> Editar </Link>
                                    : <p> </p>
                                }

                                {permit  
                                    ? <button onClick={() => {artigoDetalheRemover(codigo) }} className="btn btn-link link-dark text-decoration-none"><FaTrash color="black" /> Remover</button>
                                    : <p></p>
                                }
                        </div>
                    </div>
                </article>
            ))}             
        
            <section>
                <div className="btn-fim-editar">
                    {permit  
                        ? <Link to={`/DetalheArtigoNovo/${id}`}  className="btn btn"> Adicionar detalhe a esta publicação: {id}</Link>
                        : <p> </p>
                    }
                </div>
            </section>
            
        </div>        
    );    
}

export default Detalhe;