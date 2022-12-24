/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import levelsApi from "v2/api/tutorial/levels";

import Header from "v2/components/main/Header";
import PopupVideo from "v2/components/main/PopupVideo";
import Footer from "v2/components/Footer";
import Navbar from "v2/components/Navbar";
import Social from "v2/components/Social";
import WhatsApp from "v2/components/WhatsApp";

const Main = () => {
  const [levels, setLevels] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    levelsApi
      .getAllLevels()
      .then((res) => {
        setLevels(sortLevels(res.data));
      })
      .catch((err) => {
        //
      });
  }, []);

  const sortLevels = (levels = []) => {
    const arr = [...levels];

    const index1 = arr.findIndex((item) => item.title.includes("ثانوي"));
    const val1 = arr[0];
    arr[0] = arr[index1];
    arr[index1] = val1;

    const index2 = arr.findIndex((item) => item.title.includes("متوسط"));
    const val2 = arr[1];
    arr[1] = arr[index2];
    arr[index2] = val2;

    const index3 = arr.findIndex((item) => item.title.includes("بتدائ"));
    const val3 = arr[2];
    arr[2] = arr[index3];
    arr[index3] = val3;

    return arr;
  };

  return (
    <div className={`w-full ${showVideo && "max-h-[80vh] overflow-hidden"} `}>
      <Social />
      <Navbar target="main" />
      <Header levels={levels} setShowVideo={setShowVideo} />
      {showVideo && <PopupVideo setShowVideo={setShowVideo} />}
      <Footer />
      <WhatsApp />
    </div>
  );
};

export default Main;
