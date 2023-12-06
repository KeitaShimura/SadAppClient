import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListEvents.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import {
  checkIfEventLikedApi,
  getLikesForEventApi,
  likeEventApi,
  unlikeEventApi,
} from "../../api/eventLike";
import { deleteEventApi } from "../../api/event";
import { useNavigate } from "react-router-dom";
import {
  ParticipationEventApi,
  checkIfEventParticipantsApi,
  getParticipantsForEventApi,
  leaveEventApi,
} from "../../api/eventParticipant";
import { getEventCommentsApi } from "../../api/eventComment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListUl,
  faTrash,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function ListEvents(props) {
  const { events: initialEvents, setEvents: setInitialEvents } = props; // プロパティ名を変更
  const authUser = useAuth();

  const handleEventDeleted = (eventId) => {
    // イベントが削除された場合、events ステートを更新
    const updatedEvents = initialEvents.filter((event) => event.id !== eventId);
    setInitialEvents(updatedEvents); // 親コンポーネントの状態も更新
  };

  return (
    <div className="list-events">
      {map(initialEvents, (event) => (
        <Event
          key={event.id}
          event={event}
          authUser={authUser}
          onEventDeleted={handleEventDeleted} // onEventDeleted プロパティを渡す
        />
      ))}
    </div>
  );
}

ListEvents.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired, // setEvents プロパティを追加
};

function Event({ event, authUser, onEventDeleted }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isParticipated, setIsParticipated] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const navigate = useNavigate();

  const handleShowLikes = (eventId) => {
    navigate(`/event_likes/${eventId}`);
  };

  const handleShowEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleUserProfileShow = (userId) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const likeStatus = await checkIfEventLikedApi(event.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
        // エラーメッセージを表示
        toast.error("いいねの情報の取得中にエラーが発生しました。");
      }
    };

    fetchLikeData();
  }, [event, authUser]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!event) {
        console.error("Post is null");
        return;
      }

      try {
        const comments = await getEventCommentsApi(event.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("コメント数の取得中にエラーが発生しました。");
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
      // エラーメッセージ
      toast.error("いいね数の取得中にエラーが発生しました。");
    }
  };

  const handleLike = () => {
    likeEventApi(event.id)
      .then(() => {
        setIsLiked(true);
        updateLikeCount();
        // 「いいね」が成功した場合のメッセージ
        toast.success("イベントをいいねしました！");
      })
      .catch((error) => {
        console.error("Like Error:", error);
        // エラーメッセージ
        toast.error(
          "イベントをいいね中にエラーが発生しました。もう一度お試しください。",
        );
      });
  };

  const handleUnlike = () => {
    unlikeEventApi(event.id)
      .then(() => {
        setIsLiked(false);
        updateLikeCount();
        // 「いいね解除」が成功した場合のメッセージ
        toast.success("イベントのいいねを解除しました。");
      })
      .catch((error) => {
        console.error("Unlike Error:", error);
        // エラーメッセージ
        toast.error(
          "イベントのいいね解除中にエラーが発生しました。もう一度お試しください。",
        );
      });
  };

  const handleDelete = () => {
    const confirmation = window.confirm("投稿を削除しますか？");
    if (confirmation) {
      deleteEventApi(event.id)
        .then(() => {
          onEventDeleted(event.id);
          toast.success("投稿が削除されました。");
        })
        .catch((error) => {
          console.error("Delete Error:", error);
          toast.warning("投稿の削除中にエラーが発生しました。");
        });
    }
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
        // 参加成功時のメッセージ
        toast.success("イベントへの参加が成功しました。");
      })
      .catch((error) => {
        console.error("Participation Error:", error);
        // 参加エラー時のメッセージ
        toast.error("イベントへの参加中にエラーが発生しました。");
      });
  };

  const handleLeave = () => {
    leaveEventApi(event.id)
      .then(() => {
        setIsParticipated(false);
        updateParticipantsCount();
        // 退出成功時のメッセージ
        toast.success("イベントから退出しました。");
      })
      .catch((error) => {
        console.error("Leave Error:", error);
        // 退出エラー時のメッセージ
        toast.error("イベントからの退出中にエラーが発生しました。");
      });
  };

  const iconUrl = event.user?.icon ? event.user.icon : IconNotFound;

  return (
    <div className="event" onClick={() => handleShowEvent(event.id)}>
      <div
        className="header-container"
        onClick={(e) => {
          e.stopPropagation();
          handleUserProfileShow(event.user.id);
        }}
      >
        <Image className="icon" src={iconUrl} roundedCircle />
        {event.user && (
          <div className="name card-text">
            {event.user.name}
            <span>{moment(event.created_at).calendar()}</span>
          </div>
        )}
      </div>
      <div>
        <div className="title">{event.title}</div>

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
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(event.content),
          }}
        ></div>
      </div>
      <div className="icons-container">
        {isLiked ? (
          <FontAwesomeIcon
            icon={faHeart}
            className="liked"
            onClick={(e) => {
              e.stopPropagation();
              handleUnlike();
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
          />
        )}
        <span>{likeCount}</span>
        <FontAwesomeIcon icon={faComment} /> <span>{commentCount}</span>
        <FontAwesomeIcon
          icon={faListUl}
          onClick={(e) => {
            e.stopPropagation();
            handleShowLikes(event.id);
          }}
        />
        {isParticipated ? (
          <FontAwesomeIcon
            icon={faUserPlus}
            className="participated"
            onClick={(e) => {
              e.stopPropagation();
              handleLeave();
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserPlus}
            onClick={(e) => {
              e.stopPropagation();
              handleParticipation();
            }}
          />
        )}
        <FontAwesomeIcon
          icon={faUsers}
          onClick={(e) => {
            e.stopPropagation();
            handleShowParticipants(event.id);
          }}
        />
        <span>{participantCount}</span>
        {authUser.sub === String(event.user.id) && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        )}
      </div>
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onEventDeleted: PropTypes.func.isRequired,
};
