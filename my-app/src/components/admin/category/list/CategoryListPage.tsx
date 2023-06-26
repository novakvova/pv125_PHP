import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ModalDelete from "../../../common/ModalDelete";
import http_common from "../../../../http_common";
import {ICategoryItem} from "./types";


const CategoryListPage = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        http_common
            .get<ICategoryItem[]>("api/category")
            .then((resp) => {
                console.log("Categories", resp.data);
                setList(resp.data);
            });
    }, []);

    const onClickDelete = async (id: number) => {
        try {
            //console.log("Видаляємо категорію", id);
            await http_common.delete(`api/category/${id}`);
            setList(list.filter(x=>x.id!==id));
        }
        catch {
            console.log("Помилка видалення");
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Список категорій</h1>
                <Link to="create" className="btn btn-success">Додати</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Назва</th>
                        <th scope="col">Фото</th>
                        <th scope="col">Опис</th>
                        <th></th>
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
                                <td>
                                    <ModalDelete id={c.id} text={c.name} deleteFunc={onClickDelete}/>
                                    &nbsp; &nbsp;
                                    <Link to={`edit/${c.id}`} className="btn btn-info" >Змінить</Link>
                                </td>
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