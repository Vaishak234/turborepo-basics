"use client";

import { User } from "@repo/types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found. Create your first user to get started!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>{new Date(user.updatedAt).toLocaleString()}</td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => onEdit(user)}
                    className="btn btn-sm btn-edit"
                    title="Edit user"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="btn btn-sm btn-delete"
                    title="Delete user"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
