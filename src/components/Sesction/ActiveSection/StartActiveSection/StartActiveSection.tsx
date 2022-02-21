import {Animated, Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles";
import React, {useEffect, useRef, useState} from "react";
import CheckBox from "@react-native-community/checkbox";
import SubElement from "@components/Sesction/ActiveSection/SubElement/SubElement";
import {useSafeArea} from "react-native-safe-area-context";

const dummyElements = [
  {
    "elementName": "주민등록 초본 또는 등본 발급",
    "subElements": [
      {
        "iconName": "building",
        "subElementTitle": "받을 수 있는 곳",
        "subElementDescription": "온라인 민원24 동사무소/구청"
      },
      {
        "iconName": "document",
        "subElementTitle": "필요한 서류",
        "subElementDescription": "신분증"
      }
    ],
    "help": {
      "helpTitle": "도와줄게요",
      "helpDescription": "help me !!!",
      "helpTopics": [
        "주민등록",
        "사업자등록"
      ]
    }
  },
  {
    "elementName": "가족관계 증명서 발급",
    "subElements": [
      {
        "iconName": "building",
        "subElementTitle": "받을 수 있는 곳",
        "subElementDescription": "온라인 민원24 동사무소/구청"
      },
      {
        "iconName": "document",
        "subElementTitle": "필요한 서류",
        "subElementDescription": "신분증"
      }
    ],
    "help": {
      "helpTitle": "도와줄게요",
      "helpDescription": "도움말 설명",
      "helpTopics": [
        "주민등록",
        "사업자등록"
      ]
    }
  }
]

const StartActiveSection = ({setShowModal} : {setShowModal: Function}) => {
  const animatedValue = new Animated.Value(0);
  const sectionHeightRef = useRef(0);
  const [isAnimated, setIsAnimated] = useState(false)
  useEffect(() => {
    Animated.timing(
      animatedValue,
      {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }
    ).start(() => {
      // this.props.afterAnimationComplete();
    });
  }, [sectionHeightRef.current])

  const opacityAnimation: any = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  const height: number = sectionHeightRef.current
  console.log(height)
  const heightAnimation: any = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height]
  })

  const find_dimesions = (layout) =>{
    const { height } = layout;
    sectionHeightRef.current = height;

    if (!isAnimated) {
      setIsAnimated(true)
    }
  }


  const getHeight = () => {
    if (sectionHeightRef.current === 0) {
      return 'auto'
    } else {
      return heightAnimation
    }
  }

  const getOpacity = () => {
    if (sectionHeightRef.current === 0) {
      return 0
    } else {
      return 1
    }
  }


  return (
    // <Animated.View onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} style={[styles.container, {opacity: opacityAnimation}]}>
    <Animated.View onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }} style={[styles.container, {height: getHeight(), opacity: opacityAnimation}]}>
      <View style={styles.leftView}>
        <Text style={styles.leftViewTextTop}>필요서류 준비하기</Text>
      </View>

      <View style={styles.elementView}>
        <CheckBox style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] , marginLeft: 4}}/>
        <Text style={styles.elementViewText}>주민등록 초본 또는 등본 발급</Text>
        <TouchableOpacity style={styles.elementViewTouch} onPress={() => setShowModal(true)}>
          <Image style={styles.elementViewTouchImage} source={require('@assets/question_mark.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.subElementRowView}>
        <SubElement/>
        <SubElement/>
      </View>

      <View style={styles.elementView}>
        <CheckBox
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] , marginLeft: 4}}
          tintColors = {{ true: 'blue' , false: 'gray' }}
          value={true}
        />
        <Text style={styles.elementViewText}>주민등록 초본 또는 등본 발급</Text>
        <TouchableOpacity style={styles.elementViewTouch} onPress={() => setShowModal(true)}>
          <Image style={styles.elementViewTouchImage} source={require('@assets/question_mark.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.subElementRowView}>
        <SubElement/>
        <SubElement/>
      </View>

      <View style={styles.imageView}>
        <Image style={styles.imageViewImage} source={require('@assets/circle_blue.png')} />
        <View style={styles.imageViewInnerView}>
          <Text style={styles.imageViewInnerViewText}>1</Text>
        </View>
      </View>
    </Animated.View>
  )
}

export default StartActiveSection;
