const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Para procesar JSON en el body

app.get("/calculadora", (req, res) => {
    const { num1, num2, operacion } = req.query;

    if (!num1 || !num2 || !operacion) {
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
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
                return res.status(400).json({ error: "No se puede dividir por 0" });
            }
            resultado = n1 / n2;
            break;
        default:
            return res.status(400).json({ error: "Operación inválida" });
    }

    res.json({ resultado });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
