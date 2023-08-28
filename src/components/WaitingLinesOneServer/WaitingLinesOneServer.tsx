import { FC, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Header } from "../Header";
import { useForm } from "./hooks/useForm";
import { useStyles } from "./WaitingLinesOneServerStyles";
import { round } from "../../helpers/maths/round";

export const WaitingLinesOneServer: FC = () => {
  const classes = useStyles();

  const [result, setResult] = useState<{
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
  }>();

  const form = useForm(setResult);

  return (
    <>
      <Header />
      <Container>
        <div className={classes.container}>
          <div className={classes.form}>
            <Typography variant="h5" color="primary">
              Lineas de espera con un servidor
            </Typography>
            <Box className={classes.input} mt={2} mb={2}>
              <TextField
                className={classes.input}
                label="Lambda"
                type="number"
                name="lambda"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.lambda}
                error={form.touched.lambda && !!form.errors.lambda}
                helperText={form.touched.lambda && form.errors.lambda}
              />
            </Box>
            <Box className={classes.input} mb={2}>
              <TextField
                className={classes.input}
                label="Mu"
                type="number"
                name="mu"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.mu}
                error={form.touched.mu && !!form.errors.mu}
                helperText={form.touched.mu && form.errors.mu}
              />
            </Box>
            <Box className={classes.limitInput} mb={2}>
              <Checkbox
                edge="start"
                name="withLimit"
                value={form.values.withLimit}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              <TextField
                disabled={!form.values.withLimit}
                className={classes.input}
                label="Limite"
                type="number"
                name="limit"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.limit}
                error={form.touched.limit && !!form.errors.limit}
                helperText={form.touched.limit && form.errors.limit}
              />
            </Box>
            <Button
              onClick={form.submitForm}
              size="large"
              variant="outlined"
              color="primary"
            >
              Calcular
            </Button>
          </div>
          <div className={classes.results}>
            {!!result && (
              <>
                <div>
                  <Typography variant="subtitle1">
                    Factor de utilización del sistema (RHO):{" "}
                    <span className={classes.resultValue}>
                      {round(result.rho)}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1">
                    Tiempo promedio en cola (Wq):{" "}
                    <span className={classes.resultValue}>
                      {round(result.wq)}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1">
                    Tiempo promedio en el sistema (Ws):{" "}
                    <span className={classes.resultValue}>
                      {round(result.ws)}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1">
                    Cantidad promedio de clientes en cola (Lq):{" "}
                    <span className={classes.resultValue}>
                      {round(result.lq)}
                    </span>
                  </Typography>
                  <Typography variant="subtitle1">
                    Cantidad promedio de clientes en el sistema (Ls):{" "}
                    <span className={classes.resultValue}>
                      {round(result.ls)}
                    </span>
                  </Typography>
                  {result.effectiveLambda ? (
                    <Typography variant="subtitle1">
                      Lambda efectiva:{" "}
                      <span className={classes.resultValue}>
                        {round(result.effectiveLambda)}
                      </span>
                    </Typography>
                  ) : null}
                  {result.lossLambda ? (
                    <Typography variant="subtitle1">
                      Lambda perdida:{" "}
                      <span className={classes.resultValue}>
                        {round(result.lossLambda)}
                      </span>
                    </Typography>
                  ) : null}
                </div>
                <Box mt={4}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>n</TableCell>
                        <TableCell>Pn</TableCell>
                        <TableCell>Fn</TableCell>
                        <TableCell>1 - Fn</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.probabilities.map((row, index) => (
                        <TableRow key={`row-probability-${index}`}>
                          <TableCell>{round(row.n)}</TableCell>
                          <TableCell>{round(row.pn)}</TableCell>
                          <TableCell>{round(row.fn)}</TableCell>
                          <TableCell>{round(row["1-fn"])}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
