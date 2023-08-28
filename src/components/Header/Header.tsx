import { FC } from "react";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar color="default" position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Button
            variant={location.pathname === "/poisson" ? "outlined" : "text"}
            onClick={() => navigate("/poisson")}
            size="large"
          >
            Poisson
          </Button>
          <Button
            variant={location.pathname === "/exponential" ? "outlined" : "text"}
            onClick={() => navigate("/exponential")}
            size="large"
          >
            Exponencial
          </Button>
          <Button
            variant={
              location.pathname === "/waiting-lines-one-server"
                ? "outlined"
                : "text"
            }
            onClick={() => navigate("/waiting-lines-one-server")}
            size="large"
          >
            Lineas de espera con un servidor
          </Button>
          <Button
            variant={
              location.pathname === "/waiting-lines-multiple-server"
                ? "outlined"
                : "text"
            }
            onClick={() => navigate("/waiting-lines-multiple-server")}
            size="large"
          >
            Lineas de espera con multiples servidores
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
