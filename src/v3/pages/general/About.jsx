import Testimonial from "v3/hoc/Testimonial";

import Footer from "v3/components/Footer";
import Navbar from "v3/components/Navbar";
import Social from "v3/components/Social";
import WhatsApp from "v3/components/WhatsApp";

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
