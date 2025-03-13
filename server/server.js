const express = require('express');
const app = express();

// Ruta con 3 query parameters (a, b, op)
app.get('/calculadora', (req, res) => {
    const { a, b, op } = req.query;

    // Convertir a números
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    // Verificar si los valores son válidos
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Error: Debes ingresar valores numéricos.');
    }

    let resultado;

    switch (op) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicacion':
            resultado = num1 * num2;
            break;
        case 'division':
            if (num2 === 0) return res.status(400).send('Error: División por cero.');
            resultado = num1 / num2;
            break;
        default:
            return res.status(400).send('Error: Operación no válida. Usa "suma", "resta", "multiplicacion" o "division".');
    }

    res.send(`Resultado: ${resultado}`);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
