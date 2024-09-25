import { Layout } from "antd";

const { Content } = Layout;

export default function TreinoLayout({ children }) {
  return (
    <div>
      <Content style={{ padding: "12px 0px" }}>{children}</Content>
    </div>
  );
}
