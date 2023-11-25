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

export default function ListEvents(props) {
  const { events: initialEvents, setEvents: setInitialEvents } = props; // プロパティ名を変更
  const authUser = useAuth(); // Assuming useAuth returns the authenticated user
  const [events, setEvents] = useState(initialEvents); // ローカル状態を初期化

  const handleEventDeleted = (eventId) => {
    // イベントが削除された場合、events ステートを更新
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    setInitialEvents(updatedEvents); // 親コンポーネントの状態も更新
  };

  return (
    <div className="list-events">
      {map(events, (event, index) => (
        <Event
          key={index}
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
  const navigate = useNavigate();

  const handleShowLikes = (eventId) => {
    navigate(`/event_likes/${eventId}`);
  };

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
  }, [event.id, authUser.id]);

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
    deleteEventApi(event.id)
      .then(() => {
        onEventDeleted(event.id); // 親コンポーネントの状態を更新
      })
      .catch((error) => console.error("Delete Error:", error));
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
  }, [event.id, authUser.id]);

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

  const iconUrl = event.user?.icon ? event.user.icon : IconNotFound;

  return (
    <div className="event">
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        {event.user && (
          <div className="name">
            {event.user.name}
            <span>{moment(event.created_at).calendar()}</span>
          </div>
        )}
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
      </div>
      <div>
        {isLiked ? (
          <button onClick={handleUnlike}>いいね済み</button>
        ) : (
          <button onClick={handleLike}>いいねする</button>
        )}
        <span>{likeCount} いいね</span>
        <button onClick={() => handleShowLikes(event.id)}>いいね一覧</button>
        {isParticipated ? (
          <button onClick={handleLeave}>参加を辞める</button>
        ) : (
          <button onClick={handleParticipation}>参加する</button>
        )}
        <span>{participantCount} いいね</span>
        <button onClick={() => handleShowParticipants(event.id)}>
          参加者一覧
        </button>
        {authUser.sub === String(event.user.id) && (
          <button onClick={handleDelete}>削除</button>
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
