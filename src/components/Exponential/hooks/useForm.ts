import { Dispatch } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { CalculateTypes } from "../helpers";
import { exponentialGreaterThan, exponentialLessThan } from "../../../helpers/maths/exponentialDistribution";

export const useForm = (
  setResult: Dispatch<
    React.SetStateAction<
      | {
          result: number;
          t: number;
          calculate: CalculateTypes;
        }
      | undefined
    >
  >
) => {
  const validationSchema = yup.object().shape({
    beta: yup.number().required("Este campo es requerido"),
    t: yup.number().required("Este campo es requerido"),
    calculate: yup
      .string()
      .oneOf(Object.keys(CalculateTypes))
      .required("Este campo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      beta: "",
      t: "",
      calculate: "greaterThan",
    },
    validationSchema,
    onSubmit: (values) => {
      switch (values.calculate) {
        case CalculateTypes.greaterThan:
          setResult({
            calculate: values.calculate,
            t: +values.t,
            result: exponentialGreaterThan(+values.beta, +values.t),
          });
          break;
        default:
          setResult({
            calculate: values.calculate as CalculateTypes,
            t: +values.t,
            result: exponentialLessThan(+values.beta, +values.t),
          });
          break;
      }
    },
  });

  return formik;
};
