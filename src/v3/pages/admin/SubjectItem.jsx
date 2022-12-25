import { useState } from "react";
import styled from "styled-components";

import usersApi from "v3/api/user/users";
import toast from "v3/services/toast";

import Switch from "react-switch";
import { GrFormClose } from "react-icons/gr";

const SubjectItem = ({ subscription, subject }) => {
  const [active, setActive] = useState(subject.active);

  const handleToggleSubjectActive = (subjectId) => {
    usersApi.admin
      .toggleSubjectActive(subscription._id, subjectId)
      .then((res) => {
        const active = res.data.active;
        setActive(active);

        if (active) {
          toast.showSuccess("تم تفعيل المادة في الإشتراك");
        } else {
          toast.showWarning("تم إلغاء تفعيل المادة في الإشتراك");
        }
      })
      .catch((err) => {
        toast.showError(err?.response?.data?.message?.ar || err.message);
      });
  };

  return (
    <Subject>
      <Grade>الصف {subscription.gradeNumber}</Grade>

      <SubjectTitle>{subject.title}</SubjectTitle>

      <SubjectImage src={subject.photoURL} />

      <Switch
        // disabled={active.loading}
        checked={active}
        onChange={() => handleToggleSubjectActive(subject._id)}
        onColor="#26ABBB"
        offColor="#c00"
      />

      <DeleteIcon>
        <GrFormClose size={22} />
      </DeleteIcon>
    </Subject>
  );
};

const Subject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid #707070;
  border-radius: 20px;
  padding: 10px;
  width: 170px;
  position: relative;
`;

const Grade = styled.p`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;

const SubjectTitle = styled.p`
  text-align: center;
  font-weight: 700;
  margin: 0;
`;

const SubjectImage = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto;
  background-image: ${({ src }) => `url(${src})`};
  background-position: center;
  background-size: contain;
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition-duration: 176ms;

  :hover {
    transform: scale(1.05);
  }

  :active {
    transform: scale(0.97);
  }
`;

export default SubjectItem;
