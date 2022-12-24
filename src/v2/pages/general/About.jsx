import Testimonial from "v2/hoc/Testimonial";

import Footer from "v2/components/Footer";
import Navbar from "v2/components/Navbar";
import Social from "v2/components/Social";
import WhatsApp from "v2/components/WhatsApp";

const About = ({ content }) => {
  return (
    <>
      <Social />
      <Navbar target="about" />
      <Testimonial title="من نحن" content={content} />
      <Footer />
      <WhatsApp />
    </>
  );
};

export default About;
