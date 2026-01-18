import type {InputProps, InputValue} from "../ui/BaseInput.types";
import type {SelectProps, SelectValue} from "../ui/BaseSelect.types";
import type {CheckboxProps, CheckboxValue} from "../ui/BaseCheckbox.types";
import type {TextareaProps, TextareaValue} from "../ui/BaseTextarea.types";
import type {Component} from "vue";

export type FieldValue = InputValue | SelectValue | CheckboxValue | TextareaValue | null

export type FormValue = Record<string, FieldValue>;

export type ComponentMap = Record<FieldSchema['type'], Component>;

export type FieldSchema =
    InputProps
    | SelectProps
    | CheckboxProps
    | TextareaProps

export interface FormGeneratorProps {
    schema: FieldSchema[]
}

export interface FormGeneratorEmits {
    (e: 'submit'): void;
    (e: 'cancel'): void;
}