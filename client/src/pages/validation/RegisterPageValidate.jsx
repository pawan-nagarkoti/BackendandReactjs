import * as Yup from "yup";

const RegisterPageValidate = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default RegisterPageValidate;
