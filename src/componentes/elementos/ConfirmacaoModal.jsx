import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

function ConfirmacaoModal(props){  
    return(        
        <div>
            <div className="dialogo">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{marginTop: '5%'}}>
                        <div className="modal-header d-flex justify-content-center">
                            <h5 className="modal-title">Sair do usuário logado</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" hidden="true">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <p> Tem certeza que deseja sair </p>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                        <Link to="/" className="btn btn-primary" style={{margin: '20px', width: '100px'}}>Fechar</Link>
                            <Link to="/Login" className="btn btn-primary" style={{margin: '20px', width: '100px'}}>Confirmar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
    
}


export default ConfirmacaoModal;