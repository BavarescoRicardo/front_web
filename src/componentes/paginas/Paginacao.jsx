import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../estilos/search-filter.css"


function Paginacao(props){
    return(        
        <nav style={{backgroundColor: 'whitesmoke', padding: '0', maxWidth: '10%', marginLeft: 'auto', marginRight: 'auto'}}>
        <ul className="pagination pagination-sm" style={{backgroundColor: 'whitesmoke', margin: '2px', maxWidth: '90%', marginRight: '1%'}}>
            <li className="page-item disabled">
                <a className="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            {
                // Divide a contagem pelo numero de artigos por pagina
                [...Array(Math.floor(props.contagem/3))].map(
                    (e, i) => 
                        <li>
                            <a className="page-link" href="#" onClick={() => props.setPagina(i)}>{i+1}</a>
                        </li>
                )
            }

            <li className="page-item">                        
                <a className="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
    );    
}

export default Paginacao;
