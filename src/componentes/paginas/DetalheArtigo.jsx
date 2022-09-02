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

    const usuarioGet = async()=>{        
        if((permit == null) && (localStorage.getItem('tokens') != null)){            
            await axios.get(userUrl, 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(response => {                          
            if (response.data.login != null){
                console.log('existe usuario pode editar '+response.data.login);
                setPermit(true);
            }else{
                alert("Não existe usuário cadastrado para este login.")                
            }
            
            }).catch(error=> {
                console.log(error);
            })
        }
    }

    const baseUrl ="http://localhost:3033/artigo/artigodettalhe";
    const baseUrlExterno ="http://45.191.187.35:3033/artigo/artigodettalhe";

    const formData = new FormData();
    formData.append('idArtigo', id);
    const [artigos, setArtigos]=useState([]);
    const [imageUrl, setImageUrl] = useState([]);  
    
    const detalhrGet = async()=>{        
      await axios.post(baseUrl, formData)
      .then(response => {
        
        response.data.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                if (key == 'fotoPublicacao'){
                    setImageUrl('data:image/jpeg;base64,' + value)    
                }
                console.log(`${key} ${value}`);
            });
            console.log('-------------------');
        });

        setArtigos(response.data);
      }).catch(error=> {
        console.log(error);
      })
    }

    useEffect(()=>{
        usuarioGet();
        detalhrGet();        
      }, [])

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
                    
                    {artigos.map(({ codArtigo, titulo, descricao, imagem }, codigo) => (
                        <tr key={codigo}>
                            <article>
                                <div className="row">                                    
                                    <div className="col">
                                        <div className="informacoes" style={{height: '250px'}}>
                                            <img style={{ width: "95%", height: "85%" }} src={imageUrl} />
                                        </div>                                    
                                    </div>
                                    <div className="col-md-6">
                                        <div className="textoDetalhe">
                                            <p> Título: {titulo}  </p>
                                            <p> Descrição: {descricao} </p>
                                            <p><Link to={`/DetalheArtigo/${codArtigo}`}  className="btn btn"> Ver: {codArtigo}</Link></p>
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