import type {InputHTMLAttributes} from "vue";
import type {BaseFieldProps} from "../../types/shared.ts";

export type CheckboxValue = boolean

export interface CheckboxProps extends BaseFieldProps {
    type: 'checkbox'
    label?: string
    inputAttrs?: InputHTMLAttributes & Record<string, unknown>
}