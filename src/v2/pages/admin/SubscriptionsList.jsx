import styled from "styled-components";
import SubscriptionItem from "./SubscriptionItem";

const SubscriptionsList = ({ subscriptions, onBagClick }) => {
  return (
    <>
      <Heading>
        {subscriptions.loading
          ? "...جاري تحميل إشتراكات الطّالب"
          : "الباقات المشترك بها الطّالب"}
      </Heading>

      {subscriptions.data.length ? (
        <List>
          {subscriptions.data.map((item) => (
            <SubscriptionItem
              key={item._id}
              subscription={item}
              onBagClick={onBagClick}
            />
          ))}
        </List>
      ) : (
        <SubHeading>الطّالب غير مشترك في أيّ باقة</SubHeading>
      )}
    </>
  );
};

const Heading = styled.h4`
  text-align: center;
  font-weight: 700;
`;

const SubHeading = styled.p`
  text-align: center;
  font-weight: 700;
`;

const List = styled.ul`
  display: grid;
  place-content: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-height: 430px;
  overflow-y: auto;
  padding-right: 10px;
`;

export default SubscriptionsList;
