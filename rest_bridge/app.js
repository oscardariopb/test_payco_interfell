const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();
const PORT = 3003;

// Middleware para parsear JSON en las peticiones
app.use(bodyParser.json());

// URL del servicio SOAP (cambia esto por la URL real de tu WSDL)
const WSDL_URL = 'http://localhost:3000/soap?wsdl';

// Endpoint REST para obtener información de un cliente
app.post('/getWallet', async (req, res) => {
    const { celular, documento } = req.body;
    console.log("llego ", req.body);
    if (!celular || celular === "" && !documento || documento === "") {
        return res.status(400).json({ error: 'customerId es requerido' });
    }

    try {
        // Crear un cliente SOAP
        const client = await soap.createClientAsync(WSDL_URL);

        // Llamar al método SOAP con los argumentos necesarios
        const [walletInfo] = await client.getWalletAsync({ celular, documento });
        console.log(walletInfo);
         
        // Enviar la respuesta al cliente
        res.json(walletInfo);
    } catch (error) {
        console.error('Error al consumir el servicio SOAP:', error);
        res.status(500).json({ error: 'Error al consumir el servicio SOAP', details: error.message });
    }
});

app.post('/createClient', async (req, res) => {
    const { documento, nombres, email, celular } = req.body;

    if (!celular || !documento || !email || !nombres) {
        return res.status(400).json(
            { error: 'Información incompleta es requerido los campos: documento, nombres, email, celular' }
        );
    }

    try {
        // Crear un cliente SOAP
        const client = await soap.createClientAsync(WSDL_URL);

        // Llamar al método SOAP con los argumentos necesarios
        const [clientInfo] = await client.createClientAsync({ documento, nombres, email, celular });
        console.log(clientInfo);
         
        // Enviar la respuesta al cliente
        res.json(clientInfo);
    } catch (error) {
        console.error('Error al consumir el servicio SOAP:', error);
        res.status(500).json({ error: 'Error al consumir el servicio SOAP', details: error.message });
    }
});

app.post('/updateWalletClient', async (req, res) => {
    const { documento, valor, celular } = req.body;

    if (!celular || !documento || !valor) {
        return res.status(400).json(
            { error: 'Información incompleta es requerido los campos: documento, valor, celular' }
        );
    }

    try {
        // Crear un cliente SOAP
        const client = await soap.createClientAsync(WSDL_URL);

        // Llamar al método SOAP con los argumentos necesarios
        const [clientInfo] = await client.updateWalletClientAsync({ documento, valor: parseFloat(valor), celular });
        console.log(clientInfo);
         
        // Enviar la respuesta al cliente
        res.json(clientInfo);
    } catch (error) {
        console.error('Error al consumir el servicio SOAP:', error);
        res.status(500).json({ error: 'Error al consumir el servicio SOAP', details: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor REST escuchando en http://localhost:${PORT}`);
});
