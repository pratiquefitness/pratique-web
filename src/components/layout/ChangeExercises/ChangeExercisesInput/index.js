import { InputChangeExercises } from "./style";

function ChangeExercisesInput({ type, name, placeholder, handleOnChange, value, readOnly, backgroundColor }) {
    return (
        <InputChangeExercises
            type={type} 
            name={name} 
            id={name} 
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            readOnly={readOnly}
            style={{
                backgroundColor: {backgroundColor}
            }}
        />
    )
}

export default ChangeExercisesInput;