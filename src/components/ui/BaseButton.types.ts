import type { ButtonHTMLAttributes } from "vue";

export type ButtonVariant = 'primary' | 'secondary' | 'error'

export interface BaseButtonProps {
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    htmlAttrs?: ButtonHTMLAttributes & Record<string, unknown>
}