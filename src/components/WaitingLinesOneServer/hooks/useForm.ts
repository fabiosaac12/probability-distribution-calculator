import { Dispatch } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  waitingLinesOneServerNoLimit,
  waitingLinesOneServerWithLimit,
} from "../../../helpers/maths/waitingLinesOneServer";

export const useForm = (
  setResult: Dispatch<
    React.SetStateAction<
      | {
          rho: number;
          po: number;
          ls: number;
          lq: number;
          ws: number;
          wq: number;
          effectiveLambda?: number;
          lossLambda?: number;
          probabilities: {
            n: number;
            pn: number;
            fn: number;
            "1-fn": number;
          }[];
        }
      | undefined
    >
  >
) => {
  const validationSchema = yup.object().shape({
    lambda: yup
      .number()
      .min(1, "Debe ser mayor a 0")
      .required("Este campo es requerido"),
    mu: yup
      .number()
      .min(
        yup.ref("lambda", { map: (value) => (value as number) + 1 }),
        "Debe ser mayor a lambda"
      )
      .required("Este campo es requerido"),
    withLimit: yup.boolean(),
    limit: yup
      .number()
      .min(1, "Debe ser mayor a 0")
      .when("withLimit", {
        is: true,
        then: (schema) => schema.required("Este campo es requerido"),
        otherwise: (schema) => schema,
      }),
  });

  const formik = useFormik({
    initialValues: {
      lambda: "",
      mu: "",
      withLimit: false,
      limit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      values.withLimit
        ? setResult(
            waitingLinesOneServerWithLimit(
              +values.lambda,
              +values.mu,
              +values.limit
            )
          )
        : setResult(waitingLinesOneServerNoLimit(+values.lambda, +values.mu));
    },
  });

  return formik;
};
