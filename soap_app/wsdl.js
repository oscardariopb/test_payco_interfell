const wsdl = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
             xmlns:web="http://www.example.com/payco"
             targetNamespace="http://www.example.com/payco">

  <message name="getWalletRequest">
    <part name="documento" type="xsd:string"/>
    <part name="celular" type="xsd:string"/>
  </message>
  <message name="getWalletResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="cod_error" type="xsd:string"/>
    <part name="message_error" type="xsd:string"/>
    <part name="data" type="xsd:string"/>
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

  <message name="updateWalletClientRequest">
    <part name="documento" type="xsd:string"/>
    <part name="celular" type="xsd:string"/>
    <part name="valor" type="xsd:int"/>
  </message>
  <message name="updateWalletClientResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="cod_error" type="xsd:string"/>
    <part name="message_error" type="xsd:string"/>
    <part name="data" type="xsd:string"/>
  </message>

  <message name="purchaseRequest">
    <part name="producto" type="xsd:string"/>
    <part name="valor" type="xsd:int"/>
  </message>
  <message name="purchaseResponse">
    <part name="success" type="xsd:boolean"/>
    <part name="cod_error" type="xsd:string"/>
    <part name="message_error" type="xsd:string"/>
    <part name="data" type="xsd:string"/>
  </message>

  <portType name="PaycoServicePortType">
    <operation name="getWallet">
      <input message="web:getWalletRequest"/>
      <output message="web:getWalletResponse"/>
    </operation>
    <operation name="createClient">
      <input message="web:createClientRequest"/>
      <output message="web:createClientResponse"/>
    </operation>
    <operation name="updateWalletClient">
      <input message="web:updateWalletClientRequest"/>
      <output message="web:updateWalletClientResponse"/>
    </operation>
    <operation name="purchase">
      <input message="web:purchaseRequest"/>
      <output message="web:purchaseResponse"/>
    </operation>
  </portType>

  <binding name="PaycoServiceBinding" type="web:PaycoServicePortType">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getWallet">
      <soap:operation soapAction="getWallet"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </output>
    </operation>
    <operation name="createClient">
      <soap:operation soapAction="createClient"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </output>
    </operation>
    <operation name="updateWalletClient">
      <soap:operation soapAction="updateWalletClient"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </output>
    </operation>
    <operation name="purchase">
      <soap:operation soapAction="purchase"/>
      <input>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="http://www.example.com/payco"/>
      </output>
    </operation>
  </binding>

  <service name="PaycoService">
    <port name="PaycoServicePort" binding="web:PaycoServiceBinding">
      <soap:address location="http://localhost:3000/soap"/>
    </port>
  </service>
</definitions>
`;

module.exports = wsdl;