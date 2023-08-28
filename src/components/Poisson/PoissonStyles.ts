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
    justifyContent: "space-between",
    padding: theme.spacing(2),
    alignItems: "center",
  },
  input: {
    width: 400,
    maxWidth: "100%",
  },
  results: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
