import {ILoginPage, ILoginResult} from "./types";
import {useState} from "react";
import http_common from "../../../http_common";
import {useFormik} from "formik";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "../types";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const init : ILoginPage = {
        email: "",
        password: ""
    };
    const [message, setMessage] = useState<string>('');

    const onSubmitFormik = async (values: ILoginPage) => {
        try {
            const result = await http_common.post<ILoginResult>('api/auth/login', values);
            //console.log("Login is good", result.data);
            const {data} = result;
            const token = data.access_token;
            localStorage.token = token;
            var user = jwtDecode(token) as IUser;
            console.log("Login user info", user);
            dispatch({
                type: AuthUserActionType.LOGIN_USER,
                payload: {
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
            console.log("User info", user);
            setMessage("");
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

    const {values, handleChange, handleSubmit} = formik;

    return (
        <>
            <h1 className={"text-center"}>Вхід на сайт</h1>
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
                <div className="mb-3">
                    <label htmlFor="password" className={"form-label"}>Пароль</label>
                    <input type="password" className="form-control" id="password" name="password"
                           onChange={handleChange}
                           value={values.password}
                           placeholder="Вкажіть пароль"/>
                </div>
                <button type="submit" className="btn btn-primary">Вхід</button>
            </form>
        </>
    )
}
export default LoginPage;
