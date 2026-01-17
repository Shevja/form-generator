import type { TextareaHTMLAttributes } from "vue";
import type {BaseFieldProps} from "../../types/shared";

export type TextareaValue = string | number

export interface TextareaProps extends BaseFieldProps {
    type: 'textarea'
    textareaAttrs?: TextareaHTMLAttributes & Record<string, unknown>
}