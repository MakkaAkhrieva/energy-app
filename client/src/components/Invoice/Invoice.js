import React from "react";
import styles from "./Invoice.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Button from "@mui/material/Button";
import Pdf from "react-to-pdf";
import { createRef } from "react";
import { Logo } from "../storyBook/logo/Logo";

export const Invoice = () => {
  const ref = createRef();
  return (
    <>
      <div ref={ref} className={styles.container}>
        <div className={styles.logo_contain}>
          <Logo />
        </div>
        <p className={styles.name}>Thank for your purchase</p>
        <div className={styles.contain}>
          <div>
            <p>Name:John Doe</p>
            <p>Invoice:#12345</p>
            <p>Data: 27.02.2023</p>
          </div>
          <div>
            <p>Station name: name 1</p>
            <p>Location: Scruganova 4b</p>
            <p>Station power:22kWh</p>
            <p>Plug Type:Type 2</p>
            <p>Time: 45 min</p>
          </div>
        </div>
        <hr className={styles.plane_hr} />
        <div className={styles.wrapper}>
          <p>Price:</p>
          <p>0.4 BYN for 1 kWh</p>
        </div>
        <hr className={styles.plane_hr} />
        <div className={styles.wrapper}>
          <p>Quantity :</p>
          <p>30 kW</p>
        </div>
        <hr className={styles.hr_total} />
        <div className={styles.wrapper}>
          <p className={styles.paragraph}>Total:</p>
          <p className={styles.paragraph}>12 BYN </p>
        </div>
        <hr className={styles.hr_total} />
      </div>
      <div>
        <Pdf
          targetRef={ref}
          scale={1.5}
          x={20}
          y={40}
          filename="code-example.pdf"
        >
          {({ toPdf }) => (
            <Button
              className={styles.download}
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={toPdf}
            >
              Download
            </Button>
          )}
        </Pdf>
      </div>
    </>
  );
};
