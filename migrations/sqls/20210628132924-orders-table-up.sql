-- create orders table 

CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id VARCHAR(255),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);