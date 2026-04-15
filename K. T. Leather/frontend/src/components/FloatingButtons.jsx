import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { styles } from "../styles/theme";
import { COMPANY } from "../constants/data";

export function FloatingButtons() {
  return (
    <div style={styles.floatingBtns}>
      <a
        href={`https://wa.me/${COMPANY.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        style={styles.floatWA}
        title="WhatsApp"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={24} />
      </a>
      <a href={`tel:${COMPANY.phone1}`} style={styles.floatCall} title="Call" aria-label="Call">
        <FaPhoneAlt size={24} />
      </a>
    </div>
  );
}
