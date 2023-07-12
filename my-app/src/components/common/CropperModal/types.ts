export interface ICropperModal {
    onChange: (field: string, value: File) => void, //call back метод
    field: string, //назва інпута
    value?: File|null, //значення
    error?: string, //помилка
    touched?: boolean, //подія відправки форми
    aspectRatio?: number //співідношення сторін
}
