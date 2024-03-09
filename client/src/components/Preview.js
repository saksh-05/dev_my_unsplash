import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import {
  Card,
  Button,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
} from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import base_url from "../axios";
import Masonry from "react-responsive-masonry";

const useStyles = makeStyles((theme) => ({
  cont: {
    cursor: "unset",
    transition: "opacity 0.3s ease-out",
    "&:hover": {
      opacity: "0.8",
    },
  },
  btn: {
    height: "0",
    zIndex: "100",
    position: "relative",
    top: "2rem",
    justifyContent: "flex-end",
    right: "1rem",
    padding: "0",
  },
  tag: {
    height: "0",
    position: "relative",
    top: "-2.4rem",
    left: "10px",
    color: "white",
    padding: "0",
  },
}));

const theme = createTheme({
  overrides: {
    MuiCard: {
      root: {
        "& .btncl": {
          display: "none",
        },
        "&:hover .btncl": {
          display: "flex",
        },
      },
    },
  },
});

const Preview = ({ id, keyword }) => {
  const [val, setVal] = useState([]);
  const [srchval, setSrchVal] = useState([]);

  const classes = useStyles();

  const getVal = useCallback(async () => {
    await axios
      .get(`${base_url}files`)
      .then((response) => {
        setVal(() => {
          return response.data;
        });
        setSrchVal(() => response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setVal]);

  useEffect(() => {
    if (keyword !== "") {
      setVal(
        srchval.filter((vl) =>
          vl.tag.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      getVal();
    }
    console.log(val);
  }, [keyword, id,getVal]);

  const handleDelete = (e) => {
    const delId = e.target.parentNode.id;
    axios
      .delete(`${base_url}delete/${delId}`)
      .then((res) => {
        getVal();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <ThemeProvider theme={theme}>
        <Masonry columnsCount={3} gutter="10px">
          {val.map((dt) => {
            return (
              <Card
                key={dt._id}
                style={{
                  borderRadius: "10px",
                  height: "auto",
                  minHeight: "60px",
                }}
              >
                <CardActions className={classes.btn}>
                  <Button
                    id={dt._id}
                    variant="outlined"
                    size="small"
                    onClick={handleDelete}
                    className="btncl"
                    style={{ color: "red", border: "2px solid red" }}
                  >
                    Delete
                  </Button>
                </CardActions>
                <CardActionArea className={classes.cont}>
                  <CardMedia
                    component="img"
                    image={dt.tag === "" ? "NoImage" : dt.url}
                    alt={
                      dt.url === "" || dt.tag === "" ? "Incorrect URL" : dt.tag
                    }
                  />
                  <CardContent className={classes.tag}>
                    <Typography
                      variant="h6"
                      style={{ fontFamily: "cursive", fontWeight: "bold" }}
                    >
                      {dt.tag}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Masonry>
      </ThemeProvider>
    </div>
  );
};

export default Preview;
