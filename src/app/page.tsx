"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

interface TodoList {
  id: number;
  name: string;
  check: boolean;
}

export default function Home() {
  const [value, setValue] = useState("");

  const [todoList, setTodoList] = useState<TodoList[]>([
    { id: 1, name: "Item 1", check: false },
  ]);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const addList = () => {
    setTodoList((prevItems) => [
      ...todoList,
      { id: todoList.length + 1, name: value, check: false },
    ]);
  };

  const removeValue = (index: string) => {
    let check = todoList.filter((items) => items.name !== index);
    setTodoList([...check]);
  };

  const markValue = (id: number) => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            check: !item.check,
          };
        }
        return item;
      })
    );
  };
  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <p>Todo List</p>

        <div className={styles.content}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              value={value}
              onChange={handleChange}
            />
            <button className={styles.button} onClick={addList}>
              Add
            </button>
          </div>
          <div className={styles.header}>
            <div>Task Name</div>
          </div>
          <div className={styles.resultContainer}>
            {todoList.map((items, index) => (
              <div key={index} className={styles.itemContainer}>
                <div>{items.name}</div>
                <div
                  onClick={() => removeValue(items.name)}
                  className={styles.delete}
                >
                  🗑️
                </div>
                <div
                  className={styles.check}
                  onClick={() => markValue(items.id)}
                >
                  ✅{items.check && "Checked"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
