import React from "react";

export function AdminLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/logo-wordmark.svg"
      alt="Lawyertec"
      style={{ height: "28px", width: "auto", maxWidth: "160px" }}
    />
  );
}

export function AdminIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/icon-mark.svg" alt="Lawyertec" style={{ height: "24px", width: "24px" }} />
  );
}
