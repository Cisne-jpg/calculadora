"use client";
import { useState } from "react";


export default function Calculadora() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operacion, setOperacion] = useState("suma");
  const [resultado, setResultado] = useState<string | null>(null);

  const calcular = async () => {
    const res = await fetch(
      `http://localhost:3000/calculadora?num1=${num1}&num2=${num2}&operacion=${operacion}`
    );
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      setResultado(null);
    } else {
      setResultado(data.resultado);
    }
  };

  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-md w-96 mx-auto">
      <h2 className="text-xl font-bold text-center">Calculadora</h2>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Número 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={operacion}
          onChange={(e) => setOperacion(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="suma">+</option>
          <option value="resta">-</option>
          <option value="multiplicacion">×</option>
          <option value="division">÷</option>
        </select>
        <input
          type="number"
          placeholder="Número 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <button
        onClick={calcular}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Calcular
      </button>
      {resultado !== null && (
        <div className="text-center font-bold text-lg">
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
}
