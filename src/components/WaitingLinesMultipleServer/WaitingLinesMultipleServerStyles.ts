import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: theme.spacing(2),
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    padding: theme.spacing(2),
    alignItems: "center",
  },
  input: {
    width: 400,
    maxWidth: "100%",
  },
  limitInput: {
    width: 400,
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
  },
  results: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  resultValue: {
    color: theme.palette.primary.main,
  },
}));
