import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Event.scss";
import { getEventsApi } from "../../api/event";
import ListEvents from "../../components/ListEvents";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import EventModal from "../../components/Modal/EventModal";

export default function Event(props) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const { setRefreshCheckLogin } = props;
  const pageSize = 100;
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadEvents = () => {
    if (!loadingEvents) {
      setLoadingEvents(true);
      getEventsApi(page, pageSize)
        .then((response) => {
          if (response && response.data.length > 0) {
            setEvents((prevEvents) => [
              ...(Array.isArray(prevEvents) ? prevEvents : []),
              ...response.data,
            ]);
            setPage((prevPage) => prevPage + 1);
            setHasMoreData(response.data.length === pageSize);
          } else {
            setHasMoreData(false);
          }
          setLoadingEvents(false);
        })
        .catch(() => {
          setLoadingEvents(false);
          setHasMoreData(false);
          toast.error("イベントデータの取得中にエラーが発生しました。");
        });
    }
  };

  const moreData = () => {
    loadEvents();
  };

  // 初期表示時にイベントデータを読み込む
  useEffect(() => {
    loadEvents();
  }, []); // 依存配列を空に設定

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadEvents();
    };

    window.addEventListener("scroll", handleScroll);

    // クリーンアップ関数
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingEvents]);

  // 検索用のフィルタリング
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.event_url.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredEvents(filtered);
    }
  }, [events, searchTerm]);

  return (
    <BasicLayout className="event" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="event__header">
        <div className="right-aligned">
          <input
            type="text"
            className="form-control"
            placeholder="イベント検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="button-container">
            <Button onClick={() => setShowEventModal(true)}>
              イベントを投稿する
            </Button>
          </div>
          <EventModal show={showEventModal} setShow={setShowEventModal} />
        </div>
      </div>

      <div className="event__content">
        {filteredEvents && filteredEvents.length > 0 ? (
          <ListEvents events={filteredEvents} />
        ) : (
          <p className="text-center mt-2 fw-bold">イベントは存在しません</p>
        )}
        {hasMoreData && (
          <Button onClick={moreData}>
            {!loadingEvents ? (
              "もっと見る"
            ) : (
              <Spinner
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        )}
      </div>
    </BasicLayout>
  );
}

Event.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
