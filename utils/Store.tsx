import { createContext, useReducer } from "react";

import * as Cookies from 'js-cookie'



const estadoInicial = {
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart') || '{}'):{ cartItems: [], shippingAddress: {}}

};

 const StoreContext = createContext<any>({
    state: estadoInicial,
    dispatch: () =>  null,
 });



function redutor(estado:any, acao:any){
    switch (acao.type){ 
        case 'CART_ADD_ITEM':{
            const novoItem = acao.payload;
            const itemExistente = estado.cart.cartItems.find(
                (item:any) => item.slug === novoItem.slug
            )
            const itensCarrinho = itemExistente ? estado.cart.cartItems.map((item:any)=>
            item.name === itemExistente.name ? novoItem : item
            )
            : [...estado.cart.cartItems, novoItem];
            Cookies.set('cart',JSON.stringify({...estado.cart, cartItems: itensCarrinho }))
            return {...estado, cart: {...estado.cart, cartItems: itensCarrinho }}
        }
        case 'CART_REMOVE_ITEM':{
           const itensCarrinho = estado.cart.cartItems.filter(
            (item:any) => item.slug !== acao.payload.slug
           ); 
           Cookies.set('cart',JSON.stringify({...estado.cart, cartItems: itensCarrinho }))
           return {...estado, cart: {...estado.cart, cartItems: itensCarrinho }}
        }
        case 'CART_RESET':
            return{
                ...estado,
                cart: {
                    cartItems: [],
                    shippingAddress: { location: {}},
                    paymentMethod: '',
                },
            };
            case 'CART_CLEAR_ITEMS':
                return {
                    ...estado,
                     cart: {
                        ...estado.cart,
                         cartItems: []
                        }
            };

            case 'SAVE_SHIPPING_ADDRESS':
                return{
                    ...estado,
                    cart: {
                        ...estado.cart,
                        shippingAddress: {
                            ...estado.cart.shippingAddress,
                            ...acao.payload,
                        },
                    }
                }
                case 'SAVE_PAYMENT_METHOD':
                return{
                    ...estado,
                    cart: {
                        ...estado.cart,
                       paymentMethod: acao.payload,
                    }
                }
            default: 
            return estado;
     }
    }

   function StoreProvider({children}:any){
    const [estado, dispatch] = useReducer(redutor, estadoInicial)
    const valor =  {state: estado, dispatch};
    return <StoreContext.Provider value={valor}>{children}</StoreContext.Provider>
}
export { StoreContext, StoreProvider}
