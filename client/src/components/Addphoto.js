import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import base_url from "../axios";
import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  InputLabel,
  TextField,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Preview from "./Preview";

const useStyles = makeStyles(() => ({
  root: {
    width: "44rem",
    height: "inherit",
  },
  formControl: {
    margin: "1rem",
  },
  label: {
    fontFamily: "Noto Sans JP",
    fontWeight: "600",
    fontSize: "1.2rem",
  },
  btn: {
    color: "white",
    marginLeft: "1rem",
    background: "#3DB46D",
    "&:hover": {
      backgroundColor: "#3DB46D",
    },
  },
  actionbtn: {
    marginTop: "1rem",
    textAlign: "end",
  },
}));

const theme = createTheme({
  overrides: {
    MuiDialog: {
      paper: {
        width: "44rem",
      },
      paperScrollPaper: {
        maxHeight: "none",
        overflow: "unset",
      },
    },
    MuiInputLabel: {
      formControl: {
        position: "unset",
        transform: "none",
      },
    },
    MuiFormLabel: {
      root: {
        color: "black",
        marginBottom: "0.7rem",
        marginTop: "1.5rem",
      },
    },
  },
});

const Addphoto = ({ open, handleOpen }) => {
  const [url, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [val, setVal] = useState({});

  const classes = useStyles();

  const handleAddPhoto = async() => {
    setVal(await axios
      .post(`${base_url}upload`, {
        tag: tag,
        url: url,
      })
      .then((res) => {

        console.log(res.data);
        return res.data;
      })
      .catch((err) => console.log(err)));
    console.log(val);
    setTag("");
    setUrl("");
    handleOpen(false);
    <Preview id={val._id} />
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog open={open} onClose={() => handleOpen(false)}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend" className={classes.label}>
              Add a new photo
            </FormLabel>
            <InputLabel htmlFor="name-input">Photo Name</InputLabel>
            <TextField
              required
              id="name-input"
              variant="outlined"
              placeholder="name"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />

            <InputLabel htmlFor="link-input">Photo Link</InputLabel>
            <TextField
              id="link-input"
              variant="outlined"
              placeholder="https://abc.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className={classes.actionbtn}>
              <Button onClick={() => handleOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPhoto} className={classes.btn}>
                Submit
              </Button>
            </div>
          </FormControl>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default Addphoto;
