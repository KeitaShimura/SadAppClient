import React from "react";
import './Footer.scss'; // Import SCSS module

const Footer = () => {
    return (
        <footer className="footer">
            <a href="/terms-of-service">利用規約</a>
            <a href="/privacy-policy">プライバシーポリシー</a>
            <p>© 2023 COCOLOTalk</p>
        </footer>
    );
};

export default Footer;
