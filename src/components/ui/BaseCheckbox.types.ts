import type {InputHTMLAttributes} from "vue";
import type {BaseFieldProps} from "@/types/shared.ts";

export type CheckboxValue = boolean | null

export interface CheckboxProps extends BaseFieldProps {
    type: 'checkbox'
    htmlAttrs?: InputHTMLAttributes & Record<string, unknown>
}