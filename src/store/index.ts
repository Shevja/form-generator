import {type ActionContext, createStore} from "vuex";
import type {StoreState} from "@/store/index.types";
import type {FormValue} from "@/components/FormGenerator/FormGenerator.type";

export default createStore<StoreState>({
    state: {
        formData: {
            name: 'Влад',
            theme: 'invisible',
            message: 'Lorem Ipsum',
            agreement: true
        }
    },
    mutations: {
        UPDATE_FORM_DATA(state: StoreState, payload: FormValue) {
            state.formData = {...state.formData, ...payload};
        }
    },
    actions: {
        async saveData({state}: ActionContext<StoreState, StoreState>) {
            console.log('Отправка данных: ', state.formData);
            return new Promise(resolve => setTimeout(resolve, 1000));
        }
    },
})