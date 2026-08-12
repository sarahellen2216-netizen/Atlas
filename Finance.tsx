import { DataPage } from "../components/DataPage";
export function Finance() {
  return <DataPage title="Financeiro" endpoint="/finance"
    fields={[{key:"type",label:"Tipo (INCOME/EXPENSE)"},{key:"category",label:"Categoria"},{key:"description",label:"Descrição"},{key:"amount",label:"Valor",type:"number"},{key:"paymentMethod",label:"Forma de pagamento"},{key:"notes",label:"Observações"}]}
    columns={["type","category","description","amount","paymentMethod"]}/>;
}
