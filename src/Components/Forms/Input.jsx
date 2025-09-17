import React from "react";
import styles from "./Input.module.css";
import Erro from "../Helper/Erro";

const Input = ({
  id,
  label,
  type,
  valueState,
  error,
  handleBlur,
  handleChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={id}
        value={valueState}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Erro error={error} />
    </div>
  );
};

export default Input;
