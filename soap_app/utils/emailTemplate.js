
const getTemplate = (token = 'exampleToken', idSesion = 'exampleSession', valor = 0) => {
    const emailTemplate = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Información de Compra</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #007BFF;
            text-align: center;
        }
        p {
            margin: 10px 0;
        }
        .info {
            font-weight: bold;
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 5px;
            margin: 10px 0;
        }
        
    </style>
</head>
<body>
    <div class="container">
        <h1>Información de Compra</h1>
        <p>Querido cliente, para completar su compra necesitará la siguiente información:</p>
        <div class="info">
            <p><strong>idSesion:</strong> ${idSesion}</p>
            <p><strong>Token:</strong> ${token}</p>
            <p><strong>Valor:</strong> ${valor}</p>
        </div>
        <p>No olvide esta información, gracias.</p>
       
    </div>
</body>
</html>
`;

    return emailTemplate;
}

module.exports = getTemplate;