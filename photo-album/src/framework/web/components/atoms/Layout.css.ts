import { globalStyle } from "@vanilla-extract/css";

globalStyle("html", {
  paddingTop: "env(safe-area-inset-top)",
  paddingBottom: "env(safe-area-inset-bottom)",
  paddingLeft: "env(safe-area-inset-left)",
  paddingRight: "env(safe-area-inset-right)",
});

globalStyle("body", {
  margin: "0",
  padding: "0",
  height: "100%",
  width: "100%",
  textAlign: "center",
  minHeight: "100%",
  backgroundColor: "#f4ecd8",
  backgroundImage: `
    repeating-linear-gradient(
      45deg,
      #f4ecd8 0,
      #f4ecd8 10px,
      #e0d8c3 10px,
      #e0d8c3 20px
    ),
    repeating-linear-gradient(
      -45deg,
      #f4ecd8 0,
      #f4ecd8 10px,
      #e0d8c3 10px,
      #e0d8c3 20px
    )`,
  fontFamily: "'Times New Roman', Times, serif",
});
