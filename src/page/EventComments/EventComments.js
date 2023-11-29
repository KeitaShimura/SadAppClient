import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ListEventComments from "../ListEventComments";
import BasicLayout from "../../layout/BasicLayout";
import { deleteEventApi, getEventApi } from "../../api/event";
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
import {
  checkIfEventLikedApi,
  getLikesForEventApi,
  likeEventApi,
  unlikeEventApi,
} from "../../api/eventLike";
import {
  ParticipationEventApi,
  checkIfEventParticipantsApi,
  getParticipantsForEventApi,
  leaveEventApi,
} from "../../api/eventParticipant";
import useAuth from "../../hooks/useAuth";

function EventComments(props) {
  const { setRefreshCheckLogin } = props;
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [eventComments, setEventComments] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingEventComments, setLoadingEventComments] = useState(false);
  const [message, setMessage] = useState("");
  const maxLength = 200;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isParticipated, setIsParticipated] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const authUser = useAuth();

  const navigate = useNavigate();

  const handleShowLikes = (eventId) => {
    navigate(`/event_likes/${eventId}`);
  };

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

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const likeStatus = await checkIfEventLikedApi(event.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };

    fetchLikeData();
  }, [event, authUser.id]);

  useEffect(() => {
    // コメント数の取得
    const fetchCommentCount = async () => {
      try {
        const comments = await getEventCommentsApi(event.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentCount();
  }, [event]);

  const updateLikeCount = async () => {
    try {
      const likesData = await getLikesForEventApi(event.id);
      setLikeCount(likesData.length);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleLike = () => {
    likeEventApi(event.id)
      .then(() => {
        setIsLiked(true);
        updateLikeCount();
      })
      .catch((error) => console.error("Like Error:", error));
  };

  const handleUnlike = () => {
    unlikeEventApi(event.id)
      .then(() => {
        setIsLiked(false);
        updateLikeCount();
      })
      .catch((error) => console.error("Unlike Error:", error));
  };

  const handleDelete = () => {
    deleteEventApi(event.id);
  };

  const handleShowParticipants = (eventId) => {
    navigate(`/event_participants/${eventId}`);
  };

  useEffect(() => {
    const fetchParticipateData = async () => {
      try {
        const participantStatus = await checkIfEventParticipantsApi(
          event.id,
          authUser.id,
        );
        setIsParticipated(participantStatus);
        updateParticipantsCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };

    fetchParticipateData();
  }, [event, authUser]);

  const updateParticipantsCount = async () => {
    try {
      const likesData = await getParticipantsForEventApi(event.id);
      setParticipantCount(likesData.length);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleParticipation = () => {
    ParticipationEventApi(event.id)
      .then(() => {
        setIsParticipated(true);
        updateParticipantsCount();
      })
      .catch((error) => console.error("Like Error:", error));
  };

  const handleLeave = () => {
    leaveEventApi(event.id)
      .then(() => {
        setIsParticipated(false);
        updateParticipantsCount();
      })
      .catch((error) => console.error("Unlike Error:", error));
  };

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

  const iconUrl =
    event && event.user && event.user.icon ? event.user.icon : IconNotFound;

  console.log(iconUrl);
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
            <div>
              <div>
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
                    <a
                      href={event.event_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.event_url}
                    </a>
                  </div>
                  <div>
                    <strong>開催日: </strong>
                    {event.event_date}
                  </div>
                </div>
              </div>
              <div>
                {isLiked ? (
                  <button onClick={handleUnlike}>いいね済み</button>
                ) : (
                  <button onClick={handleLike}>いいねする</button>
                )}
                <span>{likeCount} いいね</span>
                <button onClick={() => handleShowLikes(event.id)}>
                  いいね一覧
                </button>
                {isParticipated ? (
                  <button onClick={handleLeave}>参加を辞める</button>
                ) : (
                  <button onClick={handleParticipation}>参加する</button>
                )}
                <span>{participantCount} 人</span>
                <button onClick={() => handleShowParticipants(event.id)}>
                  参加者一覧
                </button>
                <span>{commentCount} コメント</span>
                {authUser.sub === String(event.user.id) && (
                  <button onClick={handleDelete}>削除</button>
                )}
              </div>
            </div>
          )}
        </div>
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