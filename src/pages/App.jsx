import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import BasicModal from "../components/Form";
import { carros } from "../components/Form";

function App() {
  let totalcarros = [];
  totalcarros.push(carros);


  return (
    <main>
      <Navbar titulo={"Projetos atuais"} logo={""} />
      <div>
        <ul>
          {totalcarros.map((item, index) => {
            return (
              <div key={index} className="flex justify-between text-white">
                <p>{item.modelo}</p>
                <p>{item.marca}</p>
                <p>{item.ano}</p>
                <p>{item.preco}</p>
                <p>{item.foto}</p>
              </div>
            );
          })}
        </ul>
      </div>
      <Card
        titulo={"Enunciado"}
        text={"Data de Entrega: 24/10"}
        lista={[
          "- Fazer um cadastro de veículos para uma revenda, semelhante ao cadastro de pizzas (usando Modal, lista de dados com os atributos: Modelo, Marca, Ano, Preço e Foto).",
          "- Acrescentar um campo de filtro (a escolha do aluno, pode ser por modelo, marca, limite de ano, limite (inferior e/ou superior) de preço) e os botões Filtrar e Ver Todos.",
          "- Acrescentar um botão de Estatística que deve exibir em uma nova janela modal ou sweetAlert2 o número de veículos cadastrados, preço médio dos veículos e o modelo e preço do veículo de maior valor.",
        ]}
      />
      <div className="w-[75%] bg-principal my-6 rounded-xl px-6 py-2 mx-auto shadow-md text-white">
        <BasicModal/>
      </div>
    </main>
  );
}

export default App;
