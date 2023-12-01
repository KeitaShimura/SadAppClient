import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Event.scss";
import { getEventsApi } from "../../api/event";
import ListEvents from "../../components/ListEvents";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Event(props) {
  const [events, setEvents] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(null); // フィルタリングされたイベント用のステート
  const [searchTerm, setSearchTerm] = useState(""); // 検索用のステート
  const [page, setPage] = useState(1);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const { setRefreshCheckLogin } = props;
  const pageSize = 50;

  const moreData = () => {
    setLoadingEvents(true);
    getEventsApi(page, pageSize)
      .then((response) => {
        if (response) {
          setEvents((prevEvents) => [
            ...(Array.isArray(prevEvents) ? prevEvents : []),
            ...response.data,
          ]);
          setPage((prevPage) => prevPage + 1);
          // 成功時にもメッセージを表示
          toast.success("イベントデータを取得しました。");
        }
        setLoadingEvents(false);
      })
      .catch((error) => {
        toast.error("イベントデータの取得中にエラーが発生しました。");
        console.error("Get More Events Error:", error);
        setLoadingEvents(false);
      });
  };

  // イベントデータの取得
  useEffect(() => {
    setLoadingEvents(true);
    getEventsApi(page, pageSize)
      .then((response) => {
        if (response) {
          setEvents(response.data);
          // 成功時にもメッセージを表示
          toast.success("イベントデータを取得しました。");
        }
        setLoadingEvents(false);
      })
      .catch((error) => {
        toast.error("イベントデータの取得中にエラーが発生しました。");
        console.error("Get Events Error:", error);
        setLoadingEvents(false);
      });
  }, [page, pageSize]);

  // 検索処理
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events?.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.event_url.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredEvents(filtered);
    }
  }, [searchTerm, events]);

  return (
    <BasicLayout className="event" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="event__title">
        <h2>イベント一覧</h2>
        <input
          type="text"
          placeholder="イベント検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredEvents && filteredEvents.length > 0 ? (
        <ListEvents events={filteredEvents} />
      ) : (
        "検索結果がありません"
      )}
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
