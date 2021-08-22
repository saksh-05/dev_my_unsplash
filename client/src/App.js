import {
  Button,
  Container,
  Grid,
  makeStyles,
  InputBase,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useState } from "react";
import logo from "./resources/my_unsplash_logo.svg";
import SearchIcon from "@material-ui/icons/Search";
import Addphoto from "./components/Addphoto";
import Preview from "./components/Preview";

const useStyles = makeStyles(() => ({
  search: {
    border: "1.5px solid black",
    borderRadius: "0.5rem",
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "Noto Sans JP",
    color: "Gray",
    height: "2.5rem",
    width: " 18rem",
    marginLeft: "2rem",
    padding: "10px",
  },
  btn: {
    fontFamily: "Noto Sans JP",
    fontWeight: "600",
    background: "#3DB46D",
    color: "white",
    height: "2.5rem",
    width: "7rem",
    fontSize: "0.8rem",
  },
}));

const theme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        transition: "none",
        "&:hover": {
          backgroundColor: "#3DB46D",
        },
      },
    },
  },
});

const App = () => {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");

  const classes = useStyles();

  const addPhoto = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Addphoto open={open} handleOpen={() => setOpen(false)} setId={setId} />
      <Container component="div" style={{ width: "90%" }}>
        <Grid direction="row" container style={{ marginTop: "2rem" }}>
          <img src={logo} alt="logo" />
          <div className={classes.search}>
            <SearchIcon style={{ marginRight: "5px" }} />{" "}
            <InputBase
              placeholder="Search by name"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div style={{ flex: "1", textAlign: "end" }}>
            <Button disableRipple className={classes.btn} onClick={addPhoto}>
              ADD PHOTO
            </Button>
          </div>
        </Grid>
        <Preview id={id} keyword={keyword} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
