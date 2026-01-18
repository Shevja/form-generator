import type {BaseFieldProps} from "../../types/shared";
import type { InputHTMLAttributes } from "vue";

export type SelectValue = string | number

export interface SelectOptions {
    label: string
    value: string | number
}

export interface SelectProps extends BaseFieldProps {
    type: 'select'
    options: SelectOptions[]
    htmlAttrs?: InputHTMLAttributes & Record<string, unknown>
}