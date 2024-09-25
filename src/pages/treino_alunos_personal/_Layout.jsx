import { Layout } from "antd";
import Navigation from "./_Navigation";

const { Content } = Layout;

export default function TreinoLayout({ children }) {
  return (
    <div>
      <Navigation />
      <Content style={{ padding: "12px 0px" }}>{children}</Content>
    </div>
  );
}
