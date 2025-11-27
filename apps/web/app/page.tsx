import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700" }}>Welcome</h1>
      <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)" }}>
        User Management System
      </p>
      <Link href="/dashboard" className="home-link">
        Go to Dashboard
      </Link>
    </div>
  );
}
