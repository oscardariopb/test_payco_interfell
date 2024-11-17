const soap = require('soap');
const http = require('http');
const wsdl = require('./wsdl');

const mongoose = require('mongoose');

// Conexión a MongoDB (local)
mongoose.connect('mongodb://localhost:27017/interfellTestDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Definimos el esquema de Usuario
const clientSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    documento: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: String, required: true },
  });
  
  // Creamos el modelo de Usuario
  const ClientModel = mongoose.model('Client', clientSchema);


// Iniciamos el servidor Express
const port = 3000;

function createResponse(success, cod_error, message_error, data) {
    return {
      success,
      cod_error,
      message_error,
      data
    };
  }

// Simulamos una base de datos en memoria
let usuarios = [
  { id: 1, nombre: 'Juan', edad: 30 },
  { id: 2, nombre: 'Ana', edad: 25 },
];

// Definir los métodos de SOAP para el CRUD
const service = {
  UsuarioService: {
    UsuarioServicePort: {
      // Obtener todos los usuarios (simulando un GET)
      getUsuarios: function () {
        return { usuarios: usuarios };
      },
      // Obtener un usuario por ID (simulando un GET con parámetro)
      getUsuario: function (args) {
        console.log('get usuario', args)
        const usuario = usuarios.find(u => u.id === parseInt(args.id));
        if (usuario) {
          return { usuario: usuario };
        } else {
          return { error: 'Usuario no encontrado' };
        }
      },
      // Crear un nuevo usuario (simulando un POST)
      createClient: async function (args) {
        console.log(args)
        try {
            const newClient = new ClientModel({
              ...args.client
            });
            const res = await newClient.save();
            console.log(res)
            return createResponse(true, '00', '', JSON.stringify(res));
          } catch (err) {
            console.log(err)
            return createResponse(false, '500', 'Cannot create client: ' + err.message, {});
          }
      },
      // Actualizar un usuario existente (simulando un PUT)
      actualizarUsuario: function (args) {
        const usuario = usuarios.find(u => u.id === parseInt(args.id));
        if (usuario) {
          usuario.nombre = args.nombre;
          usuario.edad = parseInt(args.edad);
          return { usuario: usuario };
        } else {
          return { error: 'Usuario no encontrado' };
        }
      },
      // Eliminar un usuario (simulando un DELETE)
      eliminarUsuario: function (args) {
        const index = usuarios.findIndex(u => u.id === parseInt(args.id));
        if (index !== -1) {
          const usuarioEliminado = usuarios.splice(index, 1);
          return { usuarioEliminado: usuarioEliminado[0] };
        } else {
          return { error: 'Usuario no encontrado' };
        }
      }
    }
  }
};

// Configuración del servidor SOAP
const server = http.createServer((req, res) => {
    //console.log('entree '. process);
  res.end('Servidor SOAP corriendo');
});

soap.listen(server, '/soap', service, wsdl);

// Iniciar el servidor Express
server.listen(port, () => {
  console.log(`Servidor SOAP y Express corriendo en http://localhost:${port}`);
});
