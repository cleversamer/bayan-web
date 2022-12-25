import Testimonial from "v3/hoc/Testimonial";

import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";
import WhatsApp from "v3/components/WhatsApp";

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
