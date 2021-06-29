/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../database';
import OrderProduct from '../types/order-product.type';

class OrderProductModel {
  private formatOrderProduct(oP: {
    id?: number | undefined;
    quantity: number;
    order_id: string;
    product_id: string;
  }): OrderProduct {
    return {
      id: oP.id,
      quantity: oP.quantity,
      order_id: +oP.order_id,
      product_id: +oP.product_id
    };
  }

  async create(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) values ($1, $2, $3) RETURNING *';

      const result = await connection.query(sql, [oP.quantity, oP.order_id, oP.product_id]);

      connection.release();

      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not create product: ${oP.product_id} to order: ${oP.order_id}: ${err.message}`
      );
    }
  }

  async index(orderId: number): Promise<OrderProduct[]> {
    try {
      const connection = await db.connect();
      const sql =
        "SELECT o.id AS id, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity ) ) AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id";
      const result = await connection.query(sql, [orderId]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error at retrieving products in order: ${orderId} ${err.message}`);
    }
  }

  async show(orderId: number, productId: number): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'SELECT op.order_id AS id, op.quantity, p.name, p.description, p.price AS price FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2';
      const result = await connection.query(sql, [orderId, productId]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Error at retrieving product:${productId} in order: ${orderId} ${err.message}`
      );
    }
  }

  async edit(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE order_products SET quantity=$1, order_id=$2,  product_id=$3 WHERE id=$4 RETURNING *';
      const result = await connection.query(sql, [oP.quantity, oP.order_id, oP.product_id, oP.id]);
      connection.release();
      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `Could not update product: ${oP.product_id} in order ${oP.order_id}. Error: ${err}`
      );
    }
  }

  async delete(orderId: number, productId: number): Promise<OrderProduct> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *';

      const result = await connection.query(sql, [orderId, productId]);

      connection.release();

      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not delete product: ${productId} in order ${orderId}. Error: ${err}`);
    }
  }
}

export default OrderProductModel;
