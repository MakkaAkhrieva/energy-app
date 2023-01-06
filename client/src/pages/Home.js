import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import LoginForm from "../components/LoginForm";
import { observer } from "mobx-react-lite";
import UserService from "../services/UserService";
import Header from "../components/Header.js";
import Container from "@mui/material/Container";

const Home = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Загрузка.....</div>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <Header />
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <h1>
          {store.isAuth
            ? `Пользователь авторизован ${store.user.email}`
            : "АВТОРИЗУЙСЯ"}
        </h1>

        <h1>
          {store.user.isActivated
            ? "Акаунт подтвержден по почте"
            : "Подтвердите акаунт"}
        </h1>
        <button onClick={() => store.logout()}>Выйти из акаунта</button>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map((user) => {
          return <div key={user.email}>{user.email}</div>;
        })}
      </Container>
    </>
  );
};

export default observer(Home);
