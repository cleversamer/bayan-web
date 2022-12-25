import { useState } from "react";

import levelsApi from "v3/api/tutorial/levels";
import toast from "v3/services/toast";

import MainAdmin from "./MainAdmin";
import PopupMessage from "v3/components/PopupMessage";

const AddLevel = () => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    photo: null,
    submitting: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, submitting: true });

    const { title, photo } = formData;
    levelsApi
      .createLevel(title, photo)
      .then((res) => {
        toast.showSuccess("تمت العملية بنجاح");
      })
      .catch((err) => {
        toast.showWarning(err?.response?.data?.message?.ar || err.message);
      })
      .finally(() => {
        setFormData({
          title: "",
          photo: null,
          submitting: false,
        });

        setSelectedPhotoUrl("");
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  const handleChange = (key) => (e) => {
    let value = e.target.value;

    if (e.target.files) {
      value = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = () => {
        setSelectedPhotoUrl(reader.result);
      };
    }

    setFormData({ ...formData, [key]: value });
  };

  const content = (
    <div className="w-full flex items-start justify-end text-right text-[#26ABBB]">
      {formData.submitting && <PopupMessage message="جاري إضافة المرحلة" />}

      <form onSubmit={handleSubmit} id="my_form">
        <label className="mt-4">اسم المرحلة </label>

        <input
          required
          type="text"
          onChange={handleChange("title")}
          value={formData.title}
          id="name"
          className="w-full rounded-lg py-1 border-[#E9E9E9] border-2  focus:outline-none text-right pr-14  "
        />

        <label className="mt-4">صورة المرحلة</label>

        <div className="w-full text-right flex justify-end align-center items-center py-3">
          <p style={{ margin: "auto 0", marginRight: "5px" }}>
            {formData.photo?.name}
          </p>

          <input
            required
            type="file"
            onChange={handleChange("photo")}
            accept="image/png image/jpg image/jpeg"
            className="w-[97px] "
          />
        </div>

        <div className="flex items-end justify-end  p-4">
          {selectedPhotoUrl && (
            <img src={selectedPhotoUrl} alt="" className="w-[60px] block " />
          )}
        </div>

        <button
          className="bg-[#26ABBB] rounded-3xl py-2 px-3 my-4 lg:px-4 border-[#24343F]  text-white text-base "
          disabled={formData.submitting}
        >
          تنفيذ{" "}
        </button>
      </form>
    </div>
  );

  return (
    <div className="w-full ">
      <MainAdmin content={content} info="اضافة مرحلة  جديدة " />
    </div>
  );
};

export default AddLevel;
