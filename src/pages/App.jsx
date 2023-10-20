import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { BarChart3, Filter, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
export var carros = [];
// aaa

function FilterModal({ open, handleClose, handleFilter }) {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    handleFilter(data);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          backgroundColor: "#230046",
        }}
      >
        <div className="p-10 w-full">
          <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-1">Modelo:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                {...register("modelo", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Marca:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                {...register("marca", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ano Mínimo:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="number"
                {...register("anoMin", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ano Máximo:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="number"
                {...register("anoMax", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Preço Mínimo:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="number"
                {...register("precoMin", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Preço Máximo:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="number"
                {...register("precoMax", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ver Todos</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="checkbox"
                {...register("verTodos", { required: false })}
              />
            </div>
            <button type="submit" className="bg-secundaria px-4 py-2 rounded">
              Filtrar
            </button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

function EstatisticaModal({ open, handleClose }) {
  let totalcarros = JSON.parse(localStorage.getItem("carros"));
  if (!totalcarros) {
    totalcarros = [];
  }
  let maiorPreco = 0;
  let maiorPrecoModelo = "";
  let media = 0;
  let precos = totalcarros.map((carro) => carro.preco);
  if (totalcarros.length !== 0) {
    maiorPreco = Math.max(...precos);
    maiorPrecoModelo = totalcarros.filter(
      (carro) => carro.preco == maiorPreco
    )[0].modelo;
    media = precos.reduce((a, b) => a + +b, 0) / precos.length;
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          backgroundColor: "#230046",
        }}
      >
        <div className="p-10 w-full text-white">
          <h2>Numero de veiculos cadastrados: {precos.length}</h2>
          <h2>Preço médio dos veículos: R${media.toFixed(2)}</h2>
          <h2>
            Preço do veículo de maior valor e o modelo: {maiorPrecoModelo} por
            R${maiorPreco.toFixed(2)}
          </h2>
        </div>
      </Box>
    </Modal>
  );
}

function App() {
  let totalcarros = JSON.parse(localStorage.getItem("carros"));
  useEffect(() => {
    if (!totalcarros) {
      localStorage.setItem("carros", JSON.stringify([]));
    }
  }, [totalcarros]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [carrosFiltrados, setCarrosFiltrados] = useState(
    totalcarros
  );

  const handleFiltroOpen = () => setFiltroAberto(true);
  const handleFiltroClose = () => setFiltroAberto(false);
  const [estatisticaAberta, setEstatisticaAberta] = useState(false);
  const handleEstatisticaOpen = () => setEstatisticaAberta(true);
  const handleEstatisticaClose = () => setEstatisticaAberta(false);

  const handleFilter = (data) => {
    const filteredCars = totalcarros.filter((carro) => {
      if (data.verTodos === true) {
        return true;
      } else {
        if (data.modelo !== "" && carro.modelo !== data.modelo) {
          return false;
        }
        if (data.marca !== "" && carro.marca !== data.marca) {
          return false;
        }
        if (data.anoMin !== "" && +carro.ano < +data.anoMin) {
          return false;
        }
        if (data.anoMax !== "" && +carro.ano > +data.anoMax) {
          return false;
        }
        if (data.precoMin !== "" && +carro.preco < +data.precoMin) {
          return false;
        }
        if (data.precoMax !== "" && +carro.preco > +data.precoMax) {
          return false;
        }
        console.log(carro);
        return true;
      }
    });
    console.log(filteredCars);
    setCarrosFiltrados([...filteredCars]);
    console.log(carrosFiltrados);
  };
  const {
    register,
    handleSubmit,
  } = useForm();

  let currentcarros = JSON.parse(localStorage.getItem("carros"));

  const onSubmit = (data) => {
    carros = [
      {
        modelo: data.modelo,
        marca: data.marca,
        ano: data.ano,
        preco: data.preco,
        foto: data.foto,
      },
    ];
    console.log(carros);
    if (currentcarros) {
      currentcarros.push(carros[0]);
      localStorage.setItem("carros", JSON.stringify(currentcarros));
    } else {
      localStorage.setItem("carros", JSON.stringify(carros));
    }
    handleClose();
  };
  return (
    <main className="bg-gray-500 h-screen">
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
      <div className="w-[75%] bg-principal my-6 rounded-xl px-6 py-6 mx-auto shadow-md text-white flex-col">
        <div>
          <div className="flex justify-center">
            <IconButton color="success" onClick={handleOpen}>
              <PlusIcon />
            </IconButton>
            <IconButton color="info" onClick={handleFiltroOpen}>
              <Filter />
            </IconButton>
            <IconButton color="secondary" onClick={handleEstatisticaOpen}>
              <BarChart3 />
            </IconButton>
          </div>
          <div>
            <table className="w-full">
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
                {carrosFiltrados &&
                  Array.isArray(carrosFiltrados) &&
                  carrosFiltrados.map((item, index) => {
                    let color = "bg-principal";
                    if (index % 2 === 0) {
                      color = "bg-secundaria";
                    }
                    return (
                      <tr key={index} className={color}>
                        <td className="border px-4 py-2">{item.modelo}</td>
                        <td className="border px-4 py-2">{item.marca}</td>
                        <td className="border px-4 py-2">{item.ano}</td>
                        <td className="border px-4 py-2">
                          R$ {(+item.preco).toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">
                          <img src={item.foto} style={{ height: "50px" }} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                backgroundColor: "#230046",
              }}
            >
              <div className="p-10">
                <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block mb-1">Modelo:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("modelo", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Marca:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("marca", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Ano:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      type="number"
                      {...register("ano", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Preço:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      type="number"
                      {...register("preco", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Foto:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      type="text"
                      {...register("foto", { required: true })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-secundaria px-4 py-2 rounded"
                  >
                    Adicionar Carro
                  </button>
                </form>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <FilterModal
        open={filtroAberto}
        handleClose={handleFiltroClose}
        handleFilter={handleFilter}
      />
      <EstatisticaModal
        open={estatisticaAberta}
        handleClose={handleEstatisticaClose}
      />
    </main>
  );
}

export default App;
