import {AnyAction} from 'redux';
import Asset from '../../models/Asset';
import {SET_ASSETS_DATA} from '../actions/assets';

export interface AssetsState {
  assetsData: Asset[];
}

const initialState: AssetsState = {
  assetsData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_ASSETS_DATA:
      return {
        assetsData: action.assetsData,
      };
  }
  return state;
};
