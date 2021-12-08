import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View, Text, SafeAreaView, TextInput, Pressable, TouchableHighlight} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import * as userActions from '../store/actions/user';
import * as balanceHistoryActions from '../store/actions/balancehistory';

const Deny = () => {
  const [profileId, setProfileId] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isClickFlag, setClickFlag] = useState(false);
  const dispatch = useDispatch();

  const handleProfileId = (profileId: string) => {
    if (profileId === '') {
      return '';
    }
    const result = dispatch(userActions.fetchUserData(profileId));
    return result;
  };

  useEffect(() => {
    if (!isClickFlag) {
      return;
    }
    const onBalanceData = async () => {
      const result = await dispatch(balanceHistoryActions.fetchBalanceHistoryData(profileId));
      return result;
    };
    onBalanceData().then(res => {
      if (res.success === 0) {
        setShowDialog(true);
      }
    });
    setClickFlag(false);
  }, [handleProfileId]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.viewContainer}>
        <Text style={styles.animText}>User not exist.</Text>

        <View style={styles.inputViewContainer}>
          <Text style={styles.textTitle}>Please input profile id.</Text>
          <TextInput style={styles.textInput} onChangeText={setProfileId}></TextInput>
          <TouchableHighlight
            activeOpacity={0.1}
            style={styles.signBtn}
            underlayColor="#0149FF"
            onPress={() => {
              setClickFlag(true);
              handleProfileId(profileId);
            }}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableHighlight>
        </View>
      </View>

      <AwesomeAlert
        show={showDialog}
        showProgress={false}
        title=""
        message="User not exist.Please try again!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText=""
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          setShowDialog(false);
        }}
        onConfirmPressed={() => {
          setShowDialog(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#0149FF',
  },
  viewContainer: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    paddingHorizontal: '6%',
  },
  header: {
    flexDirection: 'row',
    marginTop: 6,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  closePress: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  animText: {
    color: '#FFF',
    fontSize: 30,
    fontFamily: 'CoinbaseDisplay-Medium',
    textAlignVertical: 'center',
  },
  inputViewContainer: {
    marginTop: 20,
    flexDirection: 'column',
    width: '100%',
  },
  textTitle: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    color: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderColor: 'gray',
    marginTop: 8,
    width: '100%',
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
  },
  signBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'white',
    borderRadius: 16,
    width: '100%',
    height: 40,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Deny;