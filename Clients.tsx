import { DataPage } from "../components/DataPage";
export function Clients() {
  return <DataPage title="Clientes" endpoint="/clients"
    fields={[{key:"name",label:"Nome"},{key:"cpfCnpj",label:"CPF/CNPJ"},{key:"phone",label:"Telefone"},{key:"email",label:"E-mail"},{key:"city",label:"Cidade"},{key:"state",label:"Estado"}]}
    columns={["name","cpfCnpj","phone","email","city","state"]}/>;
}
