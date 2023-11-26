import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ListEventComments from "../ListEventComments";
import BasicLayout from "../../layout/BasicLayout";
import { getEventApi } from "../../api/event";
import {
  createEventCommentApi,
  getEventCommentsApi,
} from "../../api/eventComment";
import { Button, Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import classNames from "classnames";
import "./EventComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";

function EventComments(props) {
  const { setRefreshCheckLogin } = props;
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [eventComments, setEventComments] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingEventComments, setLoadingEventComments] = useState(false);
  const [message, setMessage] = useState("");
  const maxLength = 200;

  useEffect(() => {
    getEventCommentsApi(params.id)
      .then((response) => {
        setEventComments(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [params.id]);

  useEffect(() => {
    getEventApi(params.id)
      .then((response) => {
        setEvent(response.data);
        console.log(event);
      })
      .catch((error) => {
        console.error("Error fetching event:", error);
        toast.error("投稿の取得に失敗しました。");
      });
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call createEventCommentApi with the message
      const response = await createEventCommentApi(params.id, {
        content: message,
      });
      console.log("Comment created:", response.data);

      // Clear the message and close the modal
      toast.success(response.message);
    } catch (error) {
      // Handle any errors here
      console.error("Error creating event:", error);
      toast.warning(
        "ツイートの送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
    }
  };

  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    console.log("Page:", page, "PageSize:", pageSize);

    setLoadingEventComments(true);
    getEventCommentsApi(params.id)
      .then((response) => {
        if (!response) {
          setLoadingEventComments(false); // Handle the error condition
        } else {
          setEventComments(response.data);
          setPage(pageTemp);
          setLoadingEventComments(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching event comments:", error);
        setLoadingEventComments(false); // Handle the error condition
      });
  };

  const displayCommentCount = () => {
    if (eventComments === null) {
      return "コメントの読み込み中...";
    }
    return `コメント数: ${eventComments.length}`;
  };

  const iconUrl = (event && event.user && event.user.icon) ? event.user.icon : IconNotFound;


  console.log(iconUrl)
  return (
    <BasicLayout className="event" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="event">
        <Image className="icon" src={iconUrl} roundedCircle />
        <div>
          {event && event.user && (
            <div className="name">
              {event.user.name}
              <span>{moment(event.created_at).calendar()}</span>
            </div>
          )}

          {event && (
            <>
              <div className="title">
                <strong>タイトル: </strong>
                {event.title}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceURLWithHTMLLinks(event.content),
                }}
              ></div>
              <div className="event-details">
                <div>
                  <strong>イベントURL: </strong>
                  <a href={event.event_url} target="_blank" rel="noopener noreferrer">
                    {event.event_url}
                  </a>
                </div>
                <div>
                  <strong>開催日: </strong>
                  {event.event_date}
                </div>
              </div>
            </>
          )}
        </div>
        {displayCommentCount()}
      </div>

      <form onSubmit={onSubmit}>
        <textarea
          rows={6}
          type="text"
          name="content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="今の気持ちを共有してみましょう！"
        />
        <span
          className={classNames("count", {
            error: message.length > maxLength,
          })}
        >
          {message.length}
        </span>
        <Button
          type="submit"
          disabled={message.length > maxLength || message.length < 1}
        >
          投稿する
        </Button>
      </form>
      <div className="event__comment">
        <ListEventComments eventComments={eventComments} />
      </div>
      <Button onClick={moreData}>
        {!loadingEventComments ? (
          loadingEventComments !== 0 && "もっと見る"
        ) : (
          <Spinner
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

export default EventComments;

// propTypes の宣言
EventComments.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
