-- create order_products table 
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id INT,
  CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
  product_id INT,
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
  quantity INT
);