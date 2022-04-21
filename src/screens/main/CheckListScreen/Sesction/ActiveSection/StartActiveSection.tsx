import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./Styles";
import React, {useCallback, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import SubElement from "@screens/main/CheckListScreen/Sesction/SubElement/SubElement";
import FadeInAnimationView from "@screens/main/CheckListScreen/Sesction/ActiveSection/FadeInAnimationView";
import {CheckListInterface, CheckListSectionInterface} from "@interfaces/UserCheckListInterfaces";
import useHelpModal from "~/contexts/HelpModalContext/useHelpModal";
import {getUserCheckListBySubjectId, useUserCheckPost} from "@query/useUserCheckList";
import {useQuery} from "react-query";
import {defaultQueryOptions} from "@query/options";

interface SectionProps {
  sectionIndex: number,
  subjectId: number,
}

const StartActiveSection = React.memo(({sectionIndex, subjectId}: SectionProps) => {
  const { data, isLoading  } = useQuery([`checklist`, {subjectId}], getUserCheckListBySubjectId(subjectId), defaultQueryOptions);
  const { userCheckMutation } = useUserCheckPost(subjectId);
  const checkList: CheckListInterface = data;
  const checkListSections = checkList.checkListSections
  const {sectionTitle, checkListElements} = checkListSections[sectionIndex]
  const { setHelpModal, openHelpModal } = useHelpModal()

  const onChangeCheck =  (id: any, checked: any) => {
    userCheckMutation.mutate({
      id,
      checked
    })
  }

  return (
    <FadeInAnimationView containerStyle={styles.container}>
      <View style={styles.leftView}>
        <Text style={styles.leftViewTextTop}>{sectionTitle}</Text>
      </View>

      {checkListElements.map(checkListElement => {
        const {elementTitle, subElements, id, checked} = checkListElement
        return (
          <View key={id + elementTitle} style={{width: '100%'}}>
            <View style={styles.elementView}>
              <CheckBox
                disabled={false}
                value={checked? checked : false}
                tintColors = {{ true: '#2658CB' , false: 'black' }}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] , marginLeft: 4}}
                onChange={(e) => onChangeCheck(id, checked)}
              />
              <Text style={styles.elementViewText}>{elementTitle}</Text>
              <TouchableOpacity style={styles.elementViewTouch} onPress={() => {
                setHelpModal(checkListElement)
                openHelpModal()
              }}>
                <Image style={styles.elementViewTouchImage} source={require('@assets/question_mark.png')}/>
              </TouchableOpacity>
            </View>

            <View style={styles.subElementRowView}>
              {subElements.map(subElement => {
                const {id, subElementTitle} = subElement
                return (
                  <SubElement key={id + subElementTitle} subElement={subElement}/>
                )
              })}
            </View>
          </View>
        )
      })}

      <View style={styles.imageView}>
        <Image style={styles.imageViewImage} source={require('@assets/circle_blue.png')} />
        <View style={styles.imageViewInnerView}>
          <Text style={styles.imageViewInnerViewText}>{sectionIndex + 1}</Text>
        </View>
      </View>
    </FadeInAnimationView>
  )
})

export default StartActiveSection;
