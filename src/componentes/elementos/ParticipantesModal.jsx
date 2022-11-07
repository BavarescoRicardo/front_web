import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'

function ParticipantesModal(props){  

    const handleClose = () => props.setShow(false);

    useEffect(async ()=>{            

    }, []); 

    return(        
        <div>
            <Modal show={props.show} onHide={() => handleClose()}>
                <Modal.Header closeButton>
                <Modal.Title>Participantes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {console.log(props.users.map((e) => e.nomeCompleto))} */}
                    {props.users.map((nome) =>  <li> <Link to={{ pathname: `/PerfilUsuario`, state: {idUsuario: nome.codigo} }} className="nav-link" style={{color: '#4f7279'}}>{nome.codigo}: {nome.nomeCompleto}</Link> </li>)}
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );    
    
}


export default ParticipantesModal;