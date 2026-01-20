import type {FormValue} from "@/components/FormGenerator/FormGenerator.type.ts";

export interface StoreState {
    testData1: FormValue;
    testData2: FormValue;
}

export interface UpdateData {
    key: keyof StoreState;
    value: FormValue;
}