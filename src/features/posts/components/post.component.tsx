import {
  lazy,
  memo,
  ReactNode,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Avatar, Card, ConfigProvider, Spin } from "antd";
import {
  DeleteFilled,
  EditOutlined,
  LikeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../auth/contexts/auth.context.ts";
import { axiosInstance } from "../../../core/axios/axios-instance.ts";
import moment from "moment";
import clsx from "clsx";
import { useTheme } from "../../../core/providers/theme/theme.context.ts";

type PostProps = {
  id: string;
  message: string;
  userId: number;
  postedOn: Date;
  userName: string;
  likeCount: number;
  likedByUser: boolean;
  deleteHandler: (id: string) => void;
};

const PostEditModalComponent = lazy(
  () => import("./post-edit-modal.component.tsx"),
);
const ConfirmDeleteModal = lazy(
  () => import("./confirm-delete-modal.component.tsx"),
);

const Post = memo(
  ({
    id,
    message,
    userId,
    postedOn,
    userName,
    likedByUser,
    likeCount,
    deleteHandler,
  }: PostProps) => {
    const [likeState, setLikeState] = useState<{
      likes: number;
      liked: boolean;
    }>({
      likes: likeCount,
      liked: likedByUser,
    });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editorValue, setEditorValue] = useState(message);

    const { darkMode } = useTheme();
    const { sub } = useAuth();

    const handleLikes = useCallback(postLike, [id, likeState, sub]);

    const actions = useMemo(() => {
      const actions: ReactNode[] = [
        <span onClick={handleLikes} key="like-action">
          <LikeFilled
            disabled={loading}
            key="like"
            className="ease-in hover:scale-110"
            style={{
              fontSize: "1.25rem",
              marginRight: 6,
              color: likeState.liked ? "red" : "gray",
            }}
          />
          {!!likeState.likes && <span>{likeState.likes}</span>}
        </span>,
      ];

      if (sub === userId)
        actions.unshift(
          <DeleteFilled
            key="delete"
            style={{ fontSize: "1.25rem" }}
            className="ease-in hover:scale-110"
            onClick={() => setDeleteModalOpen(true)}
          />,
          <EditOutlined
            key="edit"
            style={{ fontSize: "1.25rem" }}
            className="ease-in hover:scale-110"
            onClick={() => setIsModalOpen(true)}
          />,
        );

      return actions;
    }, [handleLikes, likeState, sub, userId]);

    function postLike(): void {
      setLoading(true);

      axiosInstance
        .get(`/messages/${likeState.liked ? "unlike" : "like"}/${id}/${sub}`)
        .then(() => {
          const liked: boolean = likeState.liked;

          setLikeState((prev) => ({
            liked: !liked,
            likes: liked ? prev.likes - 1 : prev.likes + 1,
          }));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    function handleEditMessage(): void {
      setLoading(true);

      axiosInstance
        .patch(`/messages/${id}`, {
          message: editorValue,
        })
        .then(
          () => (
            setIsModalOpen(false),
            setLoading(false),
            setEditorValue(editorValue)
          ),
        )
        .catch(() => setLoading(false));
    }

    function handleDeleteMessage(): void {
      setLoading(true);

      axiosInstance
        .delete(`/messages/${id}`)
        .then(
          () => (
            deleteHandler(id), setDeleteModalOpen(false), setLoading(false)
          ),
        )
        .catch(() => (setDeleteModalOpen(false), setLoading(false)));
    }

    function cancelDeleteModal(): void {
      setDeleteModalOpen(false);
    }

    function cancelModal(): void {
      setIsModalOpen(false);
    }

    function handleEditorChange(value: string): void {
      setEditorValue(value);
    }

    return (
      <div>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                contentLineHeight: 6,
                contentLineHeightLG: 6,
                contentLineHeightSM: 6,
              },
            },
          }}
        >
          <Card
            style={{ minWidth: 300, position: "relative" }}
            actions={actions}
          >
            <Card.Meta
              avatar={<Avatar>{userName[0]?.toUpperCase()}</Avatar>}
              title={userName}
              description={
                <>
                  <p
                    className={clsx(
                      darkMode ? "text-[#c0b8b8]" : "text-zinc-800",
                      "bg-none",
                    )}
                    dangerouslySetInnerHTML={{
                      __html: editorValue as unknown as TrustedHTML,
                    }}
                  ></p>
                </>
              }
            />
            <p className="absolute top-4 right-4">
              {moment(postedOn).format("LLL")}
            </p>
          </Card>

          <Suspense
            fallback={
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            }
          >
            {isModalOpen && (
              <PostEditModalComponent
                handleChange={handleEditorChange}
                isModalOpen={isModalOpen}
                handleEditMessage={handleEditMessage}
                cancelModal={cancelModal}
                loading={loading}
                editorValue={editorValue}
              />
            )}
          </Suspense>

          <Suspense
            fallback={
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              />
            }
          >
            {isDeleteModalOpen && (
              <ConfirmDeleteModal
                isOpened={isDeleteModalOpen}
                handleConfirm={handleDeleteMessage}
                handleCancel={cancelDeleteModal}
                loading={loading}
              />
            )}
          </Suspense>
        </ConfigProvider>
      </div>
    );
  },
);

export default Post;
