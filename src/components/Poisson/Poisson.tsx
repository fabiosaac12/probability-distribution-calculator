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
import { useStyles } from "./PoissonStyles";
import { calculateTypeLabels, CalculateTypes } from "./helpers";
import { round } from "../../helpers/maths/round";

export const Poisson: FC = () => {
  const classes = useStyles();

  const [result, setResult] = useState<{
    result: number;
    x: number;
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
              Poisson
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
                label="x"
                type="number"
                name="x"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.x}
                error={form.touched.x && !!form.errors.x}
                helperText={form.touched.x && form.errors.x}
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
                      key={`poisson-calculate-${type}`}
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
                {result.calculate === CalculateTypes.lessThan
                  ? "<"
                  : result.calculate === CalculateTypes.greaterOrEqualThan
                  ? "≥"
                  : result.calculate === CalculateTypes.greaterThan
                  ? ">"
                  : result.calculate === CalculateTypes.lessOrEqualThan
                  ? "≤"
                  : "="}{" "}
                {result.x} ) = {round(result.result)}
              </Typography>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
