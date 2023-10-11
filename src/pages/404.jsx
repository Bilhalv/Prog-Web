import React from "react";
import { Link } from "react-router-dom";

export default function NaoEncontrado() {
  return (
    <div className="flex flex-col items-center gap-6 justify-center h-screen">
      <h1 className="text-8xl">404</h1>
      <p className="text-3xl">Página não encontrada</p>
      <Link to={"/"} className="text-blue-800 underline">
        Clique aqui para voltar
      </Link>
    </div>
  );
}
