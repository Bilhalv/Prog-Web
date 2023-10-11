import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export var carros = []
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
    handleClose(); // Fechar o modal após submissão
  };

  return (
    <div>
      <IconButton color="error" onClick={handleOpen}>
        <PlusIcon />
      </IconButton>
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

              <button type="submit" className="bg-secundaria px-4 py-2 rounded">
                Adicionar Carro
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
