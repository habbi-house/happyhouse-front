/* eslint-disable prettier/prettier */
import {
  getAllHouseDeals,
  getAllHouses,
  getBaseAddress,
} from "@/components/api/house";
import {
  CLEAR_HOUSE_LIST,
  SET_ADDRESS,
  SET_DONG,
  SET_DONG_CODE,
  SET_DONG_LIST,
  SET_GUNGU,
  SET_GUNGU_LIST,
  SET_HOUSE,
  SET_HOUSE_DEAL_LIST,
  SET_HOUSE_LIST,
  SET_RECENT_DEALS,
  SET_SIDO,
  SET_SIDO_LIST,
} from "../mutation-types";

const houseStore = {
  namespaced: true,
  state: {
    house: {},
    houses: [],
    houseDeals: [],
    recentDeals: [],
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
          state.address
            .map((x) => {
              if (x.sidoName === state.sido && x.gugunName) {
                return x.gugunName;
              }
            })
            .filter((x) => x)
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
          state.address
            .map((x) => {
              if (x.gugunName === state.gungu && x.dongName) {
                return { name: x.dongName, code: x.dongCode };
              }
            })
            .filter((x) => x)
        ),
      ].sort();
    },
    [CLEAR_HOUSE_LIST]: (state) => {
      state.houses = [];
    },
    [SET_HOUSE_LIST]: (state, houses) => {
      state.houses = houses;
    },
    [SET_HOUSE]: (state, id) => {
      state.house = state.houses.find((house) => house.aptCode === id);
    },
    [SET_HOUSE_DEAL_LIST]: (state, houseDeals) => {
      state.houseDeals = houseDeals;
    },
    [SET_RECENT_DEALS]: (state) => {
      state.recentDeals = state.houseDeals.slice(0, 5).map((x) => {
        return {
          amount: x.dealAmount.split(",").join(""),
          date: x.dealYear + ". " + x.dealMonth,
        };
      });
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
    searchHouseDealByApt({ commit, state }) {
      getAllHouseDeals(
        state.house.aptCode,
        ({ data, status }) => {
          if (status === 200) {
            commit(SET_HOUSE_DEAL_LIST, data.reverse());
            commit(SET_RECENT_DEALS);
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
