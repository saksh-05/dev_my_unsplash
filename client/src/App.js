// import axios from "axios";
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
import Preview from './components/Preview';

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
  // const [uploadB, setUploadB] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [resFile, setResFile] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const addPhoto = () => {
    setOpen(!open);
  };

  // const onFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   setUploadB(true);
  // };

  // const onFileUpload = () => {
  //   const formData = new FormData();

  //   formData.append("myFile", selectedFile);
  //   console.log(selectedFile);

  //   setLoading(true);

  //   axios
  //     .post(`${base_url}upload`, formData)
  //     .then((res) => {
  //       console.log(res);
  //       setResFile(res.data.file);
  //       setTimeout(() => {
  //         if (res.data.file !== undefined) {
  //           setLoading(false);
  //           setPreview(true);
  //         }
  //       }, 1000);

  //     })
  //     .catch((err) => console.log(err));
  //   setPreview(false);
  // };

  // const onFileChangeDrop = (file) => {
  //   setSelectedFile(file);
  //   setUploadB(true);
  // };

  // const onDrop = (acceptedFiles) => {
  //   const files = acceptedFiles;
  //   console.log(files[0]);
  //   if (files) {
  //     onFileChangeDrop(files[0]);
  //   }
  // };

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   noClick: true,
  //   accept: "image/*",
  // });

  return (
      <ThemeProvider theme={theme}>
        <Addphoto open={open} handleOpen={()=>setOpen(false)} />
        <Container component="div" style={{ width: "90%" }}>
          <Grid direction="row" container style={{ marginTop: "2rem" }}>
            <img src={logo} alt="logo" />
            <div className={classes.search}>
              <SearchIcon style={{ marginRight: "5px" }} />{" "}
              <InputBase placeholder="search" />
            </div>
            <div style={{ flex: "1", textAlign: "end" }}>
              <Button disableRipple className={classes.btn} onClick={addPhoto}>
                ADD PHOTO
              </Button>
            </div>
          </Grid>
          <Preview />
        </Container>
      </ThemeProvider>
  );
};

export default App;
