import "./App.css";
import Navbar from "./Components/common/navbar/Navbar";
import Home from "./Components/pages/home/Home";
import Login from "./Components/pages/login/Login";
import Footer from "./Components/common/footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetallesCat from "./Components/pages/detalleCategorias/DetallesCat";
import Categorias from "./Components/common/categorias/Categorias";
import DetalleTalleres from "./Components/pages/detalleTalleres/DetalleTalleres";
import RegistroUsuario from "./Components/common/registroUsuario/RegistroUsuario";
import { NotificationProvider } from "./Components/context/Notification.context";
import NotificationContainer from "./Components/common/NotificationContainer/NotificationContainer";
import { LocalStorageProvider } from "./Components/context/LocalStorage.context";
//import DetallesServi from "./Components/pages/detallesServicios/detallesServi";
import AdminTalleres from "./Components/pages/admin/adminTalleres/AdminTalleres";
import AdminCategorias from "./Components/pages/admin/adminCategorias/AdminCategorias";
import AdminCiudades from "./Components/pages/admin/adminCiudades/AdminCiudades";
import SearchResults from "./Components/pages/searchResults/SearchResults";
import { SearchInfoProvider } from "./Components/context/SearchInfo.context";
import FavoritosUser from "./Components/pages/userPersonal/favoritos/FavoritosUser";
import ReservasUser from "./Components/pages/userPersonal/reservas/ReservasUser";

function App() {
  return (
    <LocalStorageProvider>
      <NotificationProvider>
        <SearchInfoProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Navbar />}>
                <Route element={<Footer />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/crearUsuario" element={<RegistroUsuario />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/detallesCategoria/:titulo" element={<DetallesCat />} />
                  <Route path="/categorias" element={<Categorias />} />
                  <Route path="/detalleTalleres/:nombre" element={<DetalleTalleres />} />
                  <Route path="/admin/talleres" element={<AdminTalleres/>}/>
                  <Route path="/admin/categorias" element={<AdminCategorias/>}/>
                  <Route path="/admin/ciudades" element={<AdminCiudades/>}/>
                  <Route path="/talleres/results" element={<SearchResults/>}/>
                  <Route path="/user/favs" element={<FavoritosUser/>}/>
                  <Route path="user/reservas" element={<ReservasUser/>}/>
                  {/*<Route path="/serviceDetail/:id" element={<DetallesServi/>}/>
                  <Route path="/registro" element={<Servicios/>} /> */}
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SearchInfoProvider>
        <NotificationContainer />
      </NotificationProvider>
    </LocalStorageProvider>
  );
}

export default App;
