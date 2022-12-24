/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";

import usersApi from "v2/api/user/users";

import SubscriptionsList from "./SubscriptionsList";
import SubjectsList from "./SubjectsList";
import { BiArrowBack } from "react-icons/bi";

const Subscriptions = ({ userId, version }) => {
  const [view, setView] = useState("all"); // view types = ["all", "one"]
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    setSubscriptions({ loading: true, data: [] });

    usersApi.admin
      .getUserSubscriptions(userId)
      .then((res) => {
        setSubscriptions({ loading: false, data: mapSubscriptions(res.data) });
      })
      .catch((err) => {
        setSubscriptions({ loading: false, data: [] });
      });
  }, [version]);

  const mapSubscriptions = (subscriptions = []) => {
    return subscriptions.map((item) => {
      const unmappedSubjects = item.subjects;

      item.subjectsList.map((subject) => {
        const unmappedItemIndex = unmappedSubjects.findIndex(
          (u) => u.ref.toString() === subject._id.toString()
        );
        subject.active = unmappedSubjects[unmappedItemIndex].active;

        return subject;
      });

      return item;
    });
  };

  const switchView = (value) => {
    if (value !== view) {
      setView(value);
    }
  };

  const handleBagClick = (subscription, gradeNumber) => {
    switchView("one");
    setSelectedSubscription({ ...subscription, gradeNumber });
  };

  return (
    <Container>
      {view !== "all" && (
        <Arrow onClick={() => switchView("all")}>
          <BiArrowBack size={26} />
        </Arrow>
      )}

      {view === "all" ? (
        <SubscriptionsList
          subscriptions={subscriptions}
          onBagClick={handleBagClick}
        />
      ) : (
        <SubjectsList subscription={selectedSubscription} />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const Arrow = styled.div`
  align-self: flex-start;
  margin-left: 15px;
  background-color: rgba(20, 63, 217, 0.03);
  background: none;
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 176ms;
  padding: 5px;

  :hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 20px 0px rgba(20, 63, 217, 0.2);
    -webkit-box-shadow: 0px 0px 20px 0px rgba(20, 63, 217, 0.2);
    -moz-box-shadow: 0px 0px 20px 0px rgba(20, 63, 217, 0.2);
  }

  :active {
    transform: scale(0.97);
  }
`;

export default Subscriptions;
