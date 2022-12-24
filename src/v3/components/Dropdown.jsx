import { useState } from "react";
import styled from "styled-components";

import { BiChevronsDown } from "react-icons/bi";

const Dropdown = ({ items = [] }) => {
  const [active, setActive] = useState(false);

  return (
    <Container>
      <Button onClick={() => setActive(!active)}>
        <BiChevronsDown />
        <Heading>موادي</Heading>
      </Button>

      {active && (
        <Content>
          {items.length ? (
            items.map((item) => (
              <Item>
                <ItemImage
                  key={item._id}
                  src={item.photoURL}
                  alt={item.tutle}
                />
                <ItemHeading>{item.title}</ItemHeading>
              </Item>
            ))
          ) : (
            <Item>لا يوجد مواد</Item>
          )}
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  transition-duration: 0.4s;
  cursor: pointer;
  position: relative;
`;

const Button = styled.button`
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 21px;
  font-weight: 500;
  transition-duration: 176ms;

  :hover svg {
    transform: translateY(5px);
  }

  svg {
    transition-duration: 176ms;
    margin-top: 3px;
  }

  :hover {
    box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  }
`;

const Heading = styled.span``;

const Content = styled.div`
  position: absolute;
  top: 110%;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
`;

const Item = styled.div`
  padding: 10px;
  transition-duration: 176ms;
  width: 120px;
  text-align: right;

  :hover {
    background-color: #eee;
  }
`;

const ItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ItemHeading = styled.span``;

export default Dropdown;
