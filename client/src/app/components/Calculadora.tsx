"use client";

import { useState } from "react";

export default function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operacion, setOperacion] = useState("suma");
  const [resultado, setResultado] = useState<string | null>(null);

  const calcular = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/calculadora?num1=${num1}&num2=${num2}&operacion=${operacion}`
      );
      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setResultado(null);
      } else {
        setResultado(data.resultado.toString());
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
      setResultado(null);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Calculadora</h2>
      
      {/* Contenedor de inputs y select */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <input
          type="number"
          placeholder="Número 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="w-1/3 border border-gray-400 p-2 rounded text-lg text-gray-900 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={operacion}
          onChange={(e) => setOperacion(e.target.value)}
          className="w-1/3 border border-gray-400 p-2 rounded text-lg text-gray-900 focus:ring-2 focus:ring-blue-400"
        >
          <option value="suma">➕</option>
          <option value="resta">➖</option>
          <option value="multiplicacion">✖</option>
          <option value="division">➗</option>
        </select>

        <input
          type="number"
          placeholder="Número 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="w-1/3 border border-gray-400 p-2 rounded text-lg text-gray-900 focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Botón calcular */}
      <button
        onClick={calcular}
        className="w-full bg-blue-500 text-white p-3 rounded text-lg font-semibold hover:bg-blue-600 transition"
      >
        Calcular
      </button>

      {/* Resultado */}
      {resultado !== null && (
        <div className="mt-4 p-3 bg-gray-200 text-center text-lg font-bold text-gray-900 rounded">
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
}
