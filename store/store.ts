import { combineReducers, createStore } from "redux";

const initialState = {
  fotoPanjang:'',
  fotoLebar:'',
  fotoTinggi:'',
  lokasiFotoPanjang:'',
  lokasiFotoLebar:'',
  lokasiFotoTinggi:'',
};

const rootReducer = combineReducers({
  userData:() => initialState
});

export const store = createStore(rootReducer);