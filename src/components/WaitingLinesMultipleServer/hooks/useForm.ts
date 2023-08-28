import { Dispatch } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  waitingLinesMultipleServerWithLimit,
  waitingLinesMultipleServersNoLimit,
} from "../../../helpers/maths/waitingLinesMultipleServer";

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
          inactiveServers?: number;
          activeServers?: number;
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
      .min(1, "Debe ser mayor a 1")
      .required("Este campo es requerido"),
    c: yup
      .number()
      .min(2, "Debe ser mayor a 1")
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
      c: "",
      withLimit: false,
      limit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      values.withLimit
        ? setResult(
            waitingLinesMultipleServerWithLimit(
              +values.lambda,
              +values.mu,
              +values.c,
              +values.limit
            )
          )
        : setResult(
            waitingLinesMultipleServersNoLimit(
              +values.lambda,
              +values.mu,
              +values.c
            )
          );
    },
  });

  return formik;
};
