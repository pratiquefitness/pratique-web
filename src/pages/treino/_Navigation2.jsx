import { Button, Col, Flex, Row, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FaDiagnoses } from "react-icons/fa";
import { LuDumbbell, LuUserCheck } from "react-icons/lu";
import Image from "next/image";
const userCheckIcon = "/images/webp/banner_home/icone-anovator.webp";

const navigation = [{}];

export default function Navigation2() {
  const router = useRouter();
  const pathname = usePathname();
  const mediaScreen = window.matchMedia("(max-width: 375px)");
  return (
    <Row gutter={8}>
      <Space size={"small"}>
        {navigation.map((item, key) => (
          <Button
            type={item.href === pathname ? "primary" : "default"}
            onClick={() => router.push(item.href)}
            style={{ height: "auto", display: "block", width: "auto" }}
            block
            key={key}
            size={mediaScreen.matches ? "small" : undefined}
          >
            <div className="text-xlarge">{item.icon}</div>
            <div>{item.title}</div>
          </Button>
        ))}
      </Space>
    </Row>
  );
}
