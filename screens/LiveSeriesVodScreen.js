import { useContext, useEffect, useState, useCallback } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { FlatList } from "react-native";

import AppContext from "../context/AppContext";

import { theme, InputSearch, FullView, Separator } from "../theme/Components";

import CategoryItem from "../components/CategoryItem";

import Favorites from "../components/Favorites";

import { getFavs, removeFav } from "../theme/getFavs";

const actions = {
  live: "Live",
  series: "Series",
  vod: "Vod",
};

export default function LiveSeriesVod({ route }) {
  const navigation = useNavigation(),
    action = route.params.action;

  const [categories, setCategories] = useState([]);

  const [unfilteredCategories, setUnfilteredCategories] = useState([]);

  const [search, setSearch] = useState("");

  const user = useContext(AppContext).user;

  const [favorites, setFavorites] = useState([]);

  function onChangeText(value) {
    setSearch(value);
    // filter
    if (value.trim() !== "") {
      setCategories(
        unfilteredCategories.filter((item) => {
          return item.category_name.toLowerCase().includes(value.toLowerCase());
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

  function goToCategoryDetail(item) {
    // uppercase the first letter of 'action'
    navigation.navigate(actions[action], item);
  }

  function removeFromFavs(item){
    // remove item from favorite
    removeFav(action, item).then(res => setFavorites(res));
  }
  
  // update favorites
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const updateFavs = async (action) => {
        try{
          const favs = await getFavs(action);
          if(isActive){
            setFavorites(favs);
          }
        }
        catch(err){
          console.error("Fetch error!", err);
        }
      }

      updateFavs(action);

      return () => {
        isActive = false;
      }
    }, [])
  );

  // navigation title useEffect
  useEffect(() => {
    let title, backgroundColor;

    if (action === "live") {
      title = theme.labelLive;
      backgroundColor = theme.icoLiveColor;
    } else if (action === "series") {
      title = theme.labelSeries;
      backgroundColor = theme.icoSeriesColor;
    } else {
      title = theme.labelVod;
      backgroundColor = theme.icoVodColor;
    }

    navigation.setOptions({
      title,
      headerStyle: {
        backgroundColor,
      },
    });

    // load favs at first time
    getFavs(action)
      .then(res => setFavorites(res));

    // foo var to clean up the component
    let cleanUp = false;

    fetch(
      `${user.apiUrl}player_api.php?username=${user.username}&password=${user.password}&action=get_${action}_categories`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setUnfilteredCategories(data);
      })
      .catch((err) => {
        console.error("Fetch error!", err);
      });

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
        ListHeaderComponent={favorites.length > 0 ? 
          <Favorites
            type={action}
            favorites={favorites}
            removeFromFavs={removeFromFavs}
          /> : null
        }
        data={categories}
        keyExtractor={(item) => item.category_id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <CategoryItem item={item} onPress={goToCategoryDetail} />
        )}
      />
    </FullView>
  );
}
