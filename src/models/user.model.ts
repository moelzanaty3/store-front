/* eslint-disable camelcase  */
/* eslint-disable class-methods-use-this  */
import bcrypt from 'bcrypt';
import config from '../config';
import db from '../database';
import User from '../types/user.type';
import hashPassword from '../utils/hash-password';

class UserModel {
  private formatUser(user: {
    id?: number | undefined;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
  }): User {
    return {
      id: user.id,
      email: user.email,
      userName: user.user_name,
      firstName: user.first_name,
      lastName: user.last_name
    };
  }

  async create(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name';
      const result = await connection.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hashPassword(u.password as string)
      ]);
      connection.release();
      return this.formatUser(result.rows[0]);
    } catch (error) {
      throw new Error(`Unable to create (${u.userName}): ${error.message}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows.map((u) => this.formatUser(u));
    } catch (err) {
      throw new Error(`Error at retrieving users ${err.message}`);
    }
  }

  async edit(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql =
        'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *';

      const result = await connection.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hashPassword(u.password as string),
        u.id
      ]);
      connection.release();
      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not update user: ${u.userName}, ${err.message}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';

      const result = await connection.query(sql, [id]);

      connection.release();

      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not delete user ${id}, ${err.message}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const connection = await db.connect();

      const result = await connection.query(sql, [id]);

      connection.release();
      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not find user ${id}, ${err.message}`);
    }
  }

  async authenticate(userName: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT password FROM users WHERE user_name=$1';
      const result = await connection.query(sql, [userName]);

      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0];
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashedPassword);
        if (isPasswordValid) {
          const userInfo = await connection.query('SELECT * FROM users WHERE user_name=($1)', [
            userName
          ]);
          return this.formatUser(userInfo.rows[0]);
        }
      }
      connection.release();
      return null;
    } catch (error) {
      throw new Error(`Unable to login: ${error.message}`);
    }
  }
}

export default UserModel;
