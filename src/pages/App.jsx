import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import BasicModal from "../components/Form";

function App() {
  let totalcarros = JSON.parse(localStorage.getItem("carros"));

  useEffect(() => {
    if (!totalcarros) {
      localStorage.setItem("carros", JSON.stringify([]));
    }
  }, [totalcarros]); 

  return (
    <main className="bg-gray-500">
      <Navbar titulo={"Projetos atuais"} logo={""} />
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
        <BasicModal />
      </div>
      <div>
        <table className="table-auto w-[75%] mx-auto text-white bg-principal">
          <thead>
            <tr>
              <th className="px-4 py-2">Modelo</th>
              <th className="px-4 py-2">Marca</th>
              <th className="px-4 py-2">Ano</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Foto</th>
            </tr>
          </thead>
          <tbody>
            {totalcarros &&
              Array.isArray(totalcarros) &&
              totalcarros.map((item, index) => {
                let color = "bg-principal";
                if (index % 2 === 0) {
                  color = "bg-secundaria";
                }
                return (
                  <tr key={index} className={color}>
                    <td className="border px-4 py-2">{item.modelo}</td>
                    <td className="border px-4 py-2">{item.marca}</td>
                    <td className="border px-4 py-2">{item.ano}</td>
                    <td className="border px-4 py-2">{item.preco}</td>
                    <td className="border px-4 py-2">
                      <img src={item.img} alt="carro" />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
