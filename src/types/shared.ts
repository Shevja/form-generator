// Инпуты
export interface BaseFieldProps {
    id: string
    label?: string
    isValid?: boolean
    errorMessage?: string
}

export const DEFAULT_FORM_MESSAGES = {
    PLACEHOLDER: 'Заполните поле',
    ERROR: 'Поле заполнено неверно'
} as const;