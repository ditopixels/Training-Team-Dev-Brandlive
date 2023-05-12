import React, { useContext } from 'react'
//@ts-ignore
import { Button } from "vtex.styleguide"
import { ArmaTuPackContext } from './ArmaTuPack'
import { useProduct } from "vtex.product-context"

const AddToList = () => {

    const { groupSelected, dispatchProductSelecteds, groups } = useContext(ArmaTuPackContext)

    const productContext = useProduct()

    const handleClick = (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        dispatchProductSelecteds!(prev => {
            const newProducts = [...prev]
            newProducts[groups?.indexOf(groupSelected!)!] = {
                image:productContext?.selectedItem?.images[0].imageUrl || "",
                skuId:productContext?.selectedItem?.itemId!   
            }
            return newProducts
        })
    }

    return (
        <div>
            <Button onClick={handleClick}>
                Seleccionar
            </Button>
        </div>
    )
}

export default AddToList