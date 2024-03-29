import { Text, View, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { LinearGradient } from "expo-linear-gradient";

const Card = ({
  tool,
  changeVis,
  handleFavorite,
  isEditing,
  navigation,
  drag,
  isActive,
  t,
  text,
  lang,
  theme,
  isShowedFavorite,
  isEditingFavorite,
}) => (
  <LinearGradient
    key={tool.id}
    colors={[...tool.colors]}
    style={{
      marginStart: "4%",
      opacity: isEditingFavorite
        ? !tool.isFavorite
          ? 0.2
          : 0.7
        : isEditing
        ? tool.isHidden
          ? 0.2
          : 0.7
        : 1,

      borderWidth: isEditingFavorite || isEditing ? 3.5 : 0,
      borderColor: theme === "dark" ? "gray" : "black",
      width: "92%",
    }}
    className="h-36 rounded-lg mb-1 mt-1"
  >
    <TouchableOpacity
      key={tool.id}
      className={"flex-row flex-wrap justify-center h-full w-full"}
      onPress={() => {
        if (isEditing) {
          changeVis(tool.id);
        } else if (isEditingFavorite) {
          handleFavorite(tool.id);
        } else {
          navigation.navigate(tool.link);
        }
      }}
      onLongPress={() =>
        isEditing
          ? Alert.alert(
              t(text("unableToMove")),
              t(text("youCannotMoveToolsWhileEditing")),
              [
                {
                  text: t(text("gotIt")),
                  onPress: () => null,
                  style: "Ok",
                },
              ]
            )
          : isShowedFavorite || isEditingFavorite
          ? Alert.alert(
              t(text("unableToMove")),
              t(text("youCannotMoveToolsInFavorite")),
              [
                {
                  text: t(text("gotIt")),
                  onPress: () => null,
                  style: "Ok",
                },
              ]
            )
          : drag()
      }
      disabled={isActive}
    >
      <View className="flex-row w-full justify-start">
        <MaterialCommunityIcons
          className={styles.icon}
          name={tool.icon}
          size={24}
          color="white"
          style={{
            width: "11%",
          }}
        />
        <Text
          className={styles.btnText}
          style={{
            width: "85%",
          }}
        >
          {lang === "en" ? tool.name.en : tool.name.ar}
        </Text>
      </View>
    </TouchableOpacity>
  </LinearGradient>
);

export default Card;
