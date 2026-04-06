import { styles } from "../styles/theme";
import { COMPANY } from "../constants/data";

export function FloatingButtons() {
  return (
    <div style={styles.floatingBtns}>
      <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" style={styles.floatWA} title="WhatsApp">💬</a>
      <a href={`tel:${COMPANY.phone1}`} style={styles.floatCall} title="Call">📞</a>
    </div>
  );
}
