import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <h1>Головна сторінка</h1>
            <Link to={"/admin"} className={"btn btn-success"}>Адмін панель</Link>
        </>
    )
}
export default HomePage;
