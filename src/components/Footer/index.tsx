import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

export function Footer() {
  return (
    <AntFooter style={{ textAlign: "center" }}>
      © {new Date().getFullYear()} COP30 - All rights reserved.
    </AntFooter>
  );
}
