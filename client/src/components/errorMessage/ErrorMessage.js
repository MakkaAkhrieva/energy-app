import img from "./error.gif";
import styles from "./Error.module.css";

const ErrorMessage = () => {
  return <img className={styles.error} src={img} alt="Error" />;
};

export default ErrorMessage;
