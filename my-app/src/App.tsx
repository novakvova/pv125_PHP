import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import CategoryListPage from "./components/category/list/CategoryListPage";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";


function App() {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<CategoryListPage/>}/>
                    <Route path="category/create" element={<CategoryCreatePage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
