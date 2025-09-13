import React from "react";
import styles from "./Input.module.css";

const Input = ({ id, label, type, valueState, setValue }) => {
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
        onChange={({ target }) => {
          setValue(target.value);
        }}
      />
      <p className={styles.error}>Error</p>
    </div>
  );
};

export default Input;
