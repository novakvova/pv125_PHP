import {ICategoryCreate} from "./types";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";


const CategoryCreatePage = () => {

    const navigate = useNavigate();

    const init: ICategoryCreate = {
        name: "",
        image: "",
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryCreate) => {
        //console.log("Send Formik Data", values);
        try {
            const result = await axios.post("http://laravel.pv125.com/api/category", values);
            navigate("/");
        }
        catch {
            console.log("Server error");
        }
    }

    const formik = useFormik({
       initialValues: init,
       onSubmit: onFormikSubmit
    });

    const {values, handleChange, handleSubmit } = formik;
    return (
        <>
            <h1 className="text-center">Додати категорію</h1>
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

                    <button type="submit" className="btn btn-primary">Додати</button>
                </form>
            </div>
        </>
    );
}

export default CategoryCreatePage;