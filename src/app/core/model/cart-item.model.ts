export class CartItemModel {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  maxQuantity: number;

  constructor(data?: any) {
    this.id = data && data.id ? data.id : null;
    this.productName = data && data.productName ? data.productName : null;
    this.price = data && data.price ? data.price : null;
    this.quantity = data && data.quantity ? 1 : null;
    this.maxQuantity = data && data.quantity ? data.quantity : null;
  }
}
