import { useState } from "react";

import {
  dimensions,
  Texto,
  CenteredFullView,
  Container,
  Input,
  InputPassword,
  Center,
  IconButton,
  Br,
  Loader,
  Toast,
  InputLink
} from "../theme/Components";

import { SvgXml } from "react-native-svg";

import { logo, lock } from "../svg/Images";

import {apiUrls} from '../theme/Constants'

import Credits from "../components/Credits";

export default function LoginScreen({ createUser }) {

  const [input, setInput] = useState({
    username: "",
    password: "",
    apiUrl: apiUrls[0].value,
  });

  function normalizeApiUrl(str){
    const x = '/',
      y = str.slice(-1) === x ? '' : x;
    return str + y;
  }

  const [loader, setLoader] = useState(false);

  const wrongCredentials = "Usuario, contraseña y/o servidor equivocado";

  function tryLogin() {
    if (input.username.trim() !== "" && input.password.trim() !== "" && input.apiUrl.trim() !== "") {
      setLoader(true);
      fetch(
        `${normalizeApiUrl(input.apiUrl)}player_api.php?username=${input.username}&password=${input.password}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.user_info.auth === 1 && data.user_info.status === "Active") {
            // check time stamp
            if (data.user_info.exp_date * 1000 > new Date().getTime()) {
              // set user object then call parent function
              createUser({
                username: data.user_info.username,
                password: data.user_info.password,
                apiUrl: normalizeApiUrl(input.apiUrl),
              });
            } else {
              Toast("Tu cuenta ha expirado");
            }
          } else {
            Toast(wrongCredentials);
          }

          setLoader(false);
        })
        .catch((err) => {
          console.error("Fetch error!", err);
          Toast(wrongCredentials);
          setLoader(false);
        });
    } else {
      Toast("Debes completar los datos del formulario");
    }
  }

  return (
    <>
      <CenteredFullView>
        <Container width={dimensions.loginFormWidth}>
          <Center>
            <SvgXml xml={logo} width={200} height={51.4} />
            <Texto>Ingresa tus datos</Texto>
            <Br />
          </Center>

          <Br />
          <Input
            label='Usuario:'
            value={input.username}
            setValue={(value) => setInput({ ...input, username: value })}
          />

          <InputPassword
            label='Contraseña:'
            value={input.password}
            setValue={(value) => setInput({ ...input, password: value })}
          />

          <InputLink
            label='Servidor:'
            value={input.apiUrl}
            setValue={(value) => setInput({...input, apiUrl: value})}
          />

          <IconButton label='Acceder' rounded onPress={() => tryLogin()}>
            <SvgXml xml={lock} width={20} height={20} />
          </IconButton>
        </Container>
      </CenteredFullView>
      <Credits />
      {loader && <Loader />}
    </>
  );
}
