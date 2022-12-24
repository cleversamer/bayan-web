import styled from "styled-components";
import Package from "./Package";

// Form of the data that comes from the server...
const subscriptions = [
  {
    _id: "subscription-1",
    active: false,
    date: new Date().toString(),
    expiresAt: new Date().toString(),
    package: [
      {
        _id: "package-1",
        numOfSubjects: "5",
      },
    ],
    grade: [
      {
        _id: "grade-1",
        number: "8",
      },
    ],
  },
  {
    _id: "subscription-2",
    active: true,
    date: new Date().toString(),
    expiresAt: new Date().toString(),
    package: [
      {
        _id: "package-1",
        numOfSubjects: "3",
      },
    ],
    grade: [
      {
        _id: "grade-1",
        number: "5",
      },
    ],
  },
  {
    _id: "subscription-3",
    active: true,
    date: new Date().toString(),
    expiresAt: new Date().toString(),
    package: [
      {
        _id: "package-1",
        numOfSubjects: "3",
      },
    ],
    grade: [
      {
        _id: "grade-1",
        number: "6",
      },
    ],
  },
  {
    _id: "subscription-4",
    active: true,
    date: new Date().toString(),
    expiresAt: new Date().toString(),
    package: [
      {
        _id: "package-1",
        numOfSubjects: "3",
      },
    ],
    grade: [
      {
        _id: "grade-1",
        number: "7",
      },
    ],
  },
];

const PackagesList = () => {
  return (
    <Container>
      {subscriptions.map((item) => (
        <Package key={item._id} item={item} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-content: flex-start;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-height: 430px;
  overflow-y: auto;
  padding-right: 10px;
`;

export default PackagesList;
