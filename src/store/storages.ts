import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = {
  PROFILE_ID: '@profileId',
};

export const getProfileId = async () => {
  try {
    const profileId = await AsyncStorage.getItem(STORAGE_KEY.PROFILE_ID);
    if (profileId === null) {
      return 'null';
    }
    return profileId;
  } catch (e) {
    throw e;
  }
};

export const storeProfileId = async (profileId: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.PROFILE_ID, profileId);
  } catch (e) {
    throw e;
  }
};
