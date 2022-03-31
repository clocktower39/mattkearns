import React, { useState } from "react";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const styles = () => ({
  ContactContainer: { backgroundColor: "#4D3E6D", padding: "25px 0px" },
  Title: { color: "white", padding: "25px 0px 50px 0px" },
  Paper: { backgroundColor: "#FAEDD4" },
  FormContainer: { justifyContent: "center", padding: "50px 0px" },
  ReCapContainer: { justifyContent: "center" },
  ButtonContainer: { justifyContent: "center" },
  Button: { borderRadius: "25px" },
  InputLabelProps: { sx: { color: "black" } },
});

export default function Contact() {
  const classes = styles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [summary, setSummary] = useState("");
  const [reCapValue, setReCapValue] = useState(null);
  const [contactMessageSent, setContactMessageSent] = useState(false);

  const handleNameChange = (e) => setFullName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleReChange = (e) => {
    setReCapValue(e);
  };

  const handleContactSubmit = () => {
    if (fullName !== "" && email !== "" && summary !== "" && reCapValue !== null) {
      fetch("https://mattkearns.dev/contact_form_submission.php", {
        credentials: "include",
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "Content-Type": "application/x-www-form-urlencoded",
          "Upgrade-Insecure-Requests": "1",
        },
        body: `email=${encodeURI(email)}&summary=${encodeURI(summary)}&fullName=${encodeURI(
          fullName
        )}&reCapValue=${encodeURI(reCapValue)}`,
        method: "POST",
        mode: "cors",
      }).then(() => {
        setContactMessageSent(true);
      });
    }
  };

  return (
    <div style={classes.ContactContainer}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom sx={classes.Title}>
          Contact Me
        </Typography>
        <Paper sx={classes.Paper}>
          <Grid container spacing={1} sx={classes.FormContainer}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Full Name"
                value={fullName}
                onChangeCapture={handleNameChange}
                required
                InputLabelProps={classes.InputLabelProps}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChangeCapture={handleEmailChange}
                required
                InputLabelProps={classes.InputLabelProps}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="Summary"
                value={summary}
                multiline
                rows={3}
                onChangeCapture={handleSummaryChange}
                required
                InputLabelProps={classes.InputLabelProps}
              />
            </Grid>
            <Grid item xs={10} container sx={classes.ReCapContainer}>
              <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_KEY} onChange={handleReChange} />
            </Grid>
            <Grid container item xs={6} sx={classes.ButtonContainer}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleContactSubmit}
                sx={classes.Button}
                disabled={contactMessageSent}
              >
                {contactMessageSent ? "Sent" : "Send"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
