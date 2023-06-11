
export class ItemDTO {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }

export class CartItemDTO {
    quantity: number;
    items: ItemDTO;
}

export class CartDTO {
    userId: string
    items: ItemDTO
    totalItem: number
  }