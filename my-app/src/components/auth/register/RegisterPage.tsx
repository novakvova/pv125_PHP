import {useState} from "react";
import {useFormik} from "formik";

import {useNavigate} from "react-router-dom";
import {IRegisterPage} from "./types";
import CropperModal from "../../common/CropperModal";

const RegisterPage = () => {
    const navigate = useNavigate();

    const init : IRegisterPage = {
        email: "",
        password: "",
        image: null
    };
    const [message, setMessage] = useState<string>('');

    const onSubmitFormik = async (values: IRegisterPage) => {
        try {
            console.log("Register user")
            navigate("/");
        }
        catch {
            setMessage("Дані вказнао не вірно");
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onSubmitFormik
    });

    const {values, handleChange, handleSubmit, setFieldValue} = formik;

    return (
        <>
            <h1 className={"text-center"}>Реєстрація на сайті</h1>
            <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="email" className={"form-label"}>Електронна пошта</label>
                    <input type="text" className="form-control" id="email" name="email"
                           onChange={handleChange}
                           value={values.email}
                           placeholder="Вкажіть пошту"/>
                </div>

                <CropperModal onChange={setFieldValue} field={"image"} value={values.image} />

                <div className="mb-3">
                    <label htmlFor="password" className={"form-label"}>Пароль</label>
                    <input type="password" className="form-control" id="password" name="password"
                           onChange={handleChange}
                           value={values.password}
                           placeholder="Вкажіть пароль"/>
                </div>
                <button type="submit" className="btn btn-primary">Зареєструватися</button>
            </form>
        </>
    )
}
export default RegisterPage;
