//Establecer una interface, se puede usar dos palabras de sistema "type" o "interface" y en esencia hacen lo mismo
export type Guitar = {
  id: number,
  name: string,
  image: string, 
  description: string,
  price: number
}

//Aplicar herencia
// export interface CartItem extends Guitar {
//   quantity: number
// }

//Otra forma de heredar
// export type CartItem = Pick<Guitar,'id' | 'name' | 'price'> & {
//   quantity: number 
// }

//Otra forma de heredar
export type CartItem = Guitar & {
  quantity: number
}

//Técnica Lookup: Permite adaptar el typo de dato de manera dinámica, ie, id es número y también puede ser string "Guitar['id']"
export type GuitarID = Guitar['id']