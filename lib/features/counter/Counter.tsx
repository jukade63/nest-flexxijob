"use client";

import React from "react";
import styles from "./counter.module.css";
import type { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { decrement, increment } from "./counterSlice";

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <h1>{count}</h1>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}
