import { useEffect, useState, useContext } from "react";

import { TouchableOpacity } from "react-native";

import { SvgXml } from "react-native-svg";

import AppContext from "../context/AppContext";

import Credits from "../components/Credits";

import { logo, ico_series, ico_live, ico_vod, power_off } from "../svg/Images";

import {
  dimensions,
  theme,
  CenteredFullView,
  Texto,
  Toast,
  Container,
  Center,
  Br,
} from "../theme/Components";

import MenuItem from "../components/MenuItem";

function getExpirationDate(data) {
  const x = new Date(data.user_info.exp_date * 1000)
      .toISOString()
      .substring(0, 10),
    y = {
      "01": "Enero",
      "02": "Febrero",
      "03": "Marzo",
      "04": "Abril",
      "05": "Mayo",
      "06": "Junio",
      "07": "Julio",
      "08": "Agosto",
      "09": "Setiembre",
      10: "Octubre",
      11: "Noviembre",
      12: "Diciembre",
    };
  return `Expira: ${x.substring(8)} de ${
    y[x.substring(5, 7)]
  } del ${x.substring(0, 4)}`;
}

export default function MenuScreen({ navigation }) {
  const user = useContext(AppContext).user;

  const [expirationText, setExpirationText] = useState("Actualizando...");
  const [isActive, setIsActive] = useState(false);

  const iconHeight = 30;

  useEffect(() => {
    let fetchIt = false;
    fetch(`${user.apiUrl}player_api.php?username=${user.username}&password=${user.password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user_info.auth === 1) {
          setIsActive(true);
          setExpirationText(getExpirationDate(data));
        } else {
          setIsActive(false);
          setExpirationText(Constant.expiredAccount);
        }
      })
      .catch((err) => {
        console.error("Fetching error", err);
        Toast("Fetching error!");
      });
    return () => {
      fetchIt = !fetchIt;
    };
  }, []);

  return (
    <>
      <CenteredFullView>
        <Container width={dimensions.loginFormWidth}>
          <Center>
            <SvgXml xml={logo} width={120} height={60} />
          </Center>

          <MenuItem action='live' backgroundColor={theme.icoLiveColor}>
            <Texto>{theme.labelLive}</Texto>
            <SvgXml xml={ico_live} height={30} />
          </MenuItem>

          <MenuItem action='series' backgroundColor={theme.icoSeriesColor}>
            <Texto>{theme.labelSeries}</Texto>
            <SvgXml xml={ico_series} height={30} />
          </MenuItem>

          <MenuItem action='vod' backgroundColor={theme.icoVodColor}>
            <Texto>{theme.labelVod}</Texto>
            <SvgXml xml={ico_vod} height={30} />
          </MenuItem>

          <Texto type='small' center>
            {expirationText}
          </Texto>
          <Br />
          <TouchableOpacity onPress={() => navigation.navigate("Logout")}>
            <Center>
              <SvgXml xml={power_off} height={30} />
            </Center>
          </TouchableOpacity>
        </Container>
      </CenteredFullView>
      <Credits />
    </>
  );
}
