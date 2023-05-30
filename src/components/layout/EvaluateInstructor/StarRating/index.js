import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { Colors } from "../../../assets/colors";
const colors = {
  orange: "#F13553",
  grey: "#a9a9a9",
};

function StarRatingComponent({ select }) {
  const [currentValue, setCurrentValue] = useState(-1);
  const [stars, setStars] = useState(Array(5).fill(false));

  const rate = (e) => {
    e.preventDefault();
    setCurrentValue(-1);
    select(currentValue);
  };
  return (
    <div style={styles.container}>
      <div style={styles.stars}>
        {stars.map((v, index) => (
          <IoIosStar
            key={index}
            size={32}
            onClick={(e) => {
              e.preventDefault();
              setCurrentValue(index);
            }}
            color={index <= currentValue ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer",
            }}
          />
        ))}
      </div>
      <button onClick={rate} style={styles.button}>
        Confirmar
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3vh",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "none",
    borderRadius: 5,
    padding: 10,
    color: Colors.white,
    backgroundColor: Colors.red_light,
    fontSize: "1.5vh",
    padding: "1vh 4vw",
  },
};

export default StarRatingComponent;
