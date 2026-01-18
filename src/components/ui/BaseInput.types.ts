import type { InputHTMLAttributes } from 'vue'
import type {BaseFieldProps} from "../../types/shared";

export type InputValue = string | number

export interface InputProps extends BaseFieldProps {
    type: 'input'
    htmlAttrs?: InputHTMLAttributes & Record<string, unknown>
}