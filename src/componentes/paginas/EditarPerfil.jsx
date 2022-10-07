import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import '../estilos/EditarPerfil.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../servicos/api'
import Button from '@material-ui/core/Button';

function Perfil(){
    const baseUrlHeroku ="https://tcc-spring-back-end.herokuapp.com/salvausuario";
    const baseUrlHerokuft ="https://tcc-spring-back-end.herokuapp.com/postaFt";

    const [selectedImage, setSelectedImage] = useState(null); 
    const history = useHistory();        
    const [imageUrl, setImageUrl] = useState(null);

    const formData = new FormData();
    
    // Modelo do usuario a ser salvo
    const [usuariolog, setUsuariolog]=useState(
        {
          codigo: 0,
          nomeCompleto: '',
          bio: '',
          curso: '',
          descricao: '',
          observacao: '',
          grau: ''
        }
    );
    useEffect(async () => {
        selecionaUsuario();        

        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));                        
        }

        if (usuariolog && (imageUrl == null)) {
            console.log('definindo imagem')
            setImageUrl('data:image/jpeg;base64,' + usuariolog.fotoPerfil)
        }
      }, [selectedImage]);


      const selecionaUsuario = async()=>{        
        if(!imageUrl && (localStorage.getItem('tokens') != null)){            
            await api.get("https://tcc-spring-back-end.herokuapp.com/selusuario", 
            {          
                headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                }
            }
            )
            .then(async response => {                          
            // console.log(response.data);
            if (response.data.login != null){
                console.log('edicao perf.. usuario setado  ');
                setUsuariolog(response.data)
                console.log(response.data.fotoPerfil)
                setImageUrl('data:image/jpeg;base64,' + response.data.fotoPerfil)
            }            
            }).catch(error=> {
                console.log(error);
            })
        }
    }       

    
    const handleChange = e=> 
    {
        // Montar objeto usuario
        const {name, value}=e.target;
        setUsuariolog(
        {
            ...usuariolog,
            [name]: value
        });        
    }  

        // codigo para postar foto inicio
        function postarFoto () {
            if (!selectedImage) {
                return
            }
    
            const formData = new FormData();
            formData.append('image', selectedImage);
            api.post(baseUrlHerokuft, formData,
                {          
                    headers: {          
                        Authorization: 'Bearer ' + localStorage.getItem('tokens').toString()            
                    }
                })
                .then(res => {
                        alert("Imagem salva com sucesso.")
                })
        };
        // fim postar foto  
    
    async function usuarioEdita(){                

        try {
            await api.post(baseUrlHeroku, usuariolog, 
                { headers: {          
                    Authorization: 'Bearer ' + localStorage.getItem('tokens').toString() 
                }
                })        
            .then(async response => {
              if(response.data){
                postarFoto();
                history.push('/');
              }else{
                console.log("error ao cadastrar usuario");    
              }
            }).catch(error=> {
              console.log(error);
            })            
        } catch (error) {
            console.log(error);
        }
    }   
      

    return(
        <div className='editar-perfil'>
            <div className="cabecalho-perfil">
                <h1>Perfil usuário </h1>
            </div>
            <div className="foto-perfil">
                {imageUrl? <img style={{ width: "90%", height: "85%", margin: "10px"}} src={imageUrl} /> : null}
            </div>                   
            <div>
                <div className="informacoes-perfil-editar">
                    <div className="row">
                        <div className="col">
                            <h2>Nome: </h2>
                            <input type="text" name="nomeCompleto" value={usuariolog.nomeCompleto} onChange={handleChange} />
                        </div>
                    </div>                    
                        <div className="row">
                            <div className="col">
                                <h2>Bio:  </h2>
                                <input type="text" name="bio" value={usuariolog.bio} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Descrição:  </h2>
                                <input type="text" name="descricao" value={usuariolog.descricao} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Curso:  </h2>
                                <select style={{marginLeft: "50px"}} name='curso' onChange={handleChange}>
                                    <option value="">Selecione o curso </option>
                                    <option value="comp">Eng. Computação </option>
                                    <option value="elet">Eng. Eletrica </option>
                                    <option value="prod">Eng. Produção </option>
                                    <option value="meca">Eng. Mecanica </option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <h2>Observação:  </h2>
                                <input type="text" name="observacao" value={usuariolog.observacao} onChange={handleChange} />
                            </div>
                        </div>                
                        <div className="row">
                            <div className="col">
                                <div className="contato">
                                    <h2>contato: </h2>
                                    <input type="text" name="grau" value={usuariolog.contato} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: '3%'}}>
                            <div className="col">
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: 'none' }}
                                    onChange={e => setSelectedImage(e.target.files[0])}/>
                                <label htmlFor="select-image">
                                    <Button variant="contained" size='small' color="secondary" component="span" style={{width: '120px', height: '35px'}}>
                                        Buscar foto
                                    </Button>
                                </label>                                                        
                            </div>
                            <div className="col">
                                <button style={{width: '120px', height: '35px'}} className='btn btn-secondary' onClick={()=> usuarioEdita()} >Salvar</button>
                            </div>                            
                        </div>
                    </div>
            </div>            
        </div>
    );    
}


export default Perfil;
