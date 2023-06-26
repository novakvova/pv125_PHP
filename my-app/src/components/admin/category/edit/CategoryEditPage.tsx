import {ICategoryEdit} from "./types";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import http_common from "../../../../http_common";
import {useEffect} from "react";
import {ICategoryItem} from "../list/types";


const CategoryEditPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const init: ICategoryEdit = {
        id: id ? Number(id) : 0,
        name: "",
        image: "",
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryEdit) => {
        //console.log("Send Formik Data", values);
        try {
            const result = await http_common.post(`api/category/edit/${id}`, values);
            navigate("../..");
        } catch {
            console.log("Server error");
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit
    });

    const {values, handleChange, handleSubmit, setFieldValue} = formik;

    useEffect(() => {
        http_common.get<ICategoryItem>(`api/category/${id}`)
            .then(resp => {
                const {data} = resp;
                setFieldValue("name", data.name);
                setFieldValue("image", data.image);
                setFieldValue("description", data.description);
            });
    },[id]);

    return (
        <>
            <h1 className="text-center">Змінить категорію</h1>
            <div className="container">
                <form className="col-md-8 offset-md-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Назва</label>
                        <input type="text" className="form-control" id="name"
                               value={values.name}
                               onChange={handleChange}
                               name="name"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Фото</label>
                        <input type="text" className="form-control" id="image"
                               value={values.image}
                               onChange={handleChange}
                               name="image"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Опис</label>
                        <input type="text" className="form-control" id="description"
                               value={values.description}
                               onChange={handleChange}
                               name="description"/>
                    </div>

                    <button type="submit" className="btn btn-primary">Зберегти</button>
                </form>
            </div>
        </>
    );
}

export default CategoryEditPage;