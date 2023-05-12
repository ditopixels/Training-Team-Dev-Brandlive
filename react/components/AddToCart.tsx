import React, { useContext, useState } from 'react'
//@ts-ignore
import { Button } from "vtex.styleguide"
import { ArmaTuPackContext } from '../ArmaTuPack'
//@ts-ignore
import { useOrderItems } from 'vtex.order-items/OrderItems'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
    "add-to-cart",
    "add-to-cart-error"
]

const AddToCart = () => {

    const { addItems } = useOrderItems()
    const { productsSelecteds, groups, dispatchProductSelecteds } = useContext(ArmaTuPackContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const { handles } = useCssHandles(CSS_HANDLES)

    const handleAddToCart = async () => {
        if(productsSelecteds?.length != groups?.length) {
            setError(`Debe seleccionar los ${groups?.length} productos`)
            return
        }
        setLoading(true)
        setError(``)
        try{
            await addItems(productsSelecteds?.map((product, index) => {
                return {
                    id: parseInt(product.skuId),
                    index,
                    quantity: 1,
                    seller: "1",
                    options: []
                }
            }), {
                marketingData: {}
            })
            dispatchProductSelecteds!([])
        }catch{
            setError("Ocurrio un error, intenta nuevamente")
        }
        setLoading(false)
    }

    return (
        <div className={handles["add-to-cart"]}>
            <Button onClick={handleAddToCart} isLoading={loading}>
                Agregar al carrito
                <svg width="30px" height="30px" id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.26 24.17">
                    <path fill="#fff" d="m27.06,19.05H10.96c-.87,0-1.66-.59-1.91-1.42L4.32,1.71c-.17-.57-.7-.96-1.29-.96H.38c-.21,0-.38-.17-.38-.38s.17-.38.38-.38h2.66c.92,0,1.75.62,2.01,1.5l4.73,15.92c.16.52.65.89,1.19.89h16.1c.21,0,.38.17.38.38s-.17.38-.38.38Z"/>
                    <path fill="#fff" d="m25.71,16.11h-14.73c-.21,0-.38-.17-.38-.38s.17-.38.38-.38h14.73c.9,0,1.68-.64,1.87-1.52l1.94-9.33c.02-.31-.1-.65-.34-.91-.24-.26-.57-.41-.93-.41H7.85c-.21,0-.38-.17-.38-.38s.17-.38.38-.38h20.39c.56,0,1.1.24,1.48.65s.58.97.54,1.52l-1.95,9.38c-.25,1.23-1.35,2.12-2.6,2.12Z"/>
                    <path fill="#fff" d="m13.24,13.43c-.17,0-.32-.11-.36-.28l-1.81-6.87c-.05-.2.07-.41.27-.46.2-.05.41.07.46.27l1.81,6.87c.05.2-.07.41-.27.46-.03,0-.06.01-.1.01Z"/>
                    <path fill="#fff" d="m23.83,13.43s-.06,0-.1-.01c-.2-.05-.32-.26-.27-.46l1.81-6.87c.05-.2.25-.32.46-.27.2.05.32.26.27.46l-1.81,6.87c-.04.17-.2.28-.36.28Z"/>
                    <path fill="#fff" d="m18.54,13.43c-.21,0-.38-.17-.38-.38v-6.87c0-.21.17-.38.38-.38s.38.17.38.38v6.87c0,.21-.17.38-.38.38Z"/>
                    <path fill="#fff" d="m12.5,24.17c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14.96,2.14,2.14-.96,2.14-2.14,2.14Zm0-3.52c-.76,0-1.39.62-1.39,1.39s.62,1.39,1.39,1.39,1.39-.62,1.39-1.39-.62-1.39-1.39-1.39Z"/>
                    <path fill="#fff" d="m24.5,24.17c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14.96,2.14,2.14-.96,2.14-2.14,2.14Zm0-3.52c-.76,0-1.39.62-1.39,1.39s.62,1.39,1.39,1.39,1.39-.62,1.39-1.39-.62-1.39-1.39-1.39Z"/>
                </svg> 
            </Button>
            {error && <span className={handles["add-to-cart-error"]}>{error}</span>}
        </div>
    )
}

export default AddToCart