import AsyncStorage from "@react-native-async-storage/async-storage";

import { Toast } from '../theme/Components';

export const getFavs = async (type) => {
  try{
    const str = await AsyncStorage.getItem(`favs_${type}`);
    const array = JSON.parse(str);
    if(array && array.length > 0) {
      return array;
    }
    return [];
  }
  catch(err) {
    console.error('AsyncStorage error!', err.message);
  }
};

export const setFav = async (favorites, type, item) => {
  try{
    // add item at the beginning
    let x = favorites.unshift(item);
    await AsyncStorage.setItem(`favs_${type}`, JSON.stringify(favorites));
    Toast(`${item.name} ha sido agregado a tus favoritos`);
  }
  catch(err){
    console.error('AsyncStorage error!', err.message);
  }
}

export const removeFav = async (type, item) => {
  try{
    const favorites = await getFavs(type);

    // filter
    const x = favorites.filter(i => {
      if(type === 'series'){
        return i.series_id !== item.series_id
      }
      else{
        return i.stream_id !== item.stream_id
      }
    });

    // set
    await AsyncStorage.setItem(`favs_${type}`, JSON.stringify(x));
    Toast(`${item.name} ha sido eliminado de tus favoritos`);

    // return new favs
    return x;
  }
  catch(err){
    console.error('AsyncStorage error!', err.message);
  }
}

export const addFav = async (type, item) => {
  try{
    const favorites = await getFavs(type);

    if(favorites.length > 0){
      // check if item is already registered...
      const x = favorites.filter(i => {
        if(type === 'series'){
          if(i.series_id === item.series_id)
            return i;
        }
        else{
          if(i.stream_id === item.stream_id)
            return i;
        }
        /*if(i.stream_id === item.stream_id)
          return i;*/
      })
  
      if(x.length > 0){
        // item is already registered
        Toast(`${item.name} ya está registrado como favorito`);
      }
      else{
        setFav(favorites, type, item);
      }
    }
    else{
      // add the first item to favorites
      setFav(favorites, type, item);
    }
  }
  catch(err){
    console.error('AsyncStorage error!', err.message);
  }
};