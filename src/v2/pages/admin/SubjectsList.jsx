import styled from "styled-components";
import SubjectItem from "./SubjectItem";

const SubjectsList = ({ subscription }) => {
  if (!subscription) {
    return null;
  }

  return (
    <>
      <Heading>مواد باقة الإشتراك</Heading>

      {subscription.subjectsList.length ? (
        <List>
          {subscription.subjectsList.map((subject) => (
            <SubjectItem
              key={subject._id}
              subscription={subscription}
              subject={subject}
            />
          ))}
        </List>
      ) : (
        <SubHeading>لا يوجد مواد مٌضافة لهذا الإشتراك</SubHeading>
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

export default SubjectsList;
