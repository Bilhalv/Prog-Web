import React from "react";

export default function Card({ titulo, text, lista}) {
  return (
    <>
      <div className="w-[540px] bg-principal my-6 rounded-xl px-6 py-2 mx-auto shadow-md">
        <h1 className="text-center py-4 text-xl text-white">{titulo}</h1>
        <p className="text-white">{text}</p>
        {lista.map((item, index) => {
          return (
            <div key={index} className="flex justify-between text-white">
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
