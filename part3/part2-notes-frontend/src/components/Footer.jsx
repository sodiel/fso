const Footer = () => {
  const footerStyle = {
    color: "green",
    text: "italic",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  };

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  );
};

export default Footer;