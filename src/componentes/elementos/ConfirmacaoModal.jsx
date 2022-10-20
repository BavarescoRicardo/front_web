import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

function ConfirmacaoModal(props){  
    return(        
        <div>
            <div  role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Sair do usuário logado</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" hidden="true">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Tem certeza que deseja sair</p>
                        </div>
                        <div className="modal-footer">
                        <Link to="/" className="btn btn-primary">Fechar</Link>
                            <Link to="/Login" className="btn btn-primary">Confirmar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
    
}


export default ConfirmacaoModal;