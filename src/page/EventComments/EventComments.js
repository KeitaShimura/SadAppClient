import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ListEventComments from "../../components/ListEventComments";
import BasicLayout from "../../layout/BasicLayout";
import { deleteEventApi, getEventApi } from "../../api/event";
import { getEventCommentsApi } from "../../api/eventComment";
import { Button, Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
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
import EventCommentModal from "../../components/Modal/EventCommentModal/EventCommentModal";
import {
  faComment,
  faListUl,
  faHeart,
  faTrash,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_HOST } from "../../utils/constant";

function EventComments(props) {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [eventComments, setEventComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingEventComments, setLoadingEventComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isParticipated, setIsParticipated] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const authUser = useAuth();
  const [showEventCommentModal, setShowEventCommentModal] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const pageSize = 100;

  const navigate = useNavigate();

  const handleShowLikes = (eventId) => {
    navigate(`/event_likes/${eventId}`);
  };

  const loadComments = () => {
    if (!loadingEventComments && hasMoreData) {
      setLoadingEventComments(true);
      getEventCommentsApi(params.id, page, pageSize)
        .then((response) => {
          if (response && response.data.length > 0) {
            setEventComments((prevComments) => [
              ...prevComments,
              ...response.data,
            ]);
            setPage((prevPage) => prevPage + 1);
            setHasMoreData(response.data.length === pageSize);
          } else {
            setHasMoreData(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching event comments:", error);
          toast.error("コメントの読み込み中にエラーが発生しました。");
        })
        .finally(() => {
          setLoadingEventComments(false);
        });
    }
  };

  const moreData = () => {
    loadComments();
  };

  useEffect(() => {
    loadComments();
  }, []); // 初回のみコメントをロード

  useEffect(() => {
    setLoadingEventComments(true);
    getEventCommentsApi(params.id)
      .then((response) => {
        setEventComments(response.data);
        setLoadingEventComments(false);
      })
      .catch((error) => {
        console.error("Error fetching event comments:", error);
        setLoadingEventComments(false);
        // エラーメッセージを表示
        toast.error("コメントデータの取得中にエラーが発生しました。");
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
        const likeStatus = await checkIfEventLikedApi(params.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
        toast.error("いいねの状態を取得できませんでした。");
      }
    };

    fetchLikeData();
  }, [event, authUser]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const comments = await getEventCommentsApi(params.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("コメント数の取得中にエラーが発生しました。");
      }
    };

    fetchCommentCount();
  }, [params]);

  const updateLikeCount = async () => {
    try {
      const likesData = await getLikesForEventApi(params.id);
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
        toast.success("イベントのいいねを解除しました！");
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
    const confirmation = window.confirm("イベントを削除しますか？");
    if (confirmation) {
      // User confirmed the delete action
      deleteEventApi(event.id)
        .then(() => {
          navigate("/events");
          toast.success("イベントが削除されました。");
        })
        .catch((error) => {
          // 削除が失敗した場合のエラーハンドリング
          console.error("Delete Error:", error);
          toast.error("イベントの削除中にエラーが発生しました。");
        });
    }
  };

  const handleShowParticipants = (eventId) => {
    navigate(`/event_participants/${eventId}`);
  };

  useEffect(() => {
    const fetchParticipateData = async () => {
      try {
        const participantStatus = await checkIfEventParticipantsApi(params.id);
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
      const likesData = await getParticipantsForEventApi(params.id);
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

  const handleCommentDeleted = (deletedCommentId) => {
    setEventComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    );
  };

  const iconUrl =
    event && event.user && event.user.icon ? event.user.icon : IconNotFound;

  console.log(iconUrl);
  return (
    <BasicLayout className="event">
      <div className="event">
        <div className="header-container">
          <Image className="icon" src={iconUrl} roundedCircle />
          {event && event.user && (
            <div className="name">
              {event.user.name}
              <span>{moment(event.created_at).calendar()}</span>
            </div>
          )}
        </div>
        {event && (
          <div>
            <div className="content">
              <div className="title fw-bold h2">{event.title}</div>

              <div className="event-details">
                <div>
                  {event.image && (
                    <div className="image-container">
                      <Image
                        src={`${API_HOST}${event.image}`}
                        alt="Post Image"
                        className="event-image"
                      />
                    </div>
                  )}
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
                  className="text-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="button-container">
        <Button onClick={() => setShowEventCommentModal(true)}>
          コメントする
        </Button>
      </div>
      <EventCommentModal
        show={showEventCommentModal}
        setShow={setShowEventCommentModal}
      />
      <div className="event__content">
        <ListEventComments
          eventComments={eventComments}
          onCommentDeleted={handleCommentDeleted}
        />
        {hasMoreData && (
          <Button onClick={moreData}>
            {!loadingEventComments ? (
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

export default EventComments;
