import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logoCad from './assets/iconepc.png';
import Rotas from './componentes/rotas';
function App() {

  const baseUrl ="https://localhost:44390/api/Produtos";

  const [data, setData]=useState([]);

  const pedidoGet = async()=>{
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error=> {
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  })


  return (
    <div className="App">
      <header className="App-header">
          <h3> Learn React </h3>          
            <img src={logoCad} alt='Cadastro' />
          <button className="btn btn-success"> Gravar produto</button>
      </header>
      <div className="container">

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>NOME</th> <th>Quantidade</th> <th>VALOR</th> <th>OPÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {data.map(produto=> (
                  <tr key={produto.id}>
                <td> {produto.nome }</td>
                <td> {produto.quantidade }</td>
                <td> {produto.valor}</td>    
                <td> {produto.opcao}</td>
              <td>
                <button class="btn btn-success">
                  Editar
                </button>
                <button class="btn btn-danger">
                  Deletar
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
