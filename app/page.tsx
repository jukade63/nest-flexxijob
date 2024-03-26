import { Counter } from "@/lib/features/counter/Counter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
     <h1>Counter</h1>
     <Counter />
    </main>
  );
}
