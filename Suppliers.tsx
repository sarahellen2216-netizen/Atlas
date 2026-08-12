import { DataPage } from "../components/DataPage";
export function Suppliers() {
  return <DataPage title="Fornecedores" endpoint="/suppliers"
    fields={[{key:"company",label:"Empresa"},{key:"contact",label:"Contato"},{key:"phone",label:"Telefone"},{key:"email",label:"E-mail"},{key:"address",label:"Endereço"}]}
    columns={["company","contact","phone","email"]}/>;
}
