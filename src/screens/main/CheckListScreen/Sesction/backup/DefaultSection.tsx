import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "./Styles";
import React from "react";
import {CheckListInterface} from "@interfaces/UserCheckListInterfaces";
import {useQuery} from "react-query";
import {getUserCheckListBySubjectId} from "@query/useUserCheckList";
import {defaultQueryOptions} from "@query/options";
import useSectionState from "~/contexts/SectionStateContext/useSectionState";

interface SectionProps {
  sectionIndex: number,
  subjectId: number
}

const DefaultSection = React.memo(({sectionIndex, subjectId}: SectionProps) => {
  const { data } = useQuery([`checklist`, {subjectId}], getUserCheckListBySubjectId(subjectId), defaultQueryOptions);
  const checkList: CheckListInterface = data;
  const checkListSections = checkList.checkListSections
  const {sectionTitle, checkListElements} = checkListSections[sectionIndex]
  const {setSectionState} = useSectionState();
  return (
    <View style={[styles.container, {borderColor: '#BABBBA'}]}>
      <View style={styles.leftView}>
        <Text style={styles.leftViewTextTop}>{sectionTitle}</Text>
        <Text style={styles.leftViewTextBottom}>체크리스트 {checkListElements.length}개</Text>
      </View>


      <TouchableOpacity style={styles.touch} onPress={() => setSectionState('defaultActive', sectionIndex)}>
        <Text style={[styles.touchText, {color: '#4B4D4B'}]}>항목보기</Text>
      </TouchableOpacity>

      <View style={[styles.imageView]}>
        <Image style={styles.imageViewImage} source={require('@assets/circle_gray.png')} />
        <View style={styles.imageViewInnerView}>
          <Text style={[styles.imageViewInnerViewText, {color: '#BABBBA'}]}>{sectionIndex + 1}</Text>
        </View>
      </View>
    </View>
  )
})

export default DefaultSection;
