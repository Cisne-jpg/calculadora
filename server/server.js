const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Permite llamadas desde el front de Next.js
app.use(cors());

// Endpoint para /calculadora con query parameters
// Ejemplo: http://localhost:3001/calculadora?num1=2&num2=3&operacion=suma
app.get("/calculadora", (req, res) => {
  const { num1, num2, operacion } = req.query;

  // Validar que los parámetros existan
  if (!num1 || !num2 || !operacion) {
    return res.status(400).json({ error: "Faltan parámetros (num1, num2, operacion)." });
  }

  // Convertir a número
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  // Validar que sean números
  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Los parámetros deben ser numéricos." });
  }

  let resultado;

  switch (operacion) {
    case "suma":
      resultado = n1 + n2;
      break;
    case "resta":
      resultado = n1 - n2;
      break;
    case "multiplicacion":
      resultado = n1 * n2;
      break;
    case "division":
      if (n2 === 0) {
        return res.status(400).json({ error: "No se puede dividir por 0." });
      }
      resultado = n1 / n2;
      break;
    default:
      return res.status(400).json({ error: "Operación inválida (usa suma, resta, multiplicacion o division)." });
  }

  return res.json({ resultado });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
