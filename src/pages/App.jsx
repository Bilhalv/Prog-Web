import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { Filter, InfoIcon, PlusIcon, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
export var roteiros = [];

function FilterModal({ open, handleClose, handleFilter }) {
  const { register, handleSubmit } = useForm();

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
              <label className="block mb-1">destino:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                {...register("destino", { required: false })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">data:</label>
              <input
                className="border p-5 w-full bg-secundaria rounded"
                type="date"
                {...register("data", { required: false })}
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

function InfoModal({ open, handleClose, selectedRoteiro }) {
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
        <div className="w-full text-white">
          <h1>Atrações</h1>
          {selectedRoteiro && selectedRoteiro.atracoes ? (
            <p>{selectedRoteiro.atracoes}</p>
          ) : (
            <p>Atrações not available.</p>
          )}
        </div>
      </Box>
    </Modal>
  );
}

function EditarModal({
  open,
  handleClose,
  selectedRoteiro,
  handleUpdatePrice,
}) {
  const [newPrice, setNewPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (newPrice) {
      handleUpdatePrice(newPrice);
      handleClose();
    }
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
          <form onSubmit={handleSubmit}>
            <label>Trocar o preço</label>
            <input
              type="number"
              placeholder={selectedRoteiro.preco}
              className="border p-5 w-full bg-secundaria rounded"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
            <button type="submit">Trocar</button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}

function App() {
  let totalroteiros = JSON.parse(localStorage.getItem("roteiros"));
  useEffect(() => {
    if (!totalroteiros) {
      localStorage.setItem("roteiros", JSON.stringify([]));
    }
  }, [totalroteiros]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setroteirosFiltrados(roteirosFiltrados);  
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [infoAberto, setinfoAberto] = useState(false);
  const [roteirosFiltrados, setroteirosFiltrados] = useState(totalroteiros);

  const handleFiltroOpen = () => setFiltroAberto(true);
  const handleFiltroClose = () => setFiltroAberto(false);
  const handleinfoOpen = (item) => {
    setSelectedRoteiro(item);
    setinfoAberto(true);
  };

  const handleinfoClose = () => setinfoAberto(false);
  const [editarAberta, seteditarAberta] = useState(false);
  const handleeditarClose = () => seteditarAberta(false);
  const [selectedRoteiro, setSelectedRoteiro] = useState("");
  const [precoToChange, setPrecoToChange] = useState("");

  const handleeditarOpen = (item, preco) => {
    setSelectedRoteiro(item);
    setPrecoToChange(preco);
    seteditarAberta(true);
  };

  const handleUpdatePrice = (newPrice) => {
    if (selectedRoteiro) {
      const updatedRoteiros = totalroteiros.map((item) => {
        if (item.destino === selectedRoteiro.destino) {
          item.preco = newPrice;
        }
        return item;
      });
      localStorage.setItem("roteiros", JSON.stringify(updatedRoteiros));
      setroteirosFiltrados(updatedRoteiros);
      setSelectedRoteiro({ ...selectedRoteiro, preco: newPrice });
    }
  };

  const handleFilter = (data) => {
    const filteredCars = totalroteiros.filter((roteiro) => {
      if (data.verTodos === true) {
        return true;
      } else {
        if (data.destino !== "" && roteiro.destino !== data.destino) {
          return false;
        }
        if (data.data !== "" && roteiro.data !== data.data) {
          return false;
        }
        if (data.precoMin !== "" && +roteiro.preco < +data.precoMin) {
          return false;
        }
        if (data.precoMax !== "" && +roteiro.preco > +data.precoMax) {
          return false;
        }
        console.log(roteiro);
        return true;
      }
    });
    console.log(filteredCars);
    setroteirosFiltrados([...filteredCars]);
    console.log(roteirosFiltrados);
  };
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    roteiros = [
      {
        destino: data.destino,
        data: data.data,
        duracao: data.duracao,
        preco: data.preco,
        foto: data.foto,
        atracoes: data.atracoes,
      },
    ];
    if (roteirosFiltrados) {
      roteirosFiltrados.push(roteiros[0]);
      localStorage.setItem("roteiros", JSON.stringify(roteirosFiltrados));
    } else {
      localStorage.setItem("roteiros", JSON.stringify(roteiros));
    }
    handleClose();
  };
  return (
    <main className="bg-gray-500 h-screen">
      <Navbar titulo={"Projetos atuais"} logo={""} />
      <Card
        titulo={"Opção 2"}
        text={"Data de Entrega: 24/10"}
        lista={[
          "- Desenvolver um cadastro de roteiros de viagens para uma agência de turismo, com as opções de incluir, consultar e excluir roteiros (usando janela Modal e lista de dados com os atributos: Destino, Data, Duração, Preço, Atrações e Foto). O atributo atrações não deve ser exibido na listagem, apenas quando o usuário clicar no botão consultar (ver detalhes).",
          "- Acrescentar um campo de filtro (a escolha do aluno) e os botões Filtrar e Ver Todos.",
          "- Acrescentar um botão para alterar o preço de determinada viagem. Acrescentar um botão Alterar em cada viagem da lista e quando este botão for clicado solicitar (via prompt ou SweetAlert2) o novo preço desta viagem",
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
          </div>
          <div>
            <div className="flex-col justify-center">
              {roteirosFiltrados &&
                Array.isArray(roteirosFiltrados) &&
                roteirosFiltrados.map((item, index) => {
                  return (
                    <div key={index} className="rounded p-3 bg-secundaria m-3">
                      <h1 className="text-center text-lg">{item.destino}</h1>
                      <img src={item.foto} className="w-full" />
                      <ul className="flex-col flex justify-evenly items-center">
                        <td className="italic">Data: {item.data}</td>
                        <td className="italic">Duração: {item.duracao}</td>
                        <td className="italic">
                          Preço: R$ {(+item.preco).toFixed(2)}
                          <IconButton
                            color="secondary"
                            onClick={() => handleeditarOpen(item, item.preco)}
                          >
                            <Settings />
                          </IconButton>
                        </td>
                        <IconButton
                          color="secondary"
                          onClick={() => handleinfoOpen(item)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </ul>
                    </div>
                  );
                })}
            </div>
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
                    <label className="block mb-1">Destino:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("destino", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Data:</label>
                    <input
                      type="date"
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("data", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Duração:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("duracao", { required: true })}
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
                      {...register("foto", { required: true })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1">Atrações:</label>
                    <input
                      className="border p-5 w-full bg-secundaria rounded"
                      {...register("atracoes", { required: true })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-secundaria px-4 py-2 rounded"
                  >
                    Adicionar roteiro de viagem
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
      <InfoModal
        open={infoAberto}
        handleClose={handleinfoClose}
        selectedRoteiro={selectedRoteiro}
      />
      <EditarModal
        open={editarAberta}
        handleClose={handleeditarClose}
        selectedRoteiro={selectedRoteiro}
        precoToChange={precoToChange}
        handleUpdatePrice={handleUpdatePrice}
      />
    </main>
  );
}

export default App;
