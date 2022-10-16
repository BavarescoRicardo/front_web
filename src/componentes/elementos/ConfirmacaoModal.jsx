import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

function ConfirmacaoModal(props){  
    return(        
        <div>
            <div  role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Sair do usuário logado</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Tem certeza que deseja sair</p>
                        </div>
                        <div class="modal-footer">
                        <Link to="/" class="btn btn-primary">Fechar</Link>
                            <Link to="/Login" class="btn btn-primary">Confirmar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
    
}


export default ConfirmacaoModal;