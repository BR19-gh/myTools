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
} from "react-native";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SweetSFSymbol from "sweet-sfsymbols";

import { useEffect, useState } from "react";

import { connect } from "react-redux";

import { useTranslation } from "react-i18next";

import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function DiscountCal({ theme }) {
  const { t } = useTranslation();
  const text = (text) => "screens.Home.DiscountCal.text." + text;
  const secondInput = useRef(null);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  const [discountAmount, setDiscountAmount] = useState("0");
  const [priceAfter, setPriceAfter] = useState("0");

  const focusOnSecondInput = () => {
    if (secondInput && secondInput.current) {
      secondInput.current.focus();
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const a2e = (s) => {
    if (s) return s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  };

  const calculate = () => {
    if (price && discount) {
      let priceInEn = a2e(price);
      let discountInEn = a2e(discount);

      let discountAmount = priceInEn * (discountInEn / 100);
      let priceAfter = priceInEn - discountAmount;

      if (discountAmount.toString().includes(".")) {
        setDiscountAmount(discountAmount.toFixed(2));
      } else {
        setDiscountAmount(discountAmount);
      }
      if (priceAfter.toString().includes(".")) {
        setPriceAfter(priceAfter.toFixed(2));
      } else {
        setPriceAfter(priceAfter);
      }
    }
  };

  const reset = () => {
    setPrice("");
    setDiscount("");
    setDiscountAmount("0");
    setPriceAfter("0");
  };

  const isDark = (darkOp, lightp) => (theme === "dark" ? darkOp : lightp);

  return (
    <View>
      <ScrollView className="h-full">
        <View className={"w-full mt-28 items-center"}>
          <View className={"w-full flex-row justify-evenly"}>
            <View>
              <Text
                className={
                  "text-center p-4 text-3xl font-semibold" +
                  isDark(" text-blue-100", " text-blue-900")
                }
              >
                {t(text("price"))}
              </Text>
              <TextInput
                style={{
                  backgroundColor: isDark("#CCCCCC", "#FFFFFF"),
                  width: 150,
                  height: 150,
                  fontSize: price ? 40 : 20,
                  textAlign: "center",
                  color: isDark("#283dab", "#283987"),
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#283dab88",
                }}
                blurOnSubmit={false}
                returnKeyType={"done"}
                onSubmitEditing={focusOnSecondInput}
                value={price}
                onChangeText={(value) => setPrice(value)}
                onFocus={() => setPrice("")}
                placeholderTextColor={isDark("#28398788", "#28398755")}
                placeholder={t(text("price"))}
                keyboardType="numeric"
              />
            </View>
            <View>
              <Text
                className={
                  "text-center p-4 font-semibold text-3xl" +
                  isDark(" text-blue-100", " text-blue-900")
                }
              >
                {t(text("discount"))}
              </Text>
              <TextInput
                ref={secondInput}
                style={{
                  backgroundColor: isDark("#CCCCCC", "#FFFFFF"),
                  width: 150,
                  height: 150,
                  fontSize: discount ? 40 : 20,
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
                value={discount}
                onFocus={() => setDiscount("")}
                onChangeText={(value) => setDiscount(value)}
                placeholderTextColor={isDark("#28398788", "#28398755")}
                placeholder={t(text("discount"))}
              />
            </View>
          </View>

          <View className={"items-center"}>
            <TouchableOpacity
              className={
                "rounded-lg w-48 h-20 mt-10 flex-row items-center justify-evenly" +
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

          <View className="w-full flex-row flex-wrap mt-14">
            <View className="w-full flex-row p-2 text-left">
              <Text
                className={
                  "text-2xl" + isDark(" text-blue-100", " text-blue-900")
                }
              >
                {t(text("priceAfter"))}
              </Text>
              <Text
                className={
                  "text-3xl font-semibold" +
                  isDark(" text-blue-100", " text-blue-900")
                }
              >
                {priceAfter}
              </Text>
            </View>
            <View className="flex-row p-2">
              <Text
                className={
                  "text-2xl" + isDark(" text-blue-100", " text-blue-900")
                }
              >
                {t(text("discountAmount"))}
              </Text>
              <Text
                className={
                  "text-3xl font-semibold" +
                  isDark(" text-blue-100", " text-blue-900")
                }
              >
                {discountAmount}
              </Text>
            </View>
          </View>
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

export default connect(mapStateToProps)(DiscountCal);
