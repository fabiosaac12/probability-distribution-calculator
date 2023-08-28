import { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Header } from "../Header";
import { useForm } from "./hooks/useForm";
import { useStyles } from "./ExponentialStyles";
import { calculateTypeLabels, CalculateTypes } from "./helpers";
import { round } from "../../helpers/maths/round";

export const Exponential: FC = () => {
  const classes = useStyles();

  const [result, setResult] = useState<{
    result: number;
    t: number;
    calculate: CalculateTypes;
  }>();

  const form = useForm(setResult);

  return (
    <>
      <Header />
      <Container>
        <div className={classes.container}>
          <div className={classes.form}>
            <Typography variant="h5" color="primary">
              Exponencial
            </Typography>
            <Box className={classes.input} mt={2} mb={2}>
              <TextField
                className={classes.input}
                label="Beta"
                type="number"
                name="beta"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.beta}
                error={form.touched.beta && !!form.errors.beta}
                helperText={form.touched.beta && form.errors.beta}
              />
            </Box>
            <Box className={classes.input} mb={2}>
              <TextField
                className={classes.input}
                label="t"
                type="number"
                name="t"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.t}
                error={form.touched.t && !!form.errors.t}
                helperText={form.touched.t && form.errors.t}
              />
            </Box>
            <Box className={classes.input} mb={3}>
              <FormControl>
                <FormLabel>¿Que tipo de probabilidad desea calcular?</FormLabel>
                <RadioGroup
                  name="calculate"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.calculate}
                >
                  {Object.keys(CalculateTypes).map((type) => (
                    <FormControlLabel
                      value={type}
                      control={<Radio />}
                      label={calculateTypeLabels[type] as unknown as any}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
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
              <Typography color="primary" variant="h6">
                P ( x{" "}
                {result.calculate === CalculateTypes.greaterThan ? ">" : "<"}{" "}
                {result.t} ) = {round(result.result)}
              </Typography>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
