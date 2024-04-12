import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import styles from "./styles";
import SweetSFSymbol from "sweet-sfsymbols";

import { useEffect, useState } from "react";

import { connect } from "react-redux";

import { useTranslation } from "react-i18next";

import { useRef } from "react";

import { handleCurrencyConversion } from "../../../store/actions/shared";

// import { lang, CURRENCY_INFO } from "../../../helpers";

import Dropdown from "../../../components/Home/CurrencyCon/Dropdown";

//import { useNetInfo } from "@react-native-community/netinfo";

function CurrencyCon({ theme, dispatch }) {
  const { t } = useTranslation();
  const text = (text) => "screens.Home.CurrencyCon.text." + text;
  const secondInput = useRef(null);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromCurrencyValue, setFromCurrencyValue] = useState("");
  const [toCurrencyValue, setToCurrencyValue] = useState("");
  // const netInfo = useNetInfo();
  // useEffect(() => {
  //   if (netInfo.isConnected === false) {
  //     Alert.alert(
  //       t(text("connectionErrorTitle")),
  //       t(text("connectionErrorMsg")),
  //       [
  //         {
  //           text: t(text("gotIt")),
  //           onPress: () => null,
  //           style: "default",
  //         },
  //       ]
  //     );
  //   }
  // }, [netInfo.isConnected]);

  const [result, setResult] = useState("0");

  // const focusOnSecondInput = () => {
  //   if (secondInput && secondInput.current) {
  //     secondInput.current.focus();
  //   }
  // };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const a2e = (s) => {
    if (s) return s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  };

  const switchCur = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const calculate = () => {
    dispatch(
      handleCurrencyConversion(
        (fromValue = fromCurrencyValue),
        (fromType = fromCurrency.code),
        (toType = toCurrency.code),
        (setResult = setToCurrencyValue)
      )
    );
  };

  const reset = () => {
    setFromCurrency("");
    setToCurrency("");
    setFromCurrencyValue("");
    setToCurrencyValue("");
  };

  const isDark = (darkOp, lightp) => (theme === "dark" ? darkOp : lightp);

  return (
    <View>
      <ScrollView className="h-full">
        <View className={"w-full mt-48 items-center"}>
          <View className={"w-full flex-row justify-evenly"}>
            <View>
              <Dropdown
                theme={theme}
                text={text}
                t={t}
                setCurrency={setFromCurrency}
                currency={fromCurrency}
              />
              <TextInput
                style={{
                  backgroundColor: isDark("#CCCCCC", "#FFFFFF"),
                  width: 150,
                  height: 150,
                  fontSize: fromCurrencyValue ? 40 : 20,
                  textAlign: "center",
                  color: isDark("#283dab", "#283987"),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#283dab88",
                }}
                blurOnSubmit={false}
                returnKeyType={"done"}
                // onSubmitEditing={focusOnSecondInput}
                onSubmitEditing={() => {
                  hideKeyboard();
                }}
                value={fromCurrencyValue}
                onChangeText={(value) => setFromCurrencyValue(value)}
                onFocus={() => setFromCurrencyValue("")}
                placeholderTextColor={isDark("#28398788", "#28398755")}
                placeholder={t(text("from"))}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                switchCur();
              }}
            >
              <SweetSFSymbol
                name={"arrow.left.arrow.right.square.fill"}
                size={30}
                color={isDark("#283dab", "#283987")}
              />
            </TouchableOpacity>
            <View>
              <Dropdown
                theme={theme}
                text={text}
                t={t}
                setCurrency={setToCurrency}
                currency={toCurrency}
              />
              <TextInput
                editable={false}
                selectTextOnFocus={false}
                ref={secondInput}
                style={{
                  backgroundColor: isDark("#888888", "#CCCCCC"),
                  width: 150,
                  height: 150,
                  fontSize: toCurrencyValue ? 40 : 20,
                  textAlign: "center",
                  color: isDark("#283dab", "#283987"),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#283dab88",
                }}
                returnKeyType="done"
                keyboardType="decimal-pad"
                onSubmitEditing={() => {
                  hideKeyboard();
                }}
                value={toCurrencyValue}
                onFocus={() => setToCurrencyValue("")}
                onChangeText={(value) => setToCurrencyValue(value)}
                placeholderTextColor={isDark("#28398788", "#28398755")}
                placeholder={t(text("to"))}
              />
            </View>
          </View>

          <View className={"items-center"}>
            <TouchableOpacity
              className={
                "rounded-lg w-48 h-20 mt-14 flex-row items-center justify-evenly" +
                isDark(" bg-blue-900 ", " bg-blue-500 ")
              }
              onPress={calculate}
            >
              <Text className={styles.btnText}>{t(text("calculate"))}</Text>
              <SweetSFSymbol
                name={"plusminus.circle.fill"}
                size={30}
                colors={["white"]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className={
                "rounded-md w-36 h-14 mt-2.5 flex-row items-center justify-evenly bg-blue-700"
              }
              onPress={reset}
            >
              <Text className={"text-xl text-white text-center"}>
                {t(text("reset"))}
              </Text>
              <SweetSFSymbol
                name={"arrow.counterclockwise.circle.fill"}
                size={20}
                colors={["white"]}
              />
            </TouchableOpacity>
          </View>

          {/* <View className="w-full flex-row flex-wrap mt-10">
            <View className="w-full flex-row p-2 text-left">
              <Text
                className={
                  "text-2xl" + isDark(" text-blue-100", " text-blue-900")
                }
              >
                {t(text("conversionResult"))}
              </Text>
              <Text
                className={
                  "text-3xl font-semibold" +
                  isDark(" text-blue-100", " text-blue-900")
                }
              >
                {result}
              </Text>
            </View>
          </View> */}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const mapStateToProps = ({ tools }) => {
  return {
    tools,
  };
};

export default connect(mapStateToProps)(CurrencyCon);
