import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import styles from './Styles';
import useHelpModal from "~/contexts/HelpModalContext/useHelpModal";
import {HelpTopicsInterface} from "@interfaces/UserCheckListInterfaces";

const HelpModal = () => {
  const { helpModalState, closeHelpModal }: any = useHelpModal()
  const { helpDescription, helpTopics, helpTitle} = helpModalState
  return (
    <Modal
      animationType="slide"
      hardwareAccelerated={true}
      transparent={true}
      visible={helpModalState.isOpenModal}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        // setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.container}>
        <View style={styles.dimView} />
        <View style={styles.modalView}>
          <View style={styles.modalTitleView}>
            <Text style={styles.modalTitleText}>{helpTitle}</Text>
          </View>

          <View style={styles.modalSubTitleView}>
            <ScrollView>
              <Text style={styles.modalSubTitleText}>
                {helpDescription}
              </Text>
            </ScrollView>
          </View>


          <View style={styles.modalLineView}/>

          <View style={styles.modalTopicView}>
            <Text style={styles.modalTopicTitleText}>비슷한 토픽</Text>
            <View style={styles.modalTopicListView}>
              {
                helpTopics?.map((item: HelpTopicsInterface) => {
                  return (
                    <TouchableOpacity key={item.id + item.helpTopic} style={styles.modalTopicItemTouch}>
                      <Text style={styles.modalTopicItemText}>{item.helpTopic}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>

          <TouchableOpacity style={styles.modalCancelTouch} onPress={closeHelpModal}>
            <Image style={styles.modalCancelImage} source={require('@assets/xbutton.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default HelpModal
