import React, { useEffect, useState } from 'react'
import { useLazyQuery } from "react-apollo"
//@ts-ignore
import { Input, Button} from 'vtex.styleguide'
import { useCssHandles } from "vtex.css-handles"
import GETTERMS from "../../graphql/GetTerms.gql"
import GETPRODUCTS from "../../graphql/GetProducts.gql"
import "./index.css"
import Item from './Item'
import { QUERYPRODUCT } from '../../types/product'



const Buscador = () => {

    const [term, setTerm] = useState("")
    const { handles } = useCssHandles(["buscador"])

    const [ getTerm, { loading, data }] = useLazyQuery(GETTERMS)
    const [ getProducts ,{ data: dataProduct, loading: loadingProduct}] = useLazyQuery<QUERYPRODUCT>(GETPRODUCTS)

    const handleSearch = (e:any) => {
        setTerm(e.target.value)
        getTerm({
            variables:{
                fullText: e.target.value
            }
        })
    }

    useEffect(()=>{
        if(data){
            getProducts({
                variables:{
                    "productOriginVtex": false,
                    "simulationBehavior": "skip",
                    "hideUnavailableItems": false,
                    "fullText": data?.autocompleteSearchSuggestions?.searches[0]?.term || "",
                    "count": 5,
                    "shippingOptions": []
                }
            })
        }
    },[data])

    
    console.log("TERMINO A BUSCAR", term, loading, data, dataProduct, loadingProduct)
    
    return (
        <div className={handles["buscador"]}>
            <div>
                <Input placeholder="Buscar..." size="small" label="Buscador" onChange={handleSearch} />  
                <Button variation="primary">Buscar</Button>
            </div>

            {loading && <div>Cargando...</div>}

            <ul>
                {(dataProduct && dataProduct.productSuggestions && dataProduct.productSuggestions.products) && dataProduct.productSuggestions.products.map(product=>(
                    <Item {...product}/>
                ))}
            </ul>
        </div>
    )
}

export default Buscador