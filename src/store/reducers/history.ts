import {AnyAction} from 'redux';
import {SET_GRAPH_DATA} from '../actions/history';

export interface HistoryState {
  graphData: number[];
}

const initialState: HistoryState = {
  graphData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_GRAPH_DATA:
      return {
        graphData: action.graphData,
      };
  }
  return state;
};
