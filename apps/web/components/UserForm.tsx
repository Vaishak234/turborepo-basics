"use client";

import { useState, useEffect } from "react";
import { User, CreateUserDto, UpdateUserDto } from "@repo/types";

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void>;
  onCancel: () => void;
}

export default function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await onSubmit({ name, email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-header">
          <h2>{user ? "Edit User" : "Create New User"}</h2>
          <button onClick={onCancel} className="close-btn">
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
              placeholder="Enter user name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
              placeholder="Enter user email"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Saving..." : user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
