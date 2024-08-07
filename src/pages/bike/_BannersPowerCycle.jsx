import Loading from "@/components/Loading";
import { getLives } from "@/redux/actions/lives";
import utils from "@/utils";
import { Carousel, Typography, theme } from "antd";
import { format } from "date-fns";
import { useEffect } from "react";
import Countdown from "react-countdown";
import { useDispatch, useSelector } from "react-redux";

const contentStyle = {
  margin: 5,
  height: 200,
  color: "black",
  borderRadius: 10
};

const settings = {
  className: "center",
  centerMode: false,
  slidesToShow: 1,
  swipeToSlide: true,
  draggable: true,
  autoplay: true,
  dots: true,
  autoplaySpeed: 3000,
  style: {
    width: "100%"
  }
};

/*
5 min - em instantes
agora - acontecendo
*/

export default function BannersPowerCycle() {
  const disptach = useDispatch();
  const { token } = theme.useToken();
  const { data, loading } = useSelector((state) => state.lives);

  useEffect(() => {
    disptach(getLives());
  }, []);

  return (
    <Loading spinning={loading}>
      <>
        {data.length ? (
          <Carousel {...settings}>
            {data.map((live, key) => {
              const datetime = new Date(`${live.live_datagravacao}T${live.live_horagravacao}:00`);
              if (new Date() >= datetime) {
                return false;
              }
              const dia = format(new Date(live.live_datagravacao + "T00:00:00"), "dd");
              const mes = format(new Date(live.live_datagravacao + "T00:00:00"), "MM");
              return (
                <div key={key}>
                  <a
                    href={`https://www.youtube.com/watch?v=${live.live_videoyoutube}`}
                    target="_blank"
                  >
                    <div
                      style={{
                        backgroundImage: `url('${live.live_link}')`,
                        backgroundSize: "cover",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundColor: "white",
                        ...contentStyle
                      }}
                    >
                      <div className="p-4">
                        <h3>
                          {`${dia} de ${utils.getMonthNames(mes).name} `}
                          <small>às {live.live_horagravacao}H</small>
                        </h3>
                        <p>
                          <Countdown
                            date={datetime}
                            renderer={({ hours, minutes, seconds, completed }) => {
                              return (
                                <>
                                  Começa em: <br />
                                  <span style={{ fontWeight: "bold", fontSize: 20 }}>
                                    {hours}h {minutes}m {seconds}s
                                  </span>
                                </>
                              );
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </Carousel>
        ) : null}
      </>
    </Loading>
  );
}
