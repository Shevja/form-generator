import {type ActionContext, createStore} from "vuex";
import type {StoreState, UpdateData} from "@/store/index.types";

const STORAGE_KEY = 'form_generator_cache';

export default createStore<StoreState>({
    state: {
        testData1: {
            name: 'Тестовое Имя',
            'profile-type': 'dark',
            message: 'Lorem Ipsum',
            agreement: true
        },
        testData2: {
            name: 'Тестовое Имя',
            'profile-type': 'dark',
            message: 'Lorem Ipsum',
            agreement: false
        }
    },
    mutations: {
        UPDATE_TEST_DATA(state: StoreState, { key, value }: UpdateData) {
            console.log('UPDATE_TEST_DATA: local store')
            state[key] = {...state[key], ...value};
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        },
        SET_STORE_STATE(state: StoreState, payload: StoreState) {
            Object.assign(state, payload);
        }
    },
    actions: {
        initStore({ commit }) {
            const savedStore = localStorage.getItem(STORAGE_KEY);
            if (savedStore) commit('SET_STORE_STATE', JSON.parse(savedStore));
        },
        async saveData({state}: ActionContext<StoreState, StoreState>, key: keyof StoreState) {
            console.log(`Отправка данных формы "${key}":`, state[key]);
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
    },
})