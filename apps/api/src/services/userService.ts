import { CreateUserDto, UpdateUserDto, User } from '@repo/types';
import { readUsers, writeUsers } from '../utils/fileStorage.js';
import { randomUUID } from 'crypto';

export class UserService {
  // Get all users
  getAllUsers(): User[] {
    return readUsers();
  }

  // Get user by ID
  getUserById(id: string): User | null {
    const users = readUsers();
    return users.find(user => user.id === id) || null;
  }

  // Create a new user
  createUser(userData: CreateUserDto): User {
    const users = readUsers();
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: randomUUID(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);
    return newUser;
  }

  // Update a user
  updateUser(id: string, userData: UpdateUserDto): User | null {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return null;
    }

    // Check if email is being updated and if it already exists
    if (userData.email && userData.email !== users[userIndex]?.email) {
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
    }

    const updatedUser: User = {
      ...users[userIndex]!,
      ...userData as User,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    writeUsers(users);
    return updatedUser;
  }

  // Delete a user
  deleteUser(id: string): boolean {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      return false;
    }

    users.splice(userIndex, 1);
    writeUsers(users);
    return true;
  }
}

