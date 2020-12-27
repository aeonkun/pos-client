import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grid: {
    minHeight: "100vh",
    backgroundImage: `url(./bgpattern3.svg)`,
    overflowX: "hidden",
  },
  mainText: {
    color: "#000000",
  },
}));

export default useStyles;
