import React, { FC, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
//@ts-ignore
import { Button } from 'vtex.styleguide'
//import { useMutation } from "react-apollo"
//import ADDTOCART from "../../graphql/AddToCart.gql"
import { useOrderItems } from 'vtex.order-items/OrderItems'

const CSS_HANDLES = [
  "items",
  "item-name",
  "item-sku"
]

interface Props {
  productName: string
  items: {
    itemId: string
  }[]
}

const Item:FC<Props> = ({productName, items}) => {

  const { handles } = useCssHandles(CSS_HANDLES)
  const { addItems } = useOrderItems()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    console.log("Agregar al carrito", items[0].itemId)
    /*addToCart({
      variables: {
        items: [
          {
            "id": 3082,
            "index": 0,
            "quantity": 1,
            "seller": "1",
            "options": []
          }
        ],
        allowedOutdatedData: [
          "paymentData"
        ]
      }
    })*/
    setLoading(true)
    await addItems([{
      "id": parseInt(items[0].itemId),
      "index": 0,
      "quantity": 1,
      "seller": "1",
      "options": []
    }], {
      marketingData: {}
    })
    setLoading(false)

  }

  return (
    <div className={handles["items"]}>
      <p className={handles["item-name"]}>{productName}</p>
      <span className={handles["item-sku"]}>{items[0].itemId}</span>
      <Button onClick={handleAddToCart} isLoading={loading}>
        Agregar
      </Button>
    </div>
  )
}

export default Item