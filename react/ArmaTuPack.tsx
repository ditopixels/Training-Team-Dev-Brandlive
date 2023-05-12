import React, { createContext, useState } from 'react'
import { StorefrontFunctionComponent } from './types/vtex'
import Preview from './components/Preview'
import Groups from './components/Groups'
import AddToCart from './components/AddToCart'
import { useRuntime } from 'vtex.render-runtime'

type ProductSelected = {
    image: string
    skuId: string
}

export type Group = {
    name: string
    idCollection: string
}

interface Props {
    groups: Group[]
    ProductSummary: React.ComponentType<{
        product: any;
        actionOnClick: any;
    }>
}

export const ArmaTuPackContext = createContext<{
    productsSelecteds?:ProductSelected[]
    dispatchProductSelecteds?: React.Dispatch<React.SetStateAction<ProductSelected[]>>
    groupSelected?: Group 
    groups?: Group[]
}>({}) 

const ArmaTuPack:StorefrontFunctionComponent<Props> = ({groups, ProductSummary}) => {

    const [productsSelecteds, setProductsSelecteds] = useState<ProductSelected[]>([])
    const [groupSelected, setGroupSelected] = useState<Group>(groups[0])
    const {
        deviceInfo: { isMobile }
    } = useRuntime()

    return (
        <ArmaTuPackContext.Provider value={{
            productsSelecteds:productsSelecteds,
            dispatchProductSelecteds:setProductsSelecteds,
            groupSelected: groupSelected,
            groups: groups
        }}>
            <Preview/>
            <Groups ProductSummary={ProductSummary} groups={groups} groupSelected={groupSelected} setGroupSelected={setGroupSelected} />
            {isMobile && <AddToCart/>}
        </ArmaTuPackContext.Provider>
    )
}

ArmaTuPack.schema = {
    title: "Arma tu pack",
    type: "object",
    properties:{
        groups:{
            title: "Groups",
            type: "array",
            items:{
                title: "Group",
                type: "object",
                properties:{
                    name: {
                        title: "Nombre",
                        type: "string"
                    },
                    idCollection: {
                        title: "ID coleccion",
                        type: "number"
                    }
                }
            }
        }
    }
}

export default ArmaTuPack