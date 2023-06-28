import {ICategoryEdit} from "./types";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import http_common from "../../../../http_common";
import {ChangeEvent, useEffect, useState} from "react";
import {ICategoryItem} from "../list/types";
import defaultImage from '../../../../assets/default.jpg';
import {APP_ENV} from "../../../../env";


const CategoryEditPage = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [oldImage, setOldImage] = useState<string>("");

    const init: ICategoryEdit = {
        id: id ? Number(id) : 0,
        name: "",
        image: null,
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryEdit) => {
        //console.log("Send Formik Data", values);
        try {
            const result = await http_common.post(`api/category/edit/${id}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
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
                //setFieldValue("image", data.image);
                //посилання на фото, яке було у категорії
                setOldImage(`${APP_ENV.BASE_URL}/uploads/300_${data.image}`);
                setFieldValue("description", data.description);
            });
    },[id]);

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files)
        {
            const file = files[0];
            if(file) {
                //Перевірка на тип обраного файлу - допустимий тип jpeg, png, gif
                const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
                if (!allowedTypes.includes(file.type)) {
                    alert("Не допустимий тип файлу");
                    return;
                }
                setFieldValue(e.target.name, file);
            }
        }
    }

    const imgView = oldImage ? oldImage : defaultImage;

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
                        <label htmlFor="image" className="form-label">
                            <img src={values.image==null ? imgView : URL.createObjectURL(values.image)}
                                 alt="фото"
                                 width={200}
                                 style={{cursor: "pointer"}}/>
                        </label>
                        <input type="file" className="form-control d-none" id="image"
                               onChange={onChangeFileHandler}
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
