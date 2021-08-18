// import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import base_url from "../axios";

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: "466.36px",
  //     height: "auto",
  //     margin: "auto",
  //     textAlign: "center",
  //         padding: "2rem",
  //         marginTop: '5rem',
  //     marginBottom:'5rem',
  //   },
  //   text: {
  //     fontFamily: "Poppins",
  //     fontStyle: "Medium",
  //     fontSize: "18px",
  //     align: "center",
  //     verticalAlign: "top",
  //     letterSpacing: "-3.5%",
  //     marginTop: "10px",
  //     marginBottom: "25px",
  //     fontWeight: "500",
  //   },
  //   image: {
  //     width: "100%",
  //     padding: "0",
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center",
  //       margin: "1rem 0",
  //   },
  //   im: {
  //     minHeight: "200px",
  //     backgroundSize: "auto 100%",
  //     backgroundPosition: "center",
  //     backgroundRepeat: "no-repeat",
  //     borderRadius: "10px",
  //       width: "100%",
  //     height:'500px',
  //   },
  //   inputContainer: {
  //     display: "inline-flex",
  //     width: "338px",
  //     height: "33px",
  //     background: "#F6F8FB",
  //     border: "1px solid #E0E0E0",
  //     borderRadius: "8px",
  //   },
  //   input: {
  //     outline: "none",
  //     border: "none",
  //     width: "100%",
  //     fontFamily: "inherit",
  //     fontWeight: "inherit",
  //     fontSize: "0.6rem",
  //   },
  //   copybtn: {
  //     width: "74px",
  //     height: "100%",
  //     background: "#2F80ED",
  //     borderRadius: "8px",
  //     color: "white",
  //     textTransform: "none",
  //     fontSize: "0.6rem",
  //     "&:hover": {
  //       backgroundColor: "#2F80ED",
  //     },
  //   },
}));

const Preview = (da) => {

  const [val, setVal] = useState([]);

  const getVal = useCallback(async () => {
    
    const data = await axios
      .get(`${base_url}files`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    setVal(data.data);
    console.log(val);
  },[da]);

  useEffect(() => {
    getVal();
  },[getVal]);



  return (
    <>
      {/* {val.sort((a, b) => {
        return (a.date - b.date);
      })} */}

      <Grid item lg={12} container direction="row" spacing={2}>

        {val.map((dt) => {
          return (
            <Grid
              key={dt._id}
              item
              lg={4}
              style={{ height: "fit-content" }}
              container
              direction="column"
            >
              <img
                src={dt.url}
                alt={dt.tag}
                style={{ height: "100%", width: "100%" }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Preview;
