import * as yup from "yup"

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Geçerli bir e mail girin")
    .required("Zorunlu Alan"),
    password: yup
    .string()
    .min(5, "Parola en az 5 karakterli olmalı")
    .required(),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar Uyuşmuyor")
    .required()
})

export default validations