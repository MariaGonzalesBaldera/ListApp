import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { ArrowLeft, Glasses, Sort } from "../../../../Assets/svg";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../../../Utils/fonts";
import colors from "../../../../Utils/colors";

import Mapmg from "../../../../Assets/svg/Chat/messages/map.svg";
import Tall from "../../../../Assets/svg/Chat/messages/tall.svg";
import Baby from "../../../../Assets/svg/Chat/messages/baby.svg";
import People from "../../../../Assets/svg/Chat/messages/people.svg";
import Study from "../../../../Assets/svg/Chat/messages/study.svg";
import Job from "../../../../Assets/svg/Chat/messages/job.svg";
import Politic from "../../../../Assets/svg/Chat/messages/politic.svg";
import Religion from "../../../../Assets/svg/Chat/messages/religion.svg";
import HeaderUser from "../../../../Components/HeaderUser";
import { ThemeContext } from "../../../../Components/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { MeUser } from "../../../../Services/User/UserServices";

export interface DataItemsCardType {
  key: string;
  title?: string;
  description?: string;
  background?: string;
  image?: any;
}

export default function DetailProfilemsg() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const [isDraggable, setIsDraggable] = useState(false);
  const [agreeVisible, setAgreeVisible] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchGetInfo = async () => {
      try {
        const userInfo = await MeUser();
        setUser(userInfo);
        setItemsCard([
          ...(userInfo?.prompts?.map((prompt, index) => ({
            key: `prompt-${prompt.id}-${index}`,
            title: prompt.name,
            description: prompt?.user_prompts_entity?.reply || "",
            background:
              index % 2 == 0
                ? colors.primary.lighest
                : colors.secondary.lighest,
            type: "prompt",
          })) || []),

          ...(userInfo?.photos?.map((photo, index) => ({
            key: `photo-${photo.id}-${index}`,
            image: photo.image_url,
            background: null,
            type: "photo",
          })) || []),
        ]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchGetInfo();
  }, []);
  const [items, setItems] = useState();
  const iconsWithData = [
    { Icon: Mapmg, data: user?.neighborhood },
    { Icon: Tall, data: user?.height },
    { Icon: Baby, data: user?.family_plans?.name },
    { Icon: People, data: user?.religions?.name },
    { Icon: Study, data: user?.school },
    { Icon: Job, data: user?.work },
    { Icon: Politic, data: user?.politicals?.name },
    { Icon: Religion, data: user?.religions?.name },
  ];
  const RowItem = ({ text, Icon, data }: any) => (
    <View style={styles.row}>
      <Icon color={theme.text} height="24" width="24" style={styles.svg} />
      <Text style={[styles.text, { color: theme.text }]}>
        {text} {data}
      </Text>
    </View>
  );

  const renderItem = () => <></>;

  //
  // Render card
  //

  const [itemsCard, setItemsCard] = useState<DataItemsCardType[]>([]);

  const loadSavedOrder = async () => {
    try {
      const storedOrder = await AsyncStorage.getItem("itemsCardOrder");
      if (storedOrder !== null) {
        setItemsCard(JSON.parse(storedOrder));
      }
      setAgreeVisible(true);
    } catch (error) {
      console.error("Error loading order:", error);
      setItemsCard(itemsCard);
    }
  };

  const renderItemCard = ({ item, drag, isActive }: any) => {
    return (
      <TouchableOpacity
        disabled={isDraggable ? false : true}
        key={item.key}
        style={{ opacity: isActive ? 0.8 : 1 }}
        onLongPress={isDraggable ? drag : undefined}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {item.image ? (
            <View style={{ flex: 1, marginVertical: 10 }}>
              <LinearGradient
                colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"]}
                style={{
                  borderRadius: 20,
                  width: "100%",
                  height: 350,
                  zIndex: 1,
                }}
              />
              <Image
                source={{ uri: item.image }}
                style={{
                  borderRadius: 20,
                  width: "100%",
                  height: 350,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: item.background,
                paddingHorizontal: 20,
                paddingVertical: 20,
                borderRadius: 20,
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <View style={{ flex: 1, marginLeft: 8 }}>
                {item.title && (
                  <Text style={[fonts.H4, { color: colors.neutral.darkest }]}>
                    {item.title}
                  </Text>
                )}
                {item.description && (
                  <Text style={[fonts.B1, { color: colors.neutral.darkest }]}>
                    {item.description}
                  </Text>
                )}
              </View>
            </View>
          )}
          {isDraggable ? (
            <View style={{ paddingVertical: 30, marginLeft: 5 }}>
              <Sort style={{ marginRight: 10 }} />
            </View>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  };
 
  const saveOrder = async (newOrder: DataItemsCardType[]) => {
    try {
      await AsyncStorage.setItem("itemsCardOrder", JSON.stringify(newOrder));
      await AsyncStorage.setItem("InfoUser", JSON.stringify({user:user?.profile_image,about:user?.description,item:iconsWithData}));
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const savedOrder = await AsyncStorage.getItem('itemsCardOrder');
        if (savedOrder) {
          setItemsCard(JSON.parse(savedOrder));
        }
      } catch (error) {
        console.error('Error loading order:', error);
      }
    };
    loadOrder();
  }, []);
  const onDragEndHandler = ({ data }: { data: DataItemsCardType[] }) => {
    setItemsCard(data);
    saveOrder(data);
  };

  const GenericModal = ({ visible, onClose, children }: any) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground2}>
          <View style={styles.modalView2}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
  const ModalAgree = ({ visible, onClose }: any) => (
    <GenericModal visible={visible} onClose={onClose}>
      <Text style={[styles.modalTitle, fonts.H4, { marginTop: 12 }]}>
        Your changes were saved successfully
      </Text>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            onClose;
             navigation.goBack();
          }}
        >
          <Text style={[styles.buttonText, fonts.Btn]}>Done</Text>
        </TouchableOpacity>
      </View>
    </GenericModal>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <HeaderUser
        text="Edit my profile"
        svg={<ArrowLeft color={theme.text} />}
        svg2={<Glasses color={theme.text} />}
        onPress={() => navigation.goBack()}
        onPress2={() => console.log("Glasses")}
      />
      <ModalAgree
        visible={agreeVisible}
        onClose={() => setAgreeVisible(false)}
      />
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListHeaderComponent={
          <>
            <View>
              <TouchableOpacity
                onPress={() => setIsDraggable((prev) => !prev)}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderColor: colors.primary.medium,
                  borderWidth: 1,
                  padding: 20,
                  borderRadius: 10,
                  borderStyle: "dashed",
                  flexDirection: "row",
                }}
              >
                <Sort />
                <Text style={[styles.section3, fonts.B5]}>
                  Sort your photos and prompts{" "}
                </Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 10 }}>
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"]}
                  style={{
                    borderRadius: 20,
                    width: "100%",
                    height: 350,
                    zIndex: 1,
                  }}
                />

                <Image
                  source={{
                    uri:
                      user?.profile_image ||
                      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
                  }}
                  style={{
                    borderRadius: 20,
                    width: "100%",
                    height: 350,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    paddingBottom: 20,
                    zIndex: 2,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={[
                      {
                        color: colors.neutral.white,
                        paddingHorizontal: 12,
                        marginRight: 0,
                      },
                      fonts.H3,
                    ]}
                  >
                    {user?.name} {user?.age ? ", " + user?.age : ""}
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1, marginVertical: 15 }}>
                <Text style={[fonts.H4, { color: theme.text }]}>About me</Text>
                <Text
                  style={[fonts.B1, { color: theme.text, marginVertical: 10 }]}
                >
                  {user?.description}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <ScrollView showsHorizontalScrollIndicator={false}>
                {iconsWithData.map(
                  (item, index) =>
                    item.data ? ( // Verifica si item.data no está vacío
                      <View
                        key={index}
                        style={{
                          marginRight: 10,
                          flexDirection: "row",
                          marginTop: 0,
                        }}
                      >
                        <RowItem text={``} Icon={item.Icon} data={item.data} />
                      </View>
                    ) : null // No renderiza nada si item.data está vacío
                )}
              </ScrollView>
            </View>
          </>
        }
        ListFooterComponent={
          <DraggableFlatList
            data={itemsCard}
            renderItem={renderItemCard}
            keyExtractor={(item) => item.key}
            onDragEnd={onDragEndHandler}
            containerStyle={{ marginBottom: 20 }}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
      {isDraggable ? (
        <TouchableOpacity style={styles.button3} onPress={loadSavedOrder}>
          <Text
            style={[
              fonts.Btn,
              {
                color: colors.neutral.white,
              },
            ]}
          >
            Save change
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  svg: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
  rowItem: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  activeItem: {
    backgroundColor: colors.primary.lighest,
  },
  modalView2: {
    backgroundColor: colors.neutral.white,
    borderRadius: 20,
    padding: 20,
    width: "80%",
    position: "relative",
  },
  modalBackground2: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  horizontalButtonContainer: {
    width: "100%",
    marginTop: 12,
  },
  verticalButtonContainer: {
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: colors.primary.medium,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  buttonText: {
    color: colors.neutral.white,
    justifyContent: "center",
    alignSelf: "center",
  },
  cancelButton: {
    backgroundColor: colors.neutral.darkest,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },

  section3: {
    color: colors.primary.medium,
    marginLeft: 12,
  },
  button3: {
    backgroundColor: colors.primary.medium,
    borderRadius: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 16,
  },
});
