const soap = require('soap');
const http = require('http');
const wsdl = require('./wsdl');
require('dotenv').config();

const mongoose = require('mongoose');
const { ClientModel, WalletModel, PurchaseModel } = require('./mongoSettings/models')

// Conexión a MongoDB (local)
mongoose.connect(process.env.MONGODB, {
   
  })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

const port = process.env.PORT || 3000;

function createResponse(success, cod_error, message_error, data) {
    return {
      success,
      cod_error,
      message_error,
      data
    };
}

generateRandomTokenCode = (minNumber, maxNumber) => {
  return Math.floor(Math.random()*maxNumber) + minNumber;
}

const service = {
  PaycoService: {
    PaycoServicePort: {
      getWallet: async function (args) {
        try {
            const wallet = await WalletModel.findOne({documento: args.documento, celular: args.celular});
            if (!wallet) {
              return createResponse(false, '404', 'No wallet found', {});
            } else {
              return createResponse(true, '00', '', JSON.stringify(wallet));
            }
        } catch (err) {
          return createResponse(false, '500', 'Cannot search wallet: ' + (err.message || err), {});
        }
      },
      createClient: async function (args) {
        const data = args.client || args;
        try {
            const newClient = new ClientModel({
              ...data
            });
            const res = await newClient.save();

            await WalletModel.create({documento: res.documento, celular: res.celular, saldo: 0});
            return createResponse(true, '00', '', JSON.stringify(res));
          } catch (err) {
            return createResponse(false, '500', 'Cannot create client: ' + (err.message || err), {});
          }
      },
      updateWalletClient: async function (args) {
        const data = args.client || args;
        try {
            const res = await WalletModel.findOneAndUpdate({documento: data.documento, celular: data.celular }, {$inc: {saldo: parseFloat(data.valor) } }, {returnDocument: 'after'});
            return createResponse(true, '00', '', JSON.stringify(res));
          } catch (err) {
            return createResponse(false, '500', 'Cannot update wallet: ' + (err.message || err), {});
          }
      },
      purchase: async function (args) {
        const data = args.purchase || args;
        try {
            const res = await PurchaseModel.create({idSesion: "1234", token: generateRandomTokenCode(100000, 999999), estado: "Pending", valorCompra: parseFloat(data.valor), documento: data.documento, producto: data.producto });
            return createResponse(true, '00', '', JSON.stringify(res));
          } catch (err) {
            return createResponse(false, '500', 'Cannot create purchase: ' + (err.message || err), {});
          }
      },
      confirmPurchase: async function (args) {
        const data = args.purchase || args;
        try {
            const purchase = await PurchaseModel.findOne({idSesion: data.idSesion, token: data.token, documento: data.documento, estado: "Pending" });
         
            if(!purchase) {
              return createResponse(false, '404', 'No pending purchase found', {});
            }

            const wallet = await WalletModel.findOne({documento: data.documento });

            if(purchase.valorCompra > wallet.saldo) {
              return createResponse(false, '400', 'You cant complete the purchase, no balance', {});
            }
            const updatedWallet = await WalletModel.findOneAndUpdate({documento: data.documento }, {$inc: {saldo: -parseFloat(purchase.valorCompra) } }, {returnDocument: 'after'});
            await PurchaseModel.findOneAndUpdate({_id: purchase._id }, { estado: "Completed" }, {returnDocument: 'after'});

            return createResponse(true, '00', '', JSON.stringify(updatedWallet));
          } catch (err) {
            return createResponse(false, '500', 'Cannot complete purchase: ' + (err.message || err), {});
          }
      },
    }
  }
};

// Configuración del servidor SOAP
const server = http.createServer((req, res) => {
  res.end('Servidor SOAP corriendo');
});

soap.listen(server, '/soap', service, wsdl);

// Iniciar el servidor Express
server.listen(port , () => {
  console.log(`Servidor SOAP y Express corriendo en http://localhost:${port}`);
});
