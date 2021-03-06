import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import styles from './Styles';

const OnBoardPage2 = ({ navigation }: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomView}>
        <TouchableOpacity>
          <Text style={styles.bottomViewLeftTouchText}>
            넘어가기
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomViewRightView}>
          <TouchableOpacity onPress={() => navigation.navigate('OnBoardPage3')}>
            <Text style={styles.bottomViewRightViewTouchText}>다음</Text>
          </TouchableOpacity>
          {/*<Image style={styles.} source={require('')}/>*/}
        </View>
      </View>
    </SafeAreaView>
  )
};

export default OnBoardPage2;


