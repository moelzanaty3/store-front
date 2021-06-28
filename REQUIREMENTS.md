# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

___Table of Contents___

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
    - [Order Products](#order-products)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)
    - [Products for each Order Schema](#products-for-each-order-schema)
  - [Data Shapes](#data-shapes)
    - [Product](#product)
    - [User](#user)
    - [Order](#order)

## API Endpoints

### Users

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
      [
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'mohammed',
          lastName: 'elzanaty',
          password: 'hashed password',
          superUser: false
        }
      ]
    ```

- Show **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id`  - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `User object`

    ```json
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'mohammed',
          lastName: 'elzanaty',
          password: 'hashed password',
          superUser: false
        }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/users`
  - Request Body

    ```json
      {
          userName: 'mohammed elzanaty',
          firstName: 'mohammed',
          lastName: 'elzanaty',
          password: 'password',
          superUser: false
      }
    ```

  - Response Body -- `User object`

    ```json
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'mohammed',
          lastName: 'elzanaty',
          password: 'hashed password',
          superUser: false
        }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/users/:id` - **id of the user to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted User object`

    ```json
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'mohammed',
          lastName: 'elzanaty',
          superUser: false
        }
    ```

- Edit **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/users/:id`
  - Request Body

    ```json
      {
          firstName: 'Mohammed',
          lastName: 'Elzanaty',
          superUser: true
      }
    ```

  - Response Body -- `Updated User object`

    ```json
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'Mohammed',
          lastName: 'Elzanaty',
          superUser: true
        }
    ```

- Authenticate
  - HTTP verb `POST`
  - Endpoint:- `/api/users/authenticate`
  - Request Body

    ```json
      {
          userName: 'mohammed elzanaty',
          password: 'password'
      }
    ```

  - Response Body -- `Updated User object`

    ```json
        {
          id: 1,
          userName: 'mohammed elzanaty',
          firstName: 'Mohammed',
          lastName: 'Elzanaty',
          superUser: true,
          token: 'jwt-token'
        }
    ```

### Products

- Index
  - HTTP verb `GET`
  - Endpoint:- `/api/products/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```json
      [
        {
          id: 1,
          name: 'product name',
          description: 'product description',
          price: 10.2,
          category: 'electronics',
        }
      ]
    ```

- Show
  - HTTP verb `GET`
  - Endpoint:- `/api/products/:id`  - **id of the product to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
        {
          id: 1,
          name: 'product name',
          description: 'product description',
          price: 10.2,
          category: 'electronics',
        }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/products`
  - Request Body

    ```json
      {
          name: 'product name',
          description: 'product description',
          price: 10.2,
          category: 'electronics',
      }
    ```

  - Response Body -- `User object`

    ```json
        {
          id: 1,
          name: 'product name',
          description: 'product description',
          price: 10.2,
          category: 'electronics',
        }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/products/:id` - **id of the product to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Product object`

    ```json
        {
          id: 1,
          name: 'product name',
          description: 'product description',
          price: 10.2,
          category: 'electronics',
        }
    ```

- Edit **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/products/:id`
  - Request Body

    ```json
      {
          name: 'product name updated',
          price: 12,
      }
    ```

  - Response Body -- `Updated User object`

    ```json
        {
          id: 1,
          name: 'product name updated',
          description: 'product description',
          price: 12,
          category: 'electronics'
        }
    ```

- **[OPTIONAL]** Top 5 most popular products
- **[OPTIONAL]** Products by category (args: product category)

### Orders

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

    ```json
      [
        {
          id: 1,
          user_id: 'mohammed elzanaty',
          products: [
              {
                name: 'product name',
                price: 12,
                quantity: 1,
                product_id: 1
              }
            ],
          status: 'active',
        }
      ]
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:id`  - **id of the order to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
        {
          id: 1,
          user_id: 1,
          products: [
              {
                name: 'product name',
                price: 12,
                quantity: 1,
                product_id: 1
              }
            ],
          status: 'active',
        }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/orders`
  - Request Body

    ```json
      {
          userId: 1,
          products: [
              {
                name: 'product name',
                price: 12,
                quantity: 1,
              }
            ],
          status: 'active',
      }
    ```

  - Response Body -- `User object`

    ```json
        {
          id: 1,
          userId: 1,
          products: [
              {
                name: 'product name',
                price: 12,
                quantity: 1,
                product_id: 1
              }
            ],
          status: 'active',
        }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint:- `/api/orders/:id` - **id of the order to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order object`

    ```json
        {
          id: 1,
          user_id: 1,
          status: 'active'
        }
    ```

- Edit **`token required`**
  - HTTP verb `PUT`
  - Endpoint:- `/api/orders/:id`
  - Request Body

    ```json
      {
          userId: 1,
          status: 'active',
      }
    ```

  - Response Body -- `Updated User object`

    ```json
        {
          id: 1,
          userId: 1,
          status: 'active'
        }
    ```

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Order Products

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:order_id/products/` - **id of the order**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      [
        {
          id: 1,
          products: [
              {
                name: 'product name',
                price: 12,
                quantity: 1,
                product_id: 1
              }
            ],
        }
      ]
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/orders/:order_id/products/:product_id` - **id of the order abd id of the product to return**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `An array of the products associated with an order`

    ```json
      [
        {
          id: 1,
          product: {
            name: 'product name',
            price: 12,
            quantity: 1,
            product_id: 1
          }
        }
      ]
    ```


## Data Schema

### Products Schema

```sql
CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  price NUMERIC(17,2)  NOT NULL,
  category VARCHAR(50) NOT NULL,
);
```

### Users Schema

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  userName VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  superUser BOOLEAN DEFAULT FALSE
);
```

### Orders Schema

```sql
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id VARCHAR(255),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Products for each Order Schema

```sql
CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  order_id INT,
  CONSTRAINT fk_order_id FOREIGN KEY(order_id) REFERENCES orders(id),
  product_id INT,
  CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id),
  quantity INT
);
```

## Data Shapes

### Product

```typescript
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
}
```

### User

```typescript
type User = {
  id: number;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  superUser: boolean;
}
```

### Order

```typescript
type Order = {
  id: number;
  // status of order (active or complete)
  status: string; 
  user_id: string;
  // quantity of each product in the order 
  // id of each product in the order
  // => [{ product_id: number, quantity: number }]
  products: Array; 
}
```
