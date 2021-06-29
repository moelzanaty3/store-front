import UserModel from '../user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(userModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userModel.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(userModel.delete).toBeDefined();
    });

    it('should have an Authenticate method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user = {
      email: 'test@test.com',
      userName: 'testUser',
      firstName: 'Test',
      lastName: 'User',
      password: 'test123'
    } as User;

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a User', async () => {
      const createdUser = await userModel.create(user);
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: 'test@test.com',
        userName: 'testUser',
        firstName: 'Test',
        lastName: 'User'
      } as User);
    });

    it('Index method should return All available users in DB', async () => {
      const users = await userModel.index();
      expect(users.length).toBe(1);
      expect(users[0].userName).toBe('testUser');
    });

    it('Show method should return testUser when called with ID (1)', async () => {
      const returnedUser = await userModel.show(1);
      expect(returnedUser.id).toBe(1);
      expect(returnedUser.email).toBe('test@test.com');
      expect(returnedUser.userName).toBe('testUser');
      expect(returnedUser.firstName).toBe('Test');
      expect(returnedUser.lastName).toBe('User');
    });

    it('Edit method should return a user with edited attributes', async () => {
      const updatedUser = await userModel.edit({
        id: 1,
        email: 'mo@mo.com',
        userName: 'mohammedelzanaty',
        firstName: 'Mohammed',
        lastName: 'Elzanaty',
        password: 'test123'
      });
      expect(updatedUser.email).toBe('mo@mo.com');
      expect(updatedUser.userName).toBe('mohammedelzanaty');
      expect(updatedUser.firstName).toBe('Mohammed');
      expect(updatedUser.lastName).toBe('Elzanaty');
    });

    it('Authenticate method should return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate('mohammedelzanaty', 'test123');
      if (authenticatedUser) {
        expect(authenticatedUser.email).toBe('mo@mo.com');
        expect(authenticatedUser.userName).toBe('mohammedelzanaty');
        expect(authenticatedUser.firstName).toBe('Mohammed');
        expect(authenticatedUser.lastName).toBe('Elzanaty');
      }
    });

    it('Authenticate method should return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate('mohammedelzanaty', 'fakeuser');
      expect(authenticatedUser).toBe(null);
    });

    it('Delete method should delete user from DB', async () => {
      const deletedUser = await userModel.delete(1);
      expect(deletedUser.id).toBe(1);
    });
  });
});
