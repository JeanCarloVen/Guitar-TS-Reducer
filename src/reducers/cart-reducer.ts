import { db } from "../data/database";
import {Guitar, CartItem} from "../types"

export type CartActions = 
{ type: 'addToCart', payload: {item: Guitar} } |
{ type: 'removeFromCart', payload: {id: Guitar['id']} } |
{ type: 'decrease-quantity', payload: {id: Guitar['id']}} |
{ type: 'increase-quantity', payload: {id: Guitar['id']} } |
{ type: 'clear-cart'} 

export type CartState = {
  data: Guitar[],
  cart: CartItem[]
}

const intitialCart = () : CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};


export const initialState = {
  data: db,
  cart: intitialCart()
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;


//Esto se hace para tener el autocompletado en el Reducer y que acciones tenemos disponibles
export const cartReducer = (
  state : CartState = initialState,
  action: CartActions
) => {
  if(action.type === "addToCart"){
        
    const itemExists = state.cart.find((guitar) => guitar.id === action.payload.item.id);


    let updatedCart : CartItem[] = []

    if (itemExists) {
      updatedCart = state.cart.map( item => {
        if(item.id === action.payload.item.id){
          if(item.quantity < MAX_ITEMS){
            return { ...item, quantity: item.quantity + 1}
          }else{
            return item 
          }
        }else{
          return item
        }
      })
    } else {
      //Existe en el carrito de compras y aumenta en uno la cantidad seleccionada
      const newItem : CartItem = {...action.payload.item, quantity : 1}
      updatedCart = [...state.cart, newItem]
    }
    
    return {
      ...state,
      cart:  updatedCart
    }
  }


  if(action.type === "removeFromCart"){

    const updateCart = state.cart.filter( item => item.id !== action.payload.id)

    return {
      ...state,
      cart: updateCart
    }
  }

  if(action.type === "increase-quantity"){
    console.log("dentro de Increase")
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item;
    });
    
    return{
      ...state,
      cart: updateCart
    }
  }

  if(action.type === "decrease-quantity"){
    console.log("dentro de decrease")
    const updateCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    
    return{
      ...state,
      cart: updateCart
    }
  }

  if(action.type === "clear-cart"){

    return{
      ...state,
      cart: []
    }
  }

  return state

}