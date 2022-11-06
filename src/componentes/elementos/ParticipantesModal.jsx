import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom'

function ParticipantesModal(props){  

    const handleClose = () => props.setShow(false);
    const handleShow = () => props.setShow(true);

    return(        
        <div>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Participantes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.users.map((nome) =>  <li> <Link to="/Perfil" className="nav-link" style={{color: '#4f7279'}}>{nome} </Link> </li>)}                
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </div>
    );    
    
}


export default ParticipantesModal;