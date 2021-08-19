// import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import base_url from "../axios";
import Masonry from "react-responsive-masonry";

const useStyles = makeStyles((theme) => ({
  //  btn: {
  //   display:'none',
  // },
  im: {
    width: "100%",
    display: "block",
    transition: "opacity 0.3s ease-out",
    "&:hover": {
      opacity: "0.5",
      btn: {
        display: "block",
      },
    },
  },
  imgtext: {
    color: "white",
    position: "relative",
    textAlign: "left",
    bottom: "40px",
    fontSize: " 1.3rem",
    fontWeight: "700",
    fontFamily: "NOTO SANS JP",
    height: "0",
    left: "20px",
  },
}));

const Preview = (id) => {
  const [val, setVal] = useState([]);

  const classes = useStyles();

  const getVal = useCallback(async () => {
    const data = await axios
      .get(`${base_url}files`)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    setVal(data.data);
    console.log(val);
    console.log(id);
  }, [id]);

  useEffect(() => {
    getVal();
  }, [getVal]);

  const handleDelete = (e)=>{
    console.log(e.target.offsetParent.id);
    const delId = e.target.offsetParent.id;
    axios
      .delete(`${base_url}delete/${delId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Masonry columnsCount={3} gutter="10px">
        {val.map((dt) => {
          return (
            <Card
              key={dt._id}
              style={{
                borderRadius: "10px",
                background: "black",
              }}
            >
              <img src={dt.url} alt={dt.tag} className={classes.im} />
              <div className={classes.imgtext}>{dt.tag}</div>
              <Button
                id={dt._id}
                onClick={handleDelete}
                className={classes.btn}
                >
                {console.log(dt._id)}
                Delete
              </Button>
            </Card>
          );
        })}
      </Masonry>
    </div>
  );
};

export default Preview;
