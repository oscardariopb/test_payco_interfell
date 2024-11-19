const soap = require('soap');
const http = require('http');
const wsdl = require('./wsdl');
const mongoose = require('mongoose');
require('dotenv').config();

const { ClientModel, WalletModel, PurchaseModel } = require('./mongoSettings/models');
const sendEmail = require('./utils/email');

mongoose.connect(process.env.MONGODB, {})
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
  return Math.floor(Math.random() * maxNumber) + minNumber;
}

const service = {
  PaycoService: {
    PaycoServicePort: {
      getWallet: async function (args) {
        try {
          const wallet = await WalletModel.findOne({ documento: args.documento, celular: args.celular });
          if (!wallet) {
            return createResponse(false, '404', 'No wallet found', {});
          }
          return createResponse(true, '00', '', JSON.stringify(wallet));
          
        } catch (err) {
          return createResponse(false, '500', 'Cannot search wallet: ' + (err.message || err), {});
        }
      },
      createClient: async function (args) {
        const data = args.client || args;
        try {

          const client = await ClientModel.findOne({ documento: data.documento, celular: data.celular });

          if (!client) {
            const newClient = new ClientModel({
              ...data
            });
            const res = await newClient.save();
  
            await WalletModel.create({ documento: res.documento, celular: res.celular, saldo: 0 });
            return createResponse(true, '00', '', JSON.stringify(res));
          }
          return createResponse(true, '00', '', JSON.stringify(client));

        } catch (err) {
          return createResponse(false, '500', 'Cannot create client: ' + (err.message || err), {});
        }
      },
      updateWalletClient: async function (args) {
        const data = args.client || args;
        try {
          const res = await WalletModel.findOneAndUpdate({ documento: data.documento, celular: data.celular }, { $inc: { saldo: parseFloat(data.valor) } }, { returnDocument: 'after' });
          return createResponse(true, '00', '', JSON.stringify(res));
        } catch (err) {
          return createResponse(false, '500', 'Cannot update wallet: ' + (err.message || err), {});
        }
      },
      purchase: async function (args) {
        const data = args.purchase || args;
        try {
          const token = generateRandomTokenCode(100000, 999999);
          const res = await PurchaseModel.create({ token, estado: "Pending", valorCompra: parseFloat(data.valor), documento: data.documento, producto: data.producto });
          const client = await ClientModel.findOne({ documento: data.documento });
          await sendEmail({ to: client.email, idSesion: res._id, token, producto: data.producto, valor: data.valor });

          return createResponse(true, '00', '', JSON.stringify({ message: `Check your email to continue, token: ${token} and idSesion: ${res._id} were sended` }));
        } catch (err) {
          return createResponse(false, '500', 'Cannot create purchase: ' + (err.message || err), {});
        }
      },
      confirmPurchase: async function (args) {
        const data = args.purchase || args;
        try {
          const purchase = await PurchaseModel.findOne({ _id: data.idSesion, token: data.token, documento: data.documento, estado: "Pending" });

          if (!purchase) {
            return createResponse(false, '404', 'No pending purchase found', {});
          }

          const wallet = await WalletModel.findOne({ documento: data.documento });

          if (purchase.valorCompra > wallet.saldo) {
            return createResponse(false, '400', "You can't complete the purchase, no balance", {});
          }
          const updatedWallet = await WalletModel.findOneAndUpdate({ documento: data.documento }, { $inc: { saldo: -parseFloat(purchase.valorCompra) } }, { returnDocument: 'after' });
          await PurchaseModel.findOneAndUpdate({ _id: purchase._id }, { estado: "Completed" }, { returnDocument: 'after' });

          return createResponse(true, '00', '', JSON.stringify({ message: `Purchase complete, your wallet was updated new balance: $${updatedWallet.saldo}` }));
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
server.listen(port, () => {
  console.log(`Servidor SOAP corriendo en http://localhost:${port}`);
});
