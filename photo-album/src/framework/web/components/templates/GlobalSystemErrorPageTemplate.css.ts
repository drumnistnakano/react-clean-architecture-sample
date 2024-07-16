import { style } from "@vanilla-extract/css";

export const globalErrorPageWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100%",
});

export const errorMessage = style({
  color: "#ff6b6b",
  textAlign: "center",
  /* cspell:disable-next-line */
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: "Arial, sans-serif",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "bold",
  lineHeight: "26px",
});

export const errorButton = style({
  display: "flex",
  marginTop: "3rem",
  width: "200px",
  height: "40px",
  padding: "12px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  borderRadius: "8px",
  background: "#fff",
});
