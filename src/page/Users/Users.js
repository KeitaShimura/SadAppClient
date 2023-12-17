import React, { useEffect, useState } from "react";
import BasicLayout from "../../layout/BasicLayout";
import "./Users.scss";
import { getAllUsersApi } from "../../api/user";
import ListUsers from "../../components/ListUsers";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const pageSize = 100;
  const [hasMoreData, setHasMoreData] = useState(true);

  const loadPosts = () => {
    if (!loadingUsers) {
      setLoadingUsers(true);
      getAllUsersApi(page, pageSize)
        .then((response) => {
          if (response && response.length > 0) {
            setUsers((prevUsers) => [...prevUsers, ...response]);
            setPage((prevPage) => prevPage + 1);
            setHasMoreData(response.length === pageSize);
          } else {
            setHasMoreData(false);
          }
          setLoadingUsers(false);
        })
        .catch(() => {
          setLoadingUsers(false);
          setHasMoreData(false);
          toast.error("ユーザーの読み込み中にエラーが発生しました。");
        });
    }
  };

  const moreData = () => {
    loadPosts();
  };

  // 初期表示時に投稿データを読み込む
  useEffect(() => {
    loadPosts();
  }, []); // 依存配列を空に設定

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadPosts();
    };

    window.addEventListener("scroll", handleScroll);

    // クリーンアップ関数
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingUsers]);

  // 検索用のフィルタリング
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  return (
    <BasicLayout className="users" showBackButton={false}>
      <div className="users__header">
        <input
          type="text"
          className="form-control"
          placeholder="ユーザーを探す"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="users__content">
        {filteredUsers && filteredUsers.length > 0 ? (
          <ListUsers users={filteredUsers} setUsers={setFilteredUsers} />
        ) : (
          <p className="text-center mt-2 fw-bold">投稿は存在しません</p>
        )}
        {hasMoreData && (
          <Button onClick={moreData}>
            {!loadingUsers ? (
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
