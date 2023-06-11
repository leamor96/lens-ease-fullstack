import { FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { GiMicroscopeLens } from "react-icons/gi";
import "./Footer.css"

export const Footer = () => {
const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light">
      <div
        className="container py-4 d-flex justify-content-between align-items-center"
        style={{ width: "80%" }}
      >
        <div className="d-flex align-items-center">
          <a href="/" className="d-flex align-items-center p-0 text-dark">
            <span className="brand text-light">LensEase</span>
            <GiMicroscopeLens className="logo" />
          </a>
        </div>
        <div className="copyright">
          <small className="m-2">© {currentYear} Copyright: Lea Ohayon</small>
        </div>
        <div className="d-flex social">
          <a
            href="https://www.linkedin.com/in/lea-ohayon-0938ab265"
            className="text-light mx-2"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:leamor96@gmail.com" className="text-light mx-2">
            <FaEnvelope />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=0584182639"
            className="text-light mx-2"
          >
            <FaWhatsapp />
          </a>
        </div>
        <div className="copyright-mobile d-none">
          <small className="m-2">© {currentYear} Copyright: Lea Ohayon</small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;