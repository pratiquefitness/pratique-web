import { getAulasColetivas } from "@/redux/actions/aulasColetivas";
import { Card, Col, Row, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalidades from "@/constants/modalidades";
import Loading from "@/components/Loading";
import YoutubePlayer from "./_YoutubePlayer";
import SproutPlayer from "./_SproutPlayer";

export default function AulasColetivas({ tema }) {
  const [videoData, setVideoData] = useState(null);
  const { data, loading } = useSelector((state) => state.aulasColetivas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAulasColetivas(modalidades[tema] || 14));
  }, [tema, dispatch]);

  const renderPlayer = () => {
    if (videoData.aula_categoria === "33") {
      return <SproutPlayer id={videoData.aula_sprout} onClose={() => setVideoData(null)} />;
    } else {
      return <YoutubePlayer id={videoData.aula_linkvideo} onClose={() => setVideoData(null)} />;
    }
  };

  return (
    <Loading spinning={loading}>
      <div className="p-1">
        <Row gutter={16}>
          {data.map(
            (aula, key) =>
              aula.aula_capa.length && (
                <Col xs={{ span: 24 }} md={{ span: 12 }} key={key} className="pb-4">
                  <Card
                    title={aula.aula_nome}
                    size="small"
                    onClick={() => setVideoData(aula)}
                    style={{ cursor: "pointer" }}
                  >
                    <div style={{ position: "relative" }}>
                      <img src={aula.aula_capa} width={"100%"} />
                      <Tag
                        color={aula.aula_plano === "5" ? "#87d068" : "#2db7f5"}
                        style={{ position: "absolute", top: 30, right: 0 }}
                      >
                        {aula.aula_plano === "5" ? "PREMIUM" : "GRATUITO"}
                      </Tag>
                    </div>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </div>
      {videoData && renderPlayer()}
    </Loading>
  );
}
