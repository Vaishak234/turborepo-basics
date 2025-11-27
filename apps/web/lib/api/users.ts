import { User, CreateUserDto, UpdateUserDto } from "@repo/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  const result: ApiResponse<User[]> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch users");
  }

  return result.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  const result: ApiResponse<User> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to fetch user");
  }

  return result.data;
}

export async function createUser(userData: CreateUserDto): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result: ApiResponse<User> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to create user");
  }

  return result.data;
}

export async function updateUser(
  id: string,
  userData: UpdateUserDto
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result: ApiResponse<User> = await response.json();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to update user");
  }

  return result.data;
}

export async function deleteUser(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });

  const result: ApiResponse<void> = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to delete user");
  }
}
