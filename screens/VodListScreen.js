import { useEffect, useState, useContext } from "react";

import { FlatList } from "react-native";

import AppContext from "../context/AppContext";

import { FullView, InputSearch, theme } from "../theme/Components";

import ListItem from "../components/ListItem";

import { addFav } from "../theme/getFavs";

export default function VodListScreen({ navigation, route }) {
  const { category_id, category_name } = route.params;

  const user = useContext(AppContext).user;

  const [categories, setCategories] = useState([]);

  const [unfilteredCategories, setUnfilteredCategories] = useState([]);

  const [search, setSearch] = useState("");

  function onChangeText(value) {
    setSearch(value);
    // filter
    if (value.trim() !== "") {
      setCategories(
        unfilteredCategories.filter((item) => {
          return item.name.toLowerCase().includes(value.toLowerCase());
        })
      );
    } else {
      setCategories(unfilteredCategories);
    }
  }

  function onReset() {
    setSearch("");
    setCategories(unfilteredCategories);
  }

  function showVideo(item) {
    navigation.navigate("VodDetails", { item, category_name });
  }

  const addToFavs = (item) => {
    addFav('vod', item);
  }

  useEffect(() => {
    let cleanUp = false;

    navigation.setOptions({
      title: `${theme.labelVod}: ${category_name}`,
      headerStyle: {
        backgroundColor: theme.icoVodColor,
      },
    });

    fetch(
      `${user.apiUrl}player_api.php?username=${user.username}&password=${user.password}&action=get_vod_streams&category_id=${category_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // reverse order to get last entered movies first
        data.reverse();
        setCategories(data);
        setUnfilteredCategories(data);
      })
      .catch((err) => console.error(err));

    return () => {
      cleanUp = !cleanUp;
    };
  }, []);

  return (
    <FullView>
      <InputSearch
        value={search}
        placeholder='Buscar'
        onChangeText={onChangeText}
        onReset={onReset}
      />
      <FlatList
        data={categories}
        numColumns={3}
        renderItem={({ item }) => (
          <ListItem item={item} showVideo={showVideo} addToFavs={addToFavs} />
        )}
      />
    </FullView>
  );
}
