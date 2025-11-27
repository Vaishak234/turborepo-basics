"use client";

import { useState, useEffect } from "react";
import { User, CreateUserDto, UpdateUserDto } from "@repo/types";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (userData: CreateUserDto | UpdateUserDto) => {
    await createUser(userData as CreateUserDto);
    await fetchUsers();
    setIsFormOpen(false);
  };

  const handleUpdate = async (userData: CreateUserDto | UpdateUserDto) => {
    if (!editingUser) return;
    await updateUser(editingUser.id, userData as UpdateUserDto);
    await fetchUsers();
    setEditingUser(null);
    setIsFormOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>User Management Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
          disabled={isFormOpen}
        >
          + Add New User
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-btn">
            ×
          </button>
        </div>
      )}

      {isFormOpen && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={handleCloseForm}
        />
      )}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}
