import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { ListaProdutoComponent } from "./components/lista-produto/ListaProduto";
import { PersistirProdutoComponent } from "./components/persistir-produto/PersistirProduto";

const Routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route component={ListaProdutoComponent} path="/" exact />
                <Route component={PersistirProdutoComponent} path="/persistir" />
            </Routes>
        </BrowserRouter>
    )
};

export default Routes;