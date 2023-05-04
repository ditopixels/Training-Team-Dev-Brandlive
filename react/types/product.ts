export type QUERYPRODUCT = {
    productSuggestions: {
        count: number
        misspelled: any
        operator: string
        products: {
            productName: string
            items:{
                itemId: string
            }[]
        }[]
    }
}