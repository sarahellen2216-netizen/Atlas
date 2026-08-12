import { DataPage } from "../components/DataPage";
export function Employees() {
  return <DataPage title="Equipe" endpoint="/employees"
    fields={[{key:"name",label:"Nome"},{key:"cpf",label:"CPF"},{key:"phone",label:"Telefone"},{key:"email",label:"E-mail"},{key:"position",label:"Cargo"},{key:"department",label:"Departamento"},{key:"salary",label:"Salário",type:"number"}]}
    columns={["name","position","department","phone","email"]}/>;
}
