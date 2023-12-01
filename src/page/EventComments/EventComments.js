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
  }, [event.id, authUser.id]);

  useEffect(() => {
    // コメント数の取得
    const fetchCommentCount = async () => {
      try {
        const comments = await getEventCommentsApi(event.id);
        setCommentCount(comments.length);
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
      // いいね数を更新した際のメッセージ
      toast.success(`イベントのいいね数が更新されました：${likesData.length}`);
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

  const onSubmit = async (e) => {
    e.preventDefault();

    // バリデーションチェック
    if (message.trim().length === 0 || message.trim().length > 500) {
      toast.warning("コメントは1文字以上500文字以下である必要があります。");
      return;
    }

    try {
      // コメントを作成
      const response = await createEventCommentApi(params.id, {
        content: message,
      });

      // コメントが正常に作成された場合の処理
      console.log("Comment created:", response.data);
      toast.success("コメントが投稿されました。");

      // 新しいコメントを既存のリストに追加
      setEventComments(prevComments => [...prevComments, response.data]);

      setMessage(""); // メッセージをクリア
    } catch (error) {
      // エラーハンドリング
      console.error("Error creating event:", error);
      toast.warning(
        "コメントの投稿中にエラーが発生しました。しばらく待ってからもう一度お試しください。",
      );
    }
  };


  const moreData = () => {
    const pageTemp = page + 1;

    setLoadingEventComments(true);
    getEventCommentsApi(params.id)
      .then((response) => {
        if (!response) {
          setLoadingEventComments(false); // Handle the error condition
          // エラーメッセージを表示
          toast.error("コメントデータの取得中にエラーが発生しました。");
        } else {
          setEventComments(response.data);
          setPage(pageTemp);
          setLoadingEventComments(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching event comments:", error);
        setLoadingEventComments(false); // Handle the error condition
        // エラーメッセージを表示
        toast.error("コメントデータの取得中にエラーが発生しました。");
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
