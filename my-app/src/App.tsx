import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

function App() {
  const [list, setList] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    axios
      .get<ICategoryItem[]>("http://laravel.pv125.com/api/category")
      .then((resp) => {
        console.log("Categories", resp.data);
        setList(resp.data);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Список категорій</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Назва</th>
              <th scope="col">Фото</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              return (
                <tr key={c.id}>
                  <th scope="row">{c.id}</th>
                  <td>{c.name}</td>
                  <td>{c.image}</td>
                  <td>{c.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
