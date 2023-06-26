import "./admin.scss";
import {Outlet} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = () => {
    return (
        <>
            <AdminHeader/>
            <div className={"admin container"}>
                <div className="row">
                    <AdminSidebar/>
                    <main className="col-sm-8 col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminLayout;