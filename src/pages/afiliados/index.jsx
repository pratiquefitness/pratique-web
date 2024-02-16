import {useEffect} from "react";
import {useRouter} from "next/router";
import { Tabs } from "antd";
import {useSelector} from "react-redux";
import {usePathname} from "next/navigation";
import Geral from "./_Geral";
import Comissao from "./_Comissao";
import Produtos from "./_Produtos";
import PlanosAcademia from "./_PlanosAcademia";
import JumperFit from "./_JumperFit";
import PratiqueMed from "./_PratiqueMed";

const items = [
  {
    key: "geral",
    label: `Geral`,
    children: <Geral />,
  },
  {
    key: "comissao",
    label: `Comissão`,
    children: <Comissao />,
  },
  {
    key: "planos",
    label: `Planos`,
    children: <PlanosAcademia />,
  },
  {
    key: "jumperfit",
    label: `Jumper Fit`,
    children: <JumperFit />,
  },
  {
    key: "pratiquemed",
    label: `Pratique Med`,
    children: <PratiqueMed />,
  },
];

export default function Afiliados() {
  const { usuario } = useSelector(state => state.login)
  const { svaData } = useSelector(state => state.clubeCertoSva)
  const pathname = usePathname()
  const router = useRouter()
  const isAffiliate = !!usuario.isAffiliate

  useEffect(() => {
    if (
      Object.keys(svaData).length > 0 &&
      isAffiliate &&
      (pathname.includes('/afiliados/loja/') || pathname.includes('/afiliados'))
    ) {
      router.push('/')
    }
  }, [isAffiliate, svaData]);

  return <Tabs defaultActiveKey="0" items={items} />;
}
