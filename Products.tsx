import { DataPage } from "../components/DataPage";
export function Products() {
  return <DataPage title="Produtos" endpoint="/products"
    fields={[
      {key:"code",label:"Código"},{key:"name",label:"Nome"},{key:"category",label:"Categoria"},
      {key:"stock",label:"Estoque",type:"number"},{key:"minimumStock",label:"Estoque mínimo",type:"number"},
      {key:"purchasePrice",label:"Preço de compra",type:"number"},{key:"salePrice",label:"Preço de venda",type:"number"}
    ]}
    columns={["code","name","category","stock","minimumStock","salePrice"]}/>;
}
