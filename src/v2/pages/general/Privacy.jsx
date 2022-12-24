import Testimonial from "v2/hoc/Testimonial";

import Footer from "v2/components/Footer";
import Navbar from "v2/components/Navbar";
import Social from "v2/components/Social";
import WhatsApp from "v2/components/WhatsApp";

const Info = ({ content }) => {
  return (
    <>
      <Social />
      <Navbar target="main" />
      <Testimonial title="الخصوصية" content={content} />
      <Footer />
      <WhatsApp />
    </>
  );
};

export default Info;
