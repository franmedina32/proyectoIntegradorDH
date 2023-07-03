import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./LoginUsuario.css";
import imgLogin from "../../../Img/imgLogin.png";
import { NotificationContext } from "../../context/Notification.context";
import { LocalStorageContext } from "../../context/LocalStorage.context";
import {LOGGED_USER_STORAGE_KEY, TOKEN_STORAGE_KEY, apiUrl} from "../../../utils/variables"
import { decodeJWT } from "../../../utils";
import { Link } from 'react-router-dom';


const LoginUsuario = () => {
const navigateTo = useNavigate();


const { storage, updateStorage } = useContext(LocalStorageContext);
const { [LOGGED_USER_STORAGE_KEY]: loggedUser } = storage;
const { addNotification } = useContext(NotificationContext);
const [loginData, setLoginData] = useState();
const url = `${apiUrl}/usuario/login`;
const handleSubmit = (e) => {
e.preventDefault();
fetch(url, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(loginData),
}).
then(res => {
if (res.ok) {
res.json().then((data) => {
const user = decodeJWT(data.token);
updateStorage(LOGGED_USER_STORAGE_KEY, user);
updateStorage(TOKEN_STORAGE_KEY, data.token);
addNotification({
texto: `Bienvenid@ ${user.name} :)`,
tipo: "success",
});
});
} else {
addNotification({
texto: "Error, el usuario no pudo iniciar sesión :(",
tipo: "error",
});
}
})
.catch(err => console.log(err))
};


useEffect(() => {
if (loggedUser) navigateTo("/");
}, [JSON.stringify(loggedUser), navigateTo]);


return (
<>
<div className="containerLoginForm">
<div className="imgLogin">
<img src={imgLogin} alt="login" />
</div>
<form className="form-login-container">
<h1>Bienvenido</h1>
<TextField
type="email"
id="outlined-basic"
label="Correo"
variant="outlined"
onChange={(e) => {
setLoginData({ ...loginData, email: e.target.value });
}}
/>
<TextField
type="password"
id="outlined-basic"
label="Contraseña"
variant="outlined"
onChange={(e) => {
setLoginData({ ...loginData, password: e.target.value });
}}
/>


<Button type="submit" variant="contained" onClick={handleSubmit}>
Iniciar Sesión
</Button>
<div className="registrarte">
<Link to={`/crearUsuario`}>
<button>Registrate</button>
</Link>
</div>
</form>
</div>
</>
);
};


export default LoginUsuario;


