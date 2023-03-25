//For add item to Cart
export const addCart = (product) => {
    return {
        type: 'ADDCART',
        payload: product
    }
}


//For delete item from Cart
export const delCart = (product) => {
    return {
        type: 'DELELTEITEM',
        PAYLOAD: product
    }
}

export const delCrt = (product) => {
    return {
        type: 'HAPUS',
        payload: product
    }
}