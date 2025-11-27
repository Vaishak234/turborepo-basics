import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

import { join } from 'path';
import { User } from '@repo/types';

const DATA_DIR = join(process.cwd(), 'data');
const USERS_FILE = join(DATA_DIR, 'users.json');

// Ensure data directory exists
function ensureDataDirectory() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Read users from JSON file
export function readUsers(): User[] {
  try {
    ensureDataDirectory();
    if (!existsSync(USERS_FILE)) {
      writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    const data = readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

// Write users to JSON file
export function writeUsers(users: User[]): void {
  try {
    ensureDataDirectory();
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing users file:', error);
    throw error;
  }
}

