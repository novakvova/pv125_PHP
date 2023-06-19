import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

interface ICategoryItem {
    id: number;
    name: string;
    image: string;
    description: string;
}
const CategoryListPage = () => {
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
                <Link to="/category/create" className="btn btn-success">Додати</Link>
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

export default CategoryListPage;