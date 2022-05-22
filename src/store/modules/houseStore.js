/* eslint-disable prettier/prettier */
import { getAllHouses, getBaseAddress } from "@/components/api/house";
import {
  SET_ADDRESS,
  SET_DONG,
  SET_DONG_CODE,
  SET_DONG_LIST,
  SET_GUNGU,
  SET_GUNGU_LIST,
  SET_HOUSE_LIST,
  SET_SIDO,
  SET_SIDO_LIST,
} from "../mutation-types";

const houseStore = {
  namespaced: true,
  state: {
    houses: [],
    address: [],
    sidos: [],
    gungus: [],
    dongs: [],
    sido: "",
    gungu: "",
    dong: "",
    dongCode: "",
  },
  getters: {},
  mutations: {
    [SET_ADDRESS]: (state, address) => {
      state.address = address;
    },
    [SET_SIDO]: (state, sido) => {
      state.sido = sido;
    },
    [SET_SIDO_LIST]: (state) => {
      state.sidos = [...new Set(state.address.map((x) => x.sidoName))].sort();
    },
    [SET_GUNGU]: (state, gungu) => {
      state.gungu = gungu;
    },
    [SET_GUNGU_LIST]: (state) => {
      state.gungus = [
        ...new Set(
          state.address.map((x) => {
            if (x.sidoName === state.sido && x.gugunName) {
              return x.gugunName;
            }
          })
        ),
      ].sort();
    },
    [SET_DONG]: (state, dong) => {
      state.dong = dong;
    },
    [SET_DONG_CODE]: (state) => {
      state.dongs.forEach((dong) => {
        if (dong.name === state.dong) {
          state.dongCode = dong.code;
        }
      });
    },
    [SET_DONG_LIST]: (state) => {
      state.dongs = [
        ...new Set(
          state.address.map((x) => {
            if (x.gugunName === state.gungu && x.dongName) {
              return { name: x.dongName, code: x.dongCode };
            }
          })
        ),
      ].sort();
    },
    [SET_HOUSE_LIST]: (state, houses) => {
      state.houses = houses;
    },
  },
  actions: {
    loadAddress({ commit }) {
      getBaseAddress(
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_ADDRESS, data);
            commit(SET_SIDO_LIST);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    searchHouseByDong({ commit, state }) {
      getAllHouses(
        state.dongCode,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_HOUSE_LIST, data);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
};

export default houseStore;
