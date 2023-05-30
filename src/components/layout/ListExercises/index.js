import React, { useEffect, useState } from "react";
import { Container, WrapperList, List, Thumbnail } from "./style";
import Image from "../../assets/image/image.svg";
import FitDay from "../../../api/services/FitDay";
import { Link } from "react-router-dom";
import ModalVideoExercicio from "../../layout/modal";

function ListExercises({ exercises }) {
  const [exercicios, setExercicios] = useState();
  const [modal, setModal] = useState();

  useEffect(() => {
    const getData = async () => {
      await FitDay.ficha().then((res) => {
        if (typeof res.resposta.length === "undefined") {
          setExercicios(Array(1).fill(res.resposta));
          return;
        }
        setExercicios(res.resposta);
      });
    };
    getData();
  }, []);

  return (
    <div>
      {exercicios?.map((exercicio) => {
        return (
          <Container>
            {typeof modal !== "undefined" ? (
              <ModalVideoExercicio video_id={modal} close={() => setModal()} />
            ) : null}
            <Link onClick={() => setModal(exercicio?.video)}>
              {/* <img src={Image} alt="" /> */}
              <Thumbnail src={exercicio?.thumb} />
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <p className="textBold">{exercicio?.nome}</p>
              <WrapperList>
                <List>
                  <span>
                    Séries:
                    <span style={{ fontWeight: "bold" }}>
                      {exercicio?.series}
                    </span>
                  </span>
                </List>
                <List>
                  <span>
                    Repetições:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {exercicio?.repeticoes}
                    </span>
                  </span>
                </List>
                <List>
                  <span>
                    Descanso:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {exercicio?.descanco}s
                    </span>
                  </span>
                </List>
              </WrapperList>
            </div>
          </Container>
        );
      })}
    </div>
  );
}

export default ListExercises;
