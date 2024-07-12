import { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";

import Constants from "expo-constants";

import { SvgXml } from "react-native-svg";

export function Input({ label, placeholder, value, setValue }) {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(value) => setValue(value)}
        autoComplete='off'
        autoCorrect={false}
        placeholder={placeholder}
      />
    </>
  );
}

export function InputPassword({ label, placeholder, value, setValue }) {
  const [secure, setSecure] = useState(true);

  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry={secure}
          style={styles.inputPassword}
          value={value}
          onChangeText={(value) => setValue(value)}
          autoComplete='off'
          autoCorrect={false}
          placeholder={placeholder}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <SvgXml
            xml='<svg viewBox="0 0 128 128" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0" y="0" width="128" height="128"><path d="M 37.8776 64.0004 C 37.8776 49.4042 49.5728 37.572 64 37.572 C 78.4272 37.572 90.1224 49.4042 90.1224 64.0004 C 90.1224 78.5965 78.4272 90.4286 64 90.4286 C 49.5728 90.4286 37.8776 78.5965 37.8776 64.0004 ZM 64 27.0007 C 38.5306 26.8686 18.2857 45.1041 0 64.0004 C 18.2857 82.8962 38.5306 101.1314 64 100.9993 C 89.4694 101.1314 109.7144 82.8964 128 64.0007 C 109.7144 45.1047 89.4694 26.8686 64 27.0007 Z" fill="#fff"/><path d="M 48.849 64.0004 C 48.849 72.4661 55.6322 79.3288 64 79.3288 C 72.3678 79.3288 79.151 72.4661 79.151 64.0004 C 79.151 63.2708 79.1008 62.5529 79.0034 61.8504 C 77.4166 63.1924 75.3729 64.0004 73.1428 64.0004 C 68.0933 64.0004 64 59.8591 64 54.7504 C 64 52.4943 64.7986 50.4266 66.1251 48.8213 C 65.4308 48.7227 64.7212 48.6719 64 48.6719 C 55.6322 48.6719 48.849 55.5346 48.849 64.0004 Z" fill="#fff"/></svg>'
            width={dimensions.fontSize}
            height={dimensions.fontSize}
            style={{ opacity: secure ? 1 : 0.5 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export function InputPhone({ label, placeholder, value, setValue }) {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        dataDetectorTypes='phoneNumber'
        style={styles.input}
        value={value}
        onChangeText={(value) => setValue(value)}
        autoComplete='off'
        autoCorrect={false}
        placeholder={placeholder}
      />
    </>
  );
}

export function InputLink({ label, placeholder, value, setValue }) {
  return (
    <>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        dataDetectorTypes='link'
        style={styles.input}
        value={value}
        onChangeText={(value) => setValue(value)}
        autoComplete='off'
        autoCorrect={false}
        placeholder={placeholder}
      />
    </>
  );
}

export function Textarea({
  label,
  placeholder,
  value,
  setValue,
  numberOfLines = 5,
}) {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        multiline
        style={styles.input}
        value={value}
        numberOfLines={numberOfLines}
        onChangeText={(value) => setValue(value)}
        autoComplete='off'
        autoCorrect={false}
        placeholder={placeholder}
        textAlignVertical='top'
      />
    </>
  );
}

export function InputSearch({ value, placeholder, onChangeText, onReset }) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBorder}>
        <TextInput
          placeholderTextColor='#ccc'
          style={styles.inputSearch}
          placeholder={placeholder}
          value={value}
          onChangeText={(value) => onChangeText(value)}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onReset()}>
            <SvgXml
              xml='<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0" y="0" width="24" height="24"><path d="M 24 2.4171 L 21.5829 0 L 12 9.5829 L 2.4171 0 L 0 2.4171 L 9.5829 12 L 0 21.5829 L 2.4171 24 L 12 14.4171 L 21.5829 24 L 24 21.5829 L 14.4171 12 L 24 2.4171 Z" fill="#fff"/></svg>'
              width={dimensions.searcherFontSize}
              height={dimensions.searcherFontSize}
              style={styles.searcheCloser}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function InputSelect({indexValue, options, onPress}){
  const defTransform = '0deg';

  const [showOptions, setShowOptions] = useState(false)

  const [transform, setTransform] = useState(defTransform)

  function handlePress(){
    toggleSelector()
  }

  function toggleSelector(){
    setShowOptions(!showOptions)
    setTransform(prev => prev === defTransform ? '180deg' : defTransform)
  }

  function handleSelection(item, index){
    onPress(item, index);
    toggleSelector()
  }

  const optionsList = options.map((item, index) => 
    <TouchableOpacity
      key={index}
      style={styles.selectOption}
      onPress={() => handleSelection(item, index)}
    >
      <Text style={styles.optionLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity style={styles.inputSelect} onPress={() => handlePress()}>
        <Text style={styles.selectLabel}>{options[indexValue].label}</Text>
        <SvgXml xml='<svg viewBox="0 0 128 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0" y="0" width="128" height="78"><path d="M 18.9576 2.0047 C 16.2827 -0.6682 11.946 -0.6682 9.2711 2.0047 L 2.0062 9.2644 C -0.6687 11.9373 -0.6687 16.2709 2.0062 18.9439 L 51.8918 68.7934 L 59.1567 76.053 C 61.8316 78.7259 66.1684 78.7259 68.8432 76.053 L 76.1082 68.7934 L 125.9938 18.9439 C 128.6687 16.2709 128.6687 11.9373 125.9938 9.2644 L 118.7289 2.0047 C 116.054 -0.6682 111.7173 -0.6682 109.0424 2.0047 L 64 47.0144 L 18.9576 2.0047 L 18.9576 2.0047 Z" fill="#fff"/></svg>'
          width={20}
          height={10}
          style={{transform: [{ rotate: transform }]}}
        />
      </TouchableOpacity>
      {showOptions && <View style={styles.inputSelectOptionsContainer}>
        <View style={styles.inputSelectOptions}>{optionsList}</View>
      </View>}
      
    </>
  )
}

export function Texto({ children, type, center, bold }) {
  return (
    <Text
      style={{
        ...styles.text,
        fontSize: type ? dimensions[type] : dimensions.fontSize,
        textAlign: center ? "center" : "left",
        fontWeight: bold ? "bold" : "normal",
      }}>
      {children}
    </Text>
  );
}

export function Bold({ children }) {
  return <Text style={styles.bold}>{children}</Text>;
}

export function Boton({ label, rounded, backgroundColor, onPress }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        borderRadius: rounded ? dimensions.borderRadius : 0,
        backgroundColor: backgroundColor
          ? backgroundColor
          : dimensions.buttonBgColor,
      }}
      onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function IconButton({
  label,
  rounded,
  backgroundColor,
  children,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        borderRadius: rounded ? dimensions.borderRadius : 0,
        backgroundColor: backgroundColor
          ? backgroundColor
          : dimensions.buttonBgColor,
      }}
      onPress={onPress}>
      <Text
        style={{ ...styles.buttonText, marginRight: dimensions.inputPadding }}>
        {label}
      </Text>
      {children}
    </TouchableOpacity>
  );
}

export function Fab({ children, backgroundColor, onPress }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.fab,
        backgroundColor: backgroundColor
          ? backgroundColor
          : dimensions.buttonBgColor,
      }}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

export function Center({ children }) {
  return <View style={styles.center}>{children}</View>;
}

export function FullView({ children, padded, noTopMargin }) {
  return (
    <View
      style={{
        ...styles.fullView,
        padding: padded ? dimensions.padding : 0,
        marginTop: noTopMargin ? 0 : Constants.marginTop,
      }}>
      {children}
    </View>
  );
}

export function CenteredFullView({ children, padded, noTopMargin }) {
  return (
    <View
      style={{
        ...styles.fullView,
        ...styles.centeredFullView,
        padding: padded ? dimensions.padding : 0,
        marginTop: noTopMargin ? 0 : Constants.marginTop,
      }}>
      {children}
    </View>
  );
}

export function Container({ children, width, padded, backgroundColor }) {
  return (
    <View
      style={{
        width: width ? width : "100%",
        padding: padded ? dimensions.padding : 0,
        backgroundColor: backgroundColor ? backgroundColor : "transparent",
      }}>
      {children}
    </View>
  );
}

export function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size='large' color={dimensions.themeColor} />
    </View>
  );
}

export function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

export function Column({ children }) {
  return <View style={styles.column}>{children}</View>;
}

export function UnavailableStream({ navigation, label }) {
  return (
    <View style={styles.unavailble}>
      <Texto>{label}</Texto>
      <TouchableOpacity
        style={styles.unavailbleButton}
        onPress={() => navigation.pop()}>
        <SvgXml
          style={styles.unavailbleIcon}
          xml='<svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0" y="0" width="24" height="24"><path d="M 24 10.5 L 5.745 10.5 L 14.13 2.115 L 12 0 L 0 12 L 12 24 L 14.115 21.885 L 5.745 13.5 L 24 13.5 L 24 10.5 L 24 10.5 Z" fill="#fff"/></svg>'
        />
      </TouchableOpacity>
    </View>
  );
}

export function Select({season, seasons, onPress}){
  const defTransform = '0deg';

  const [showOptions, setShowOptions] = useState(false)

  const [transform, setTransform] = useState(defTransform)

  function handlePress(){
    toggleSelector()
  }

  function toggleSelector(){
    setShowOptions(!showOptions)
    setTransform(prev => prev === defTransform ? '180deg' : defTransform)
  }

  function handleSelection(i){
    onPress(i);
    toggleSelector()
  }

  let options = [];

  for(let i = 1; i <= seasons; i++){
    options.push(<TouchableOpacity key={i} style={styles.selectOption} onPress={() => handleSelection(i)}>
      <Text style={styles.optionLabel}>Temporada {i}</Text>
    </TouchableOpacity>)
  }

  return (
    <>
      <TouchableOpacity style={styles.select} onPress={() => handlePress()}>
        <Text style={styles.selectLabel}>Temporada {season}</Text>
        <SvgXml xml='<svg viewBox="0 0 128 78" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0" y="0" width="128" height="78"><path d="M 18.9576 2.0047 C 16.2827 -0.6682 11.946 -0.6682 9.2711 2.0047 L 2.0062 9.2644 C -0.6687 11.9373 -0.6687 16.2709 2.0062 18.9439 L 51.8918 68.7934 L 59.1567 76.053 C 61.8316 78.7259 66.1684 78.7259 68.8432 76.053 L 76.1082 68.7934 L 125.9938 18.9439 C 128.6687 16.2709 128.6687 11.9373 125.9938 9.2644 L 118.7289 2.0047 C 116.054 -0.6682 111.7173 -0.6682 109.0424 2.0047 L 64 47.0144 L 18.9576 2.0047 L 18.9576 2.0047 Z" fill="#fff"/></svg>'
          width={20}
          height={10}
          style={{transform: [{ rotate: transform }]}}
        />
      </TouchableOpacity>
      <View>
        {showOptions && <View style={styles.selectOptions}>{options}</View>}
      </View>
    </>
  )
}

export function Br() {
  return <View style={styles.br} />;
}

export function Hr() {
  return <View style={styles.hr} />;
}

export function Separator() {
  return <View style={styles.separator} />;
}

export function Toast(str) {
  ToastAndroid.show(str, ToastAndroid.LONG);
}

export const dimensions = {
  padding: 15,
  fontSize: 20,
  searcherFontSize: 18,
  h1: 24,
  h2: 22,
  small: 16,
  inputPadding: 5,
  elevation: 3,
  borderRadius: 5,
  buttonBgColor: "#aa323c",
  buttonColor: "#fff",
  fabSize: 60,
  roundedButtonSize: 50,
  color: "#fff",
  hrColor: "#ccc",
  inputBorderColor: "#fff",
  backgroundColor: "#222",
  backgroundColorAlpha: "rgba(34,34,34,.8)",
  themeColor: "#aa323c",
  colorGreen: "#206E63",
  colorBlue: "#2A4574",
  colorPurple: "#9E39B1",
  colorYellow: '#D2A75A',
  loginFormWidth: 280,
  loaderBgColor: "#000",
  zIndexFab: 10,
  zIndexLoader: 50,
  channelImageSize: 160,
};

export const theme = {
  icoLiveColor: dimensions.colorBlue,
  labelLive: "TV en vivo",
  icoSeriesColor: dimensions.colorGreen,
  labelSeries: "Series",
  icoVodColor: dimensions.colorPurple,
  labelVod: "Películas",
};

export const styles = StyleSheet.create({
  input: {
    borderBottomColor: dimensions.inputBorderColor,
    borderBottomWidth: 1,
    marginBottom: dimensions.padding,
    fontSize: dimensions.fontSize,
    paddingVertical: dimensions.inputPadding,
    color: dimensions.color,
  },
  inputLabel: {
    color: dimensions.color,
    opacity: 0.5,
  },
  passwordContainer: {
    borderBottomColor: dimensions.inputBorderColor,
    borderBottomWidth: 1,
    flexDirection: "row",
    marginBottom: dimensions.padding,
    alignItems: "center",
  },
  inputPassword: {
    fontSize: dimensions.fontSize,
    paddingVertical: dimensions.inputPadding,
    color: dimensions.color,
    flex: 1,
  },
  text: {
    fontSize: dimensions.fontSize,
    color: dimensions.color,
  },
  bold: {
    fontSize: dimensions.fontSize,
    fontWeight: "bold",
  },
  fullView: {
    flex: 1,
    backgroundColor: dimensions.backgroundColor,
  },
  centeredFullView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dimensions.backgroundColor,
  },
  loader: {
    flex: 1,
    backgroundColor: dimensions.loaderBgColor,
    position: "absolute",
    zIndex: dimensions.zIndexLoader,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.5,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: dimensions.buttonBgColor,
    paddingHorizontal: dimensions.padding,
    paddingVertical: dimensions.padding / 2,
    elevation: dimensions.elevation,
  },
  buttonText: {
    fontSize: dimensions.fontSize,
    color: dimensions.buttonColor,
  },
  fab: {
    position: "absolute",
    bottom: dimensions.padding,
    right: dimensions.padding,
    backgroundColor: dimensions.buttonBgColor,
    width: dimensions.fabSize,
    height: dimensions.fabSize,
    borderRadius: dimensions.fabSize / 2,
    elevation: dimensions.elevation,
    justifyContent: "center",
    alignItems: "center",
    zIndex: dimensions.zIndexFab,
  },
  center: {
    alignItems: "center",
  },
  br: {
    height: dimensions.padding,
  },
  hr: {
    height: 0,
    borderBottomColor: dimensions.hrColor,
    borderBottomWidth: 1,
    marginVertical: dimensions.padding,
    width: "100%",
  },
  separator: {
    height: 0,
    borderBottomColor: dimensions.hrColor,
    borderBottomWidth: 1,
    width: "100%",
  },
  // searcher
  searchContainer: {
    padding: dimensions.padding,
  },
  searchBorder: {
    borderWidth: 1,
    borderColor: dimensions.hrColor,
    borderRadius: 50, // a huge number to get perfect rounded corners
    flexDirection: "row",
    alignItems: "center",
  },
  inputSearch: {
    color: dimensions.color,
    fontSize: dimensions.searcherFontSize,
    paddingVertical: dimensions.inputPadding,
    paddingHorizontal: dimensions.padding,
    flex: 1,
  },
  searcheCloser: {
    marginRight: dimensions.padding,
  },
  // unavailable stream modal
  unavailble: {
    backgroundColor: dimensions.loaderBgColor,
    position: "absolute",
    zIndex: dimensions.zIndexLoader,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  unavailbleButton: {
    backgroundColor: dimensions.colorGreen,
    width: dimensions.roundedButtonSize,
    height: dimensions.roundedButtonSize,
    borderRadius: dimensions.roundedButtonSize / 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  unavailbleIcon: {
    width: 10,
    height: 10,
  },
  // grid
  row: {
    flexDirection: "row",
    marginBottom: dimensions.padding,
  },
  column: {
    flex: 1,
  },
  // input select
  inputSelect: {
    flexDirection: "row",
    alignItems: "center",
    padding: dimensions.inputPadding,
    marginBottom: dimensions.padding,
  },
  inputSelectOptionsContainer: {
    position: 'relative',
    zIndex: 10,
    height: 1
  },
  inputSelectOptions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    backgroundColor: '#fff',
  },
  // select
  select: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: dimensions.colorGreen,
    padding: dimensions.inputPadding
  },
  selectLabel:{
    flex: 1,
    color: dimensions.color,
    fontSize: dimensions.fontSize
  },
  selectOptions:{
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 20,
    elevation: dimensions.elevation,
  },
  selectOption:{
    padding: dimensions.padding,
  },
  optionLabel:{
    fontSize: dimensions.small
  }
});
