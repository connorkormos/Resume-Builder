import { useMediaQuery } from "@/hooks/useMediaQuery";

import { PiPrinterBold } from "react-icons/pi";

import styles from "../Toolbar.module.css";

export default function Print({ handlePrint }) {
  const isMobile = useMediaQuery(('(max-width: 768px)'));
  return (
    <button
      data-toolbar-label="Print Resume"
      className={`buttonMain ${styles.printButton}`}
      onClick={handlePrint}
    >
      {/* {isMobile ?  */}
      <PiPrinterBold style={{scale: 1.2}} />
       {/* : 'Print'} */}
    </button>
  );
}
