import { roseColor } from "assets/styles/material-dashboard-react.jsx";

const dialogStyle = () => ({
  main: {
    width: "1000px"
  },
  horizontal: {
    display: "flex"
  },
  dialog: {
    maxWidth: "1000px"
  },
  dialogContent: {
    paddingTop: "20px",
    paddingBottom: "15px"
  },
  cardTitleWhite: {
    width: "70%",
    height: "30px",
    float: "left",
    marginTop: "12px",
    marginBottom: "12px",
    marginRight: "5px",
    fontSize: "17px"
  },
  divider: {
    marginTop: "15px",
    marginBottom: "10px"
  },
  fileInput: {
    display: "none"
  },
  fileButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginLeft: "15px"
  },
  chipItem: {
    margin: "5px",
    paddingLeft: "15px",
    paddingRight: "10px",
    background: roseColor,
    color: "white",
    "&:focus": {
      background: roseColor
    }
  },
  addButton: {
    height: "40px",
    float: "left",
    marginTop: "7px",
    marginLeft: "15px",
    minWidth: "130px"
  },
  deleteButton: {
    width: "100%",
    height: "40px",
    float: "left",
    marginTop: "15px",
    marginLeft: "15px"
  },
  selectButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginLeft: "15px"
  },
  submitButton: {
    height: "40px",
    float: "right"
  },
  photoBox: {
    position: "relative",
    width: "100%",
    paddingTop: "133%",
    marginTop: "10px",
    marginBottom: "10px"
  },
  imageCard: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#F0F0F0"
  },
  imageTitle: {
    color: "#303030",
    fontSize: "14px",
    marginTop: "10px"
  },
  imageAddIcon: {
    width: "80px",
    height: "80px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-40px",
    marginLeft: "-40px",
    border: "none",
    fontSize: "80px",
    color: "#C0C0C0",
    opacity: "0.5"
  },
  imageDeleteIcon: {
    width: "30px",
    height: "30px",
    position: "absolute",
    top: "10px",
    left: "10px",
    border: "none",
    fontSize: "30px",
    color: "#FF0000",
    opacity: "0.9",
    padding: "7px",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    cursor: "pointer"
  },
  checkItem: {
    marginTop: "12px",
    borderBottom: "1px solid #dbdbdb"
  },
  checkBox: {
    float: "left"
  },
  checkTitle: {
    lineHeight: "45px",
    marginRight: "0px",
    fontSize: "15px",
    color: "black",
    textAlign: "left"
  },
  checkedIcon: {
    width: "20px",
    height: "20px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  uncheckedIcon: {
    width: "0px",
    height: "0px",
    padding: "10px",
    border: "1px solid rgba(0, 0, 0, .54)",
    borderRadius: "3px"
  },
  tab: {
    minWidth: 10
  },
  downloadButton: {
    height: "40px",
    float: "left",
    marginTop: "20px",
    marginRight: "15px"
  }
});

export default dialogStyle;
