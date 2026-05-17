import "../App.css";

import { FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (

        <footer className="footer">

            <div className="footer-socials">

                <a href="">
                    <FaInstagram />
                </a>

                <a href="">
                    <FaTwitter />
                </a>

                <a href="">
                    <FaWhatsapp />
                </a>

            </div>

            <p className="footer-copy">
                ©2026 LAVENDORY. All Rights Reserved.
            </p>

        </footer>

    );
}

export default Footer;