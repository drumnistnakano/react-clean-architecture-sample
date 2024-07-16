import { style } from "@vanilla-extract/css";

export const photoList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 200px)",
  gap: "1rem",
  padding: "1rem",
  justifyContent: "center",
});

export const photoCard = style({
  position: "relative",
  width: "200px",
  height: "200px",
  overflow: "hidden",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

export const photoTitle = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  padding: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: "bold",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "::before": {
    content: '"..."',
    position: "absolute",
    right: "0",
    bottom: "0.5rem",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export const spinnerContainer = style({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1,
});
