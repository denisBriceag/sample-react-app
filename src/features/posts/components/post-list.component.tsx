import { ReactElement, useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/contexts/auth.context.ts";
import { axiosInstance } from "../../../core/axios/axios-instance.ts";
import Post from "./post.component.tsx";
import { MessagesResponse } from "../types/message.type.ts";
import { Button, Empty, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { PostSkeleton } from "./post-skeleton.component.tsx";
import { ReloadOutlined } from "@ant-design/icons";

export default function PostList(): ReactElement {
  const [messageState, setMessageState] = useState<
    MessagesResponse & { loading: boolean }
  >({
    messages: [],
    page: 1,
    pageSize: 10,
    total: 0,
    loading: false,
  });

  const { t } = useTranslation();
  const { sub } = useAuth();

  const fetchPosts = useCallback(async () => {
    try {
      setMessageState((prev) => ({ ...prev, loading: true, error: false }));

      const { data } = await axiosInstance.get<MessagesResponse>(
        `/messages/all/${sub}/${messageState.page}/${messageState.pageSize}`,
      );

      setMessageState((prev) => ({
        ...prev,
        messages:
          messageState.page > 1
            ? [...prev.messages, ...data.messages]
            : data.messages,
        pageSize: data.pageSize,
        total: data.total,
        loading: false,
        error: false,
      }));
    } catch {
      setMessageState((prev) => ({ ...prev, loading: false, error: true }));
    }
  }, [messageState.page, messageState.pageSize, sub]);

  function handlePageChange(page: number) {
    setMessageState((prev) => ({
      ...prev,
      page,
    }));
  }

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      {messageState.loading &&
        [1, 2, 3, 4].map((el) => <PostSkeleton key={el} />)}

      {!messageState.loading &&
        !!messageState.messages.length &&
        messageState.messages.map((message, index, array) => {
          if (index + 1 === array.length) {
            return (
              <Post
                key={message.id}
                id={message.id}
                message={message.message}
                userId={message.userId}
                postedOn={message.postedOn}
                userName={message.userName}
                likeCount={message.likeCount}
                likedByUser={message.likedByUser}
              />
            );
          }
          return (
            <Post
              key={message.id}
              id={message.id}
              message={message.message}
              userId={message.userId}
              postedOn={message.postedOn}
              userName={message.userName}
              likeCount={message.likeCount}
              likedByUser={message.likedByUser}
            />
          );
        })}

      {!messageState.loading && !messageState.messages.length && (
        <Empty
          description={<Typography.Text>{t("main.noFeed")}</Typography.Text>}
        />
      )}

      {!!messageState.messages.length && (
        <div className="flex justify-center items-center mt-4">
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            disabled={messageState.total === messageState.messages.length}
            loading={messageState.loading}
            onClick={() => handlePageChange(messageState.page + 1)}
          >
            {t("posts.loadMore")}
          </Button>
        </div>
      )}
    </>
  );
}
