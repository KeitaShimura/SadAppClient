import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsersApi } from "../../api/user";
import { getParticipantsForEventApi } from "../../api/eventParticipant";
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { Spinner } from "react-bootstrap";
import "./EventParticipants.scss";
import { toast } from "react-toastify";

export default function EventParticipants(props) {
  const [participants, setParticipants] = useState(null);
  const [filteredEventParticipants, setFilteredEventParticipants] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const params = useParams();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // 参加したユーザー一覧を取得
        const participationData = await getParticipantsForEventApi(params.id);
        const participantIds = participationData.map(
          (participant) => participant.user_id,
        );

        // 全ユーザーを取得
        const allUsers = await getAllUsersApi();

        // 参加者の情報をフィルタリング
        const participantsData = allUsers.filter((user) =>
          participantIds.includes(user.id),
        );

        setParticipants(participantsData);
      } catch (error) {
        setParticipants([]);
        // データを取得できなかった場合のエラーメッセージ
        toast.error("参加者一覧を取得できませんでした。");
      }
    };

    fetchParticipants();
  }, [params.id]);

  useEffect(() => {
    // ユーザーの絞り込みなどのロジックを追加する場合には、ここで実装します
    // この例では絞り込みを行わず、すべての参加したユーザーを表示します
    if (searchTerm === "") {
      setFilteredEventParticipants(participants);
    } else {
      const filtered = participants?.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredEventParticipants(filtered);
    }
  }, [searchTerm, participants]);

  return (
    <BasicLayout className="participants" title="参加者">
      <div className="participants__title">
        <h2>参加者一覧</h2>
        <input
          type="text"
          placeholder="ユーザーを検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!filteredEventParticipants ? (
        <div className="participants__loading">
          <Spinner animation="border" variant="info" />
          ロード中...
        </div>
      ) : (
        <ListUsers users={filteredEventParticipants} />
      )}
    </BasicLayout>
  );
}
