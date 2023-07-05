import {Outlet} from "react-router-dom";
import DefaultHeader from "./DefaultHeader";
import './default.scss';

const DefaultLayout = () => {
    return (
        <main>
            <DefaultHeader />
            <div className="container">
                <Outlet/>
            </div>
        </main>
    );
}

export default DefaultLayout;
