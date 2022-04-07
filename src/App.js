import './App.css';
import { Route, Routes } from "react-router-dom";
import { ListaProdutoComponent } from "./components/lista-produto/ListaProduto";
import { PersistirProdutoComponent } from "./components/persistir-produto/PersistirProduto";

function App() {
  return (
    <Routes>
      <Route element={<ListaProdutoComponent/>} path="/" exact />
      <Route element={<PersistirProdutoComponent/>} path="/persistir" />
    </Routes>
  );
}

export default App;
