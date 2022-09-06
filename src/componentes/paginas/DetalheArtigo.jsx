import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../estilos/Detal.css';

function Detalhe(){
    
    const { id } = useParams();
    const [permit, setPermit]=useState(null);
    const userUrl ="http://45.191.187.35:3033/selusuario/";
    const baseUrlArtigoDetal ="http://localhost:3033/artigo/removerdetalhe/";
  

    async function verificaParticipante() {        
        try {
            const formData = new FormData();
            formData.append('idArtigo', id);
            await axios.post('http://localhost:3033/verificaparticipante/', formData, 
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
                    console.log("error ao publicar");    
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
            console.log("tentando selecionar participantes id dos artigo");
            const formData = new FormData();
            formData.append('idArtigo', id);

            await axios.post(baseUrlArtigoDetal, formData, 
            { headers: {          
                Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
            }
            })
            .then(async response => {
              if(response.data){
                alert("Removido com sucesso !");
              }
            }).catch(error=> {
              console.log(error);
            })
                       
        } catch (error) {
            console.log(error);
        }
      } 

    const baseUrl ="http://localhost:3033/artigo/artigodettalhe";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigodettalhe";

    const formData = new FormData();
    formData.append('idArtigo', id);
    const [artigos, setArtigos]=useState([]);
    const [imageUrl, setImageUrl] = useState([null]); 
    const [codImagem, setCodImagem] = useState([null]); 
    const [efeito, setEfeito] = useState(false); 
    
    const detalhrGet = async()=>{        
      await axios.post(baseUrl, formData)
      .then(response => {
        setArtigos(response.data);
      }).catch(error=> {
        console.log(error);
      })
    }

    useEffect(async ()=>{
        if(artigos.length > 0)
            return;
        
        await detalhrGet();  
        setEfeito(true);
        verificaParticipante();
      }, [])

      function decodifImagem(imagem, codigo){
        // Se ja existe um indice para a imagem entao apenas retorna
        if ((codImagem.indexOf(codigo) > 0) || (imagem == undefined)) {
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
                        <h1> Detalhe do artigo Cabecalho </h1>
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
                                        <div className="informacoes" style={{height: '250px'}}>
                                            {(codImagem.indexOf(codigo) > 0) && (!efeito)  && (fotoPublicacao) ? null  : decodifImagem(fotoPublicacao, codigo)}
                                            <img style={{ width: "95%", height: "85%" }} src={imageUrl[codImagem.indexOf(codigo)]} />
                                        </div>                                    
                                    </div>
                                    <div className="col-md-6">
                                        <div className="textoDetalhe">
                                            <p> Título: {titulo}  </p>
                                            <p> Descrição: {descricao} </p>
                                            <p><button onClick={artigoDetalheRemover(0)}>Remover</button></p>
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
                        : <h1>Sem permissões</h1>
                    }
                </div>
            </section>
            
        </div>        
    );    
}

export default Detalhe;