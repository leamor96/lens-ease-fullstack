import { FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { GiMicroscopeLens } from "react-icons/gi";
import "./Footer.css";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" text-light footer">
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
            target="_blank"
            href="https://www.linkedin.com/in/lea-ohayon-0938ab265"
            className="text-light mx-2" rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            target="_blank"
            href="mailto:leamor96@gmail.com"
            className="text-light mx-2"
            rel="noreferrer"
          >
            <FaEnvelope />
          </a>
          <a
            target="_blank"
            href="https://api.whatsapp.com/send?phone=972584182639"
            className="text-light mx-2"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="copyright-mobile text-center">
        <small className="m-2">© {currentYear} Copyright: Lea Ohayon</small>
      </div>
    </footer>
  );
};
export default Footer;
