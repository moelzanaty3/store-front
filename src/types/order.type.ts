/* eslint-disable camelcase */
import OrderProduct from './order-product.type';

type Order = {
  id?: number;
  status: string;
  user_id: number;
  products?: OrderProduct[];
};

export default Order;
