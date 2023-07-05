import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {IAuthUser} from "../auth/types";

const DefaultHeader = () => {
    const {user, isAuth} = useSelector((store: any) => store.auth as IAuthUser);
    return (
        <>
            <header data-bs-theme="dark">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Carousel</a>
                        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled">Disabled</a>
                                </li>
                            </ul>
                            {isAuth ? (
                                <ul className={"navbar-nav"}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">{user?.email}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Вихід</Link>
                                    </li>
                                </ul>
                            ): (
                                <ul className={"navbar-nav"}>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Реєстрація</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Вхід</Link>
                                    </li>
                                </ul>
                            )}

                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default DefaultHeader;
