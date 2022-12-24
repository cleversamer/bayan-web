/* eslint-disable react/jsx-no-target-blank */
import { FaWhatsappSquare } from "react-icons/fa";

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/+970567682999"
      target="_blank"
      className="fixed bottom-[7px] right-[7px]  md:right-10 hover:text-[#25d366] text-[#25d366] "
    >
      <FaWhatsappSquare size={80} />
    </a>
  );
};

export default WhatsApp;
