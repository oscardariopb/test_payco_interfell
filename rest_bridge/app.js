const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3003;


let client;
const initializeSoapClient = async () => {
    try {
        client = await soap.createClientAsync(process.env.WSDL_URL);
        console.log('SOAP Client inicializado');
    } catch (error) {
        console.error('Error al crear el cliente SOAP:', error);
    }
};

(async () => {
    await initializeSoapClient();
})();

app.use(bodyParser.json());

function createResponse(success, cod_error, message_error, data) {
    return {
      success,
      cod_error,
      message_error,
      data
    };
}

app.post('/getWallet', async (req, res) => {
    const { celular, documento } = req.body;

    if (!celular || !documento ) {
        return res.status(400).json(
            createResponse(false, 400, 'Información incompleta es requerido los campos: documento, celular', {} )
        );
    }

    try {
        const [walletInfo] = await client.getWalletAsync({ celular, documento });
         
        const parsedData = JSON.parse(walletInfo.data);   
        res.json({...walletInfo, data: parsedData});
    } catch (error) {
        res.status(500).json(
            createResponse(false, 500, 'Error al consumir el servicio SOAP', error.message || error )
        );
    }
});

app.post('/createClient', async (req, res) => {
    const { documento, nombres, email, celular } = req.body;

    if (!celular || !documento || !email || !nombres) {
        return res.status(400).json(
            createResponse(false, 500, 'Información incompleta es requerido los campos: documento, nombres, email, celular', {})
        );
    }

    try {
        const [clientInfo] = await client.createClientAsync({ documento, nombres, email, celular });
         
        const parsedData = JSON.parse(clientInfo.data);   
        res.json({...clientInfo, data: parsedData});
    } catch (error) {
        res.status(500).json(
            createResponse(false, 500, 'Error al consumir el servicio SOAP', error.message || error )
        );
    }
});

app.post('/updateWalletClient', async (req, res) => {
    const { documento, valor, celular } = req.body;

    if (!celular || !documento || !valor) {
        return res.status(400).json(
            createResponse(false, 400, 'Información incompleta es requerido los campos: documento, valor, celular', {})
        );
    }

    try {
        const [clientInfo] = await client.updateWalletClientAsync({ documento, valor: parseFloat(valor), celular });
        const parsedData = JSON.parse(clientInfo.data);   
        res.json({...clientInfo, data: parsedData});
    } catch (error) {
        res.status(500).json(
            createResponse(false, 500, 'Error al consumir el servicio SOAP', error.message || error )
        );
    }
});

app.post('/purchase', async (req, res) => {
    const { producto, valor} = req.body;

    if (!producto || !valor) {
        return res.status(400).json(
            createResponse(false, 400, 'Información incompleta es requerido los campos: producto, valor', {})
        );
    }

    try {
        const [purchaseInfo] = await client.purchaseAsync({ producto, valor: parseFloat(valor) });

        const parsedData = JSON.parse(purchaseInfo.data);   
        res.json({...purchaseInfo, data: parsedData});
    } catch (error) {
        res.status(500).json(
            createResponse(false, 500, 'Error al consumir el servicio SOAP', error.message || error )
        );
    }
});

app.listen(PORT, () => {
    console.log(`Servidor REST escuchando en http://localhost:${PORT}`);
});
