import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header: AntHeader } = Layout;

export function Header() {
  const items = [
    { key: "1", label: <Link to="/dashboard">Dashboard</Link> },
    { key: "2", label: <Link to="/log-in">Login</Link> },
    { key: "3", label: <Link to="/register">Register</Link> },
  ];

  return (
    <AntHeader
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="logo"
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          background: "linear-gradient(90deg, #00c6ff, #00ff59, #00c6ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "gradientAnimation 3s ease infinite",
          textShadow: "0 0 5px rgba(0, 255, 42, 0.7)",
          cursor: "default",
          userSelect: "none",
          transition: "transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
        }}
      >
        COP30
      </div>

      <Menu theme="dark" mode="horizontal" items={items} />

      <style>
        {`
          @keyframes gradientAnimation {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </AntHeader>
  );
}
