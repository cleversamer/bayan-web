import { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";

const Package = ({ item }) => {
  const [active, setActive] = useState(!!item.active);

  const mapDate = (strDate) => {
    const date = new Date(strDate);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <Container>
      <Image src="/package.png" alt="bag" />

      <Dates>
        <Text fontSize="11">منذ {mapDate(item.date)}</Text>
        <Text fontSize="11">حتى {mapDate(item.expiresAt)}</Text>
      </Dates>

      <Info>
        <Text fontSize="11">الصف {item.grade[0].number}</Text>
        <Text fontSize="11">باقة {item.package[0].numOfSubjects} مواد</Text>
      </Info>

      <ToggleSwitch>
        <Switch
          checked={active}
          onChange={() => setActive(!active)}
          onColor="#26ABBB"
        />
      </ToggleSwitch>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 200px;
  height: 170px;
  border: 1px solid #707070;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 5px;
`;

const Dates = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Text = styled.p`
  color: #303030;
  font-size: ${({ fontSize }) => `${fontSize}px`};
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

export default Package;
