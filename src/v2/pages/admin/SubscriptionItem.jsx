/* eslint-disable eqeqeq */
import { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";

import usersApi from "v2/api/user/users";
import toast from "v2/services/toast";

const SubscriptionItem = ({
  subscription,
  adminView = true,
  onBagClick = () => {},
}) => {
  const [active, setActive] = useState({
    loading: false,
    value: !!subscription?.active,
  });

  const handleToggleActive = () => {
    setActive({ ...active, loading: true });

    usersApi.admin
      .toggleSubscriptionActive(subscription._id)
      .then((res) => {
        const { active } = res.data;
        setActive({ value: active, loading: false });

        if (active) {
          toast.showSuccess("تم تفعيل إشتراك الطّالب بنجاح");
        } else {
          toast.showWarning("تم إلغاء تفعيل إشتراك الطّالب بنجاح");
        }
      })
      .catch((err) => {
        setActive({ ...active, loading: false });
      });
  };

  const mapDate = (strDate) => {
    const date = new Date(strDate);
    const localeString = date.toLocaleDateString().split("/");
    const val = localeString[0];
    localeString[0] = localeString[1];
    localeString[1] = val;

    return localeString.join("/");
  };

  const { numOfSubjects } = subscription?.package[0];
  const { number: gradeNumber } = subscription?.grade[0];

  return (
    <Container>
      <BagImage onClick={() => onBagClick(subscription, gradeNumber)} />

      <Dates>
        <Text fontSize="11">منذ {mapDate(subscription.date)}</Text>
        <Text fontSize="11">حتى {mapDate(subscription.expiresAt)}</Text>
      </Dates>

      <Info>
        <Text fontSize="15">الصف {gradeNumber}</Text>
        <Text fontSize="15">
          باقة {numOfSubjects} {numOfSubjects == 1 ? "مادة" : "مواد"}
        </Text>
      </Info>

      {adminView && (
        <ToggleSwitch>
          <Switch
            disabled={active.loading}
            checked={active.value}
            onChange={handleToggleActive}
            onColor="#26ABBB"
            offColor="#c00"
          />
        </ToggleSwitch>
      )}
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  width: 200px;
  height: 170px;
  border: 1px solid #707070;
  border-radius: 20px;
  padding: 10px;
`;

const BagImage = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  background-image: url("/assets/package.png");
  background-position: center;
  background-size: contain;
  cursor: pointer;
  transition-duration: 176ms;

  :hover {
    transform: scale(0.97);
  }
`;

const Dates = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Text = styled.p`
  color: #303030;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: 700;
  margin-bottom: 5px;
`;

const Info = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  text-align: right;
`;

const ToggleSwitch = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

export default SubscriptionItem;
