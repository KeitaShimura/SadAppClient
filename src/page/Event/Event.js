import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Event.scss";
import { getEventsApi } from "../../api/event";
import ListEvents from "../../components/ListEvents";
import { Button, Spinner } from "react-bootstrap";

export default function Event(props) {
  const [events, setEvents] = useState(null);
  const [page, setPage] = useState(1);
  const { setRefreshCheckLogin } = props;

  const [loadingEvents, setLoadingEvents] = useState(false);

  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    setLoadingEvents(true);

    getEventsApi(pageTemp, pageSize).then((response) => {
      if (!response) {
        setLoadingEvents(0);
      } else {
        setEvents((prevPosts) => [
          ...(Array.isArray(prevPosts) ? prevPosts : []),
          ...response.data,
        ]);
        setPage(pageTemp);
        setLoadingEvents(false);
      }
    });
  };

  useEffect(() => {
    const pageTemp = page + 1;
    const pageSize = 50;
    console.log("Page:", page, "PageSize:", pageSize);

    setLoadingEvents(true);
    getEventsApi().then((response) => {
      setEvents(response.data); // この行を確認
      if (!response) {
        setLoadingEvents(0);
      } else {
        setPage(pageTemp);
        setLoadingEvents(false);
      }
    });
  }, []);

  console.log(events);

  return (
    <BasicLayout className="event" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="event__title">
        <h2>投稿一覧</h2>
      </div>
      {events && <ListEvents events={events} />}
      <Button className="load-button" onClick={moreData}>
        {!loadingEvents ? (
          loadingEvents !== 0 && "もっと見る"
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

Event.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
