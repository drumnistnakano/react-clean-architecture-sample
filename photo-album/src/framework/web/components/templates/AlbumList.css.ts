import { style } from "@vanilla-extract/css";

export const albumList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  justifyContent: "center",
  padding: "1rem",
});

export const albumCard = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "180px",
  height: "220px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
});

export const albumTitle = style({
  marginTop: "0.5rem",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  padding: "0 0.5rem",
});

export const albumId = style({
  marginTop: "0.25rem",
  fontSize: "0.75rem",
  color: "#666",
  textAlign: "center",
});
