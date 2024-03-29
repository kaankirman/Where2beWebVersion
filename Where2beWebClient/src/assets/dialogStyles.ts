type ModalStyles = {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
};

export const modalStyle: ModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    width: "700px",
    height: "880px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    background: "#fff",
    overflow: "hidden",
  },
};

export const folderModalStyle: ModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    width: "700px",
    height: "200px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    background: "#fff",
    overflow: "hidden",
  },
};

export const profileModalStyle: ModalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    width: "400px",
    height: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    background: "#fff",
    overflow: "hidden",
  },
};

type Styles = {
  titleStyle: React.CSSProperties;
  inputStyle: React.CSSProperties;
  buttonStyle: React.CSSProperties;
  userActionButtons: React.CSSProperties;
  selectImageStyle: React.CSSProperties;
  googleApiDiv: React.CSSProperties;
  googleApiDivSearchImage: React.CSSProperties;
};

export const styles: Styles = {
  titleStyle: {
    color: "#c4c4c4",
  },
  inputStyle: {
    width: "100%",
    marginBottom: "8px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #dcdcdc",
    outline: "none",
  },
  buttonStyle: {
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
    padding: "8px 16px",
    border: "none",
    background: "#007bff",
    color: "#fff",
  },
  userActionButtons: {
    display: "flex",
    justifyContent: "right",
    marginTop: "30px",
  },
  selectImageStyle: {
    marginTop: "5px",
    marginBottom: "16px",
    width: "40%",
    marginLeft: "30%",
    marginRight: "30%",
    background: "#ff5722",
  },
  googleApiDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleApiDivSearchImage: {
    height: "40px",
    width: "40px",
    cursor: "pointer",
    marginLeft: "8px",
  },
};

type profileDialogStyles = {
  mainContainer: React.CSSProperties;
  profileImage: React.CSSProperties;
  textInputStyle: React.CSSProperties;
};

export const profileDialogStyles: profileDialogStyles = {
  mainContainer: {
    width: "100%",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileImage: {
    margin: "auto",
    width: 300,
    cursor: "pointer",
    borderRadius: "20px",
  },
  textInputStyle: {
    marginTop: "30px",
    margin: "10px 0",
    padding: "5px",
    boxSizing: "border-box",
    border: "none",
  },
};
