import { Dispatch } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { CalculateTypes } from "../helpers";
import {
  poissonEqualTo,
  poissonGreaterOrEqualThan,
  poissonGreaterThan,
  poissonLessOrEqualThan,
  poissonLessThan,
} from "../../../helpers/maths/poissonDistribution";

export const useForm = (
  setResult: Dispatch<
    React.SetStateAction<
      | {
          result: number;
          x: number;
          calculate: CalculateTypes;
        }
      | undefined
    >
  >
) => {
  const validationSchema = yup.object().shape({
    lambda: yup.number().required("Este campo es requerido"),
    x: yup.number().required("Este campo es requerido"),
    calculate: yup
      .string()
      .oneOf(Object.keys(CalculateTypes))
      .required("Este campo es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      lambda: "",
      x: "",
      calculate: "equal",
    },
    validationSchema,
    onSubmit: (values) => {
      switch (values.calculate) {
        case CalculateTypes.greaterOrEqualThan:
          setResult({
            calculate: values.calculate,
            x: +values.x,
            result: poissonGreaterOrEqualThan(+values.lambda, +values.x),
          });
          break;
        case CalculateTypes.lessOrEqualThan:
          setResult({
            calculate: values.calculate,
            x: +values.x,
            result: poissonLessOrEqualThan(+values.lambda, +values.x),
          });
          break;
        case CalculateTypes.greaterThan:
          setResult({
            calculate: values.calculate,
            x: +values.x,
            result: poissonGreaterThan(+values.lambda, +values.x),
          });
          break;
        case CalculateTypes.lessThan:
          setResult({
            calculate: values.calculate,
            x: +values.x,
            result: poissonLessThan(+values.lambda, +values.x),
          });
          break;
        default:
          setResult({
            calculate: values.calculate as CalculateTypes,
            x: +values.x,
            result: poissonEqualTo(+values.lambda, +values.x),
          });
      }
    },
  });

  return formik;
};
