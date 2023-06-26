import {Link} from "react-router-dom";

const AdminSidebar = () => {
    return (
        <>
            <div className="sidebar col-sm-4 col-md-3 col-lg-2 p-0">

                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page"
                               to="/admin">
                                <i className={"bi bi-house-fill"}></i>
                                Головна
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/admin/category">
                                <i className={"bi bi-file-earmark"}></i>
                                Категорії
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-cart"}></i>
                                Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-people"}></i>
                                Customers
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-graph-up"}></i>
                                Reports
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-puzzle"}></i>
                                Integrations
                            </a>
                        </li>
                    </ul>

                    <hr className="my-3"/>

                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-gear-wide-connected"}></i>
                                Settings
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link d-flex align-items-center gap-2" href="#">
                                <i className={"bi bi-door-closed"}></i>
                                Sign out
                            </a>
                        </li>
                    </ul>


                </div>
            </div>

        </>
    )
}

export default AdminSidebar;