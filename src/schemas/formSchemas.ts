import type {FieldSchema} from "@/components/FormGenerator/FormGenerator.type.ts";

export const profileSchema: FieldSchema[] = [
    {
        id: 'name',
        type: 'input',
        label: 'Имя',
        htmlAttrs: {placeholder: 'Введите имя'}
    },
    {
        id: 'profile-type',
        type: 'select',
        label: 'Тип профиля',
        options: [
            {label: 'Светлая', value: 'light'},
            {label: 'Темная', value: 'dark'}
        ],
        htmlAttrs: {placeholder: 'Выберите тему'}
    },
    {
        id: 'message',
        type: 'textarea',
        label: 'О себе',
    },
    {
        id: 'agreement',
        type: 'checkbox',
        label: 'Согласен с условиями',
    }
]

export const invalidProfileSchema: FieldSchema[] = [
    {
        id: 'name',
        type: 'input',
        label: 'Имя',
        isValid: false,
        htmlAttrs: {placeholder: 'Введите имя'}
    },
    {
        id: 'profile-type',
        type: 'select',
        label: 'Тип профиля',
        isValid: false,
        options: [
            {label: 'Светлая', value: 'light'},
            {label: 'Темная', value: 'dark'}
        ],
        htmlAttrs: {placeholder: 'Выберите тему'}
    },
    {
        id: 'message',
        type: 'textarea',
        label: 'О себе',
        isValid: false,
    },
    {
        id: 'agreement',
        type: 'checkbox',
        label: 'Согласен с условиями',
        isValid: false,
    }
]
