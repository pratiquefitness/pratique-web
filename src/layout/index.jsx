import {
  Affix,
  Layout as AntLayout,
  Button,
  ConfigProvider,
  Space,
  Typography,
  Breadcrumb,
  Image
} from "antd";
import { HomeOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Header from "./Header";
import routes from "@/constants/routes";
import utils from "@/utils";
import { getTheme } from "@/configs/theme";
import ptBR from "antd/locale/pt_BR";
import LoginView from "@/pages/login";
import { useRouter } from "next/router";
import Browser from "@/components/Browser";
import { setBrowserURL } from "@/redux/slices/global";

const { Content } = AntLayout;
const { Title } = Typography;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { themeColor, themeMode, browserURL } = useSelector((state) => state.global);
  console.log("themeColor:", themeColor);
  const { authenticated, usuario } = useSelector((state) => state.login);
  const pathname = usePathname();
  const { svaClientParameters } = useSelector((state) => state.clubeCertoSva);

  const isApp = typeof window !== "undefined" && window.self === window.parent;

  // Define routes where the header and footer should not be displayed
  const noHeaderFooterRoutes = ["/treino/diagnose/primeira"];

  // Check if we should display the header and footer
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  const routeObject = authenticated
    ? utils.getByObjectKeyValue(routes, "href", utils.getFirstLevelRoute(pathname))
    : null;

  const userNiceName = usuario?.user_nicename || "";

  const fraseInicial = routeObject
    ? routeObject.title.replace("#USUARIO#!", `${userNiceName.split("@")[0]}!`).split("!")
    : "";

  // Check if svaClientParameters has data
  const hasSvaClientParameters = Object.keys(svaClientParameters).length > 0;
  console.log(hasSvaClientParameters);

  return (
    // <ConfigProvider theme={getTheme(themeColor, themeMode)} locale={ptBR}>
    <ConfigProvider theme={getTheme(themeColor || "#1890ff", themeMode)} locale={ptBR}>
      {authenticated ? (
        <>
          <AntLayout className="app">
            {browserURL ? (
              <Browser url={browserURL} onClose={() => dispatch(setBrowserURL(null))} />
            ) : (
              <>
                {showHeaderFooter && <Header />}
                <Content
                  style={{
                    paddingTop: showHeaderFooter ? "1rem" : "0",
                    paddingBottom: showHeaderFooter ? "3.75rem" : "0"
                  }}
                >
                  <div className="container">
                    <div
                      className={
                        hasSvaClientParameters
                          ? "flex-container d-flex justify-space-between"
                          : "d-flex flex-column justify-space-between"
                      }
                    >
                      {pathname !== "/" && showHeaderFooter && (
                        <>
                          <Breadcrumb
                            separator={<DoubleRightOutlined className="text-black" />}
                            className="mb-4 text-capitalize d-flex items-center"
                            items={[
                              {
                                title: <HomeOutlined />,
                                onClick: () => router.back()
                              },
                              {
                                style: "line-height: 1.7;",
                                title: `${pathname.substring(1)}`
                              }
                            ]}
                          />
                          {hasSvaClientParameters && (
                            <Image width={100} src={svaClientParameters.image} preview={false} />
                          )}
                        </>
                      )}
                      {fraseInicial && fraseInicial[0] !== "" && showHeaderFooter && (
                        <>
                          <Title level={3}>
                            {fraseInicial[0]} <br /> {fraseInicial[1]}
                          </Title>
                          {hasSvaClientParameters && pathname === "/" && (
                            <Image width={100} src={svaClientParameters.image} preview={false} />
                          )}
                        </>
                      )}
                    </div>
                    {children}
                  </div>
                </Content>
                {showHeaderFooter && <Navigation data={routes} />}
              </>
            )}
          </AntLayout>
        </>
      ) : pathname && pathname.includes("/afiliados/loja/") ? (
        children
      ) : (
        <LoginView />
      )}
    </ConfigProvider>
  );
}
