const soap = require('soap');
const http = require('http');
const wsdl = require('./wsdl')

// Iniciamos el servidor Express
const port = 3000;

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
        const usuario = usuarios.find(u => u.id === parseInt(args.id));
        if (usuario) {
          return { usuario: usuario };
        } else {
          return { error: 'Usuario no encontrado' };
        }
      },
      // Crear un nuevo usuario (simulando un POST)
      crearUsuario: function (args) {
        const nuevoUsuario = {
          id: usuarios.length + 1,
          nombre: args.nombre,
          edad: parseInt(args.edad),
        };
        usuarios.push(nuevoUsuario);
        return { usuario: nuevoUsuario };
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
