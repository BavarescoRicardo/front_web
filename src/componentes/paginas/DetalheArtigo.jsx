import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import axios from 'axios';
import '../estilos/Detal.css';

function Detalhe(){
    
    const { id } = useParams();
    const [permit, setPermit]=useState(null);
    const userUrl ="https://tcc-spring-back-end.herokuapp.com/verificaparticipante/";
    const userUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/verificaparticipante/";
    const baseUrlArtigoDetal ="https://tcc-spring-back-end.herokuapp.com/artigo/removerdetalhe/";
    const userUrlHerokuArtigo ="https://tcc-spring-back-end.herokuapp.com/removerdetalhe/";
  

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
                console.log(response.data)
                if(response.data){
                    alert("Usuário pode editar este artigo");
                    setPermit(true);
                }else{
                    console.log("error ao verificar");    
                }
            }).catch(error=> {
              // console.log("Erro " + error);
            })            
        } catch (error) {
            // console.log("Erro " + error);
        }
    }

    const artigoDetalheRemover = async(id)=>{        

        try {
            console.log("tentando selecionar participantes id dos artigo");
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

    const baseUrl ="https://tcc-spring-back-end.herokuapp.com/artigo/artigodettalhe";
    const baseUrlExterno ="https://tcc-spring-back-end.herokuapp.com/artigo/artigodettalhe";
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
        <div>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1> Detalhes do artigo {id} </h1>
                        </div>
                    </div>
                </div>                
            </section>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                    </div>                    
                    
                    {artigos.map(({ codigo, codArtigo, titulo, descricao, fotoPublicacao }) => (
                        <tr key={codigo}>
                            <article>
                                <div className="row">                                    
                                    <div className="col">
                                        <div className="informacoes" style={{height: '60%', width: "60%"}}>
                                            {(!efeito)  && (fotoPublicacao) ? null  : decodifImagem(fotoPublicacao, codigo)}
                                            <img style={{ marginLeft: "5%", width: "90%", height: "95%" }} src={imageUrl[codImagem.indexOf(codigo)]} />
                                        </div>                                    
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "-12%"}}>
                                    <div className="col">
                                        <div className="textoDetalhe">
                                            <p> {titulo} </p>
                                            <b/>
                                            <p> {descricao} </p>
                                            {permit  
                                                ? <p><button onClick={() => {artigoDetalheRemover(codigo) }} className="btn btn-link link-dark text-decoration-none"><FaTrash color="black" /></button></p>
                                                : <h1></h1>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </tr>                        
                    ))}




             
                </div>
            </section>
        
            <section>
                <div className="btn-fim-editar">
                    {permit  
                        ? <Link to={`/DetalheArtigoEditar/${id}`}  className="btn btn"> Editar esta publicação: {id}</Link>
                        : <p>Sem permissões</p>
                    }
                </div>
            </section>
            
        </div>        
    );    
}

export default Detalhe;