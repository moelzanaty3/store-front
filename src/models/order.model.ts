/* eslint-disable class-methods-use-this */
import db from '../database';
import Order from '../types/order.type';

class OrderModel {
  async create(o: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = 'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';

      const result = await connection.query(sql, [o.user_id, o.status]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order ${err.message}`);
    }
  }

  async index(): Promise<Order[]> {
    try {
      const connection = await db.connect();
      const sql =
        "SELECT o.id AS id, u.user_name AS userName, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity ) ) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error at retrieving products ${err.message}`);
    }
  }

  async edit(o: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
      const result = await connection.query(sql, [o.user_id, o.status, o.id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

      const result = await connection.query(sql, [id]);

      connection.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id AS id, u.user_name AS userName, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity ) ) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status";

      const connection = await db.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with ${id}. Error: ${err}`);
    }
  }

  async getOrderByUserId(userId: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id AS id, u.user_name AS userName, JSON_AGG(JSONB_BUILD_OBJECT('product_id', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity ) ) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status";

      const connection = await db.connect();

      const result = await connection.query(sql, [userId]);

      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order for userId ${userId}. Error: ${err}`);
    }
  }
}

export default OrderModel;
