const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
             xmlns:web="http://www.example.com/usuarios"
             targetNamespace="http://www.example.com/usuarios">
  <message name="getUsuariosRequest"/>
  <message name="getUsuariosResponse">
    <part name="usuarios" type="xsd:string"/>
  </message>

  <message name="getUsuarioRequest">
    <part name="id" type="xsd:int"/>
  </message>
  <message name="getUsuarioResponse">
    <part name="usuario" type="xsd:string"/>
    <part name="error" type="xsd:string"/>
  </message>

  <message name="createClientRequest">
    <part name="documento" type="xsd:string"/>
    <part name="nombres" type="xsd:string"/>
    <part name="email" type="xsd:string"/>
    <part name="celular" type="xsd:string"/>
  </message>
  <message name="createClientResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="cod_error" type="xsd:string"/>
    <part name="message_error" type="xsd:string"/>
    <part name="data" type="xsd:string"/>
  </message>

  <message name="rechargeWalletRequest">
    <part name="documento" type="xsd:string"/>
    <part name="celular" type="xsd:string"/>
    <part name="valor" type="xsd:int"/>
  </message>
  <message name="rechargeWalletResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="cod_error" type="xsd:string"/>
    <part name="message_error" type="xsd:string"/>
    <part name="data" type="xsd:string"/>
  </message>

  <message name="actualizarUsuarioRequest">
    <part name="id" type="xsd:int"/>
    <part name="nombre" type="xsd:string"/>
    <part name="edad" type="xsd:int"/>
  </message>
  <message name="actualizarUsuarioResponse">
    <part name="usuario" type="xsd:string"/>
    <part name="error" type="xsd:string"/>
  </message>

  <message name="eliminarUsuarioRequest">
    <part name="id" type="xsd:int"/>
  </message>
  <message name="eliminarUsuarioResponse">
    <part name="usuarioEliminado" type="xsd:string"/>
    <part name="error" type="xsd:string"/>
  </message>

  <portType name="UsuarioServicePortType">
    <operation name="getUsuarios">
      <input message="web:getUsuariosRequest"/>
      <output message="web:getUsuariosResponse"/>
    </operation>
    <operation name="getUsuario">
      <input message="web:getUsuarioRequest"/>
      <output message="web:getUsuarioResponse"/>
    </operation>
    <operation name="createClient">
      <input message="web:createClientRequest"/>
      <output message="web:createClientResponse"/>
    </operation>
    <operation name="rechargeWalletClient">
      <input message="web:rechargeWalletClientRequest"/>
      <output message="web:rechargeWalletClientResponse"/>
    </operation>
    <operation name="actualizarUsuario">
      <input message="web:actualizarUsuarioRequest"/>
      <output message="web:actualizarUsuarioResponse"/>
    </operation>
    <operation name="eliminarUsuario">
      <input message="web:eliminarUsuarioRequest"/>
      <output message="web:eliminarUsuarioResponse"/>
    </operation>
  </portType>

  <binding name="UsuarioServiceBinding" type="web:UsuarioServicePortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getUsuarios">
      <soap:operation soapAction="getUsuarios"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
    <operation name="getUsuario">
      <soap:operation soapAction="getUsuario"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
    <operation name="createClient">
      <soap:operation soapAction="createClient"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
    <operation name="rechargeWalletClient">
      <soap:operation soapAction="rechargeWalletClient"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
    <operation name="actualizarUsuario">
      <soap:operation soapAction="actualizarUsuario"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
    <operation name="eliminarUsuario">
      <soap:operation soapAction="eliminarUsuario"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/usuarios"/>
      </output>
    </operation>
  </binding>

  <service name="UsuarioService">
    <port name="UsuarioServicePort" binding="web:UsuarioServiceBinding">
      <soap:address location="http://localhost:3000/soap"/>
    </port>
  </service>
</definitions>
`;

module.exports = wsdl;