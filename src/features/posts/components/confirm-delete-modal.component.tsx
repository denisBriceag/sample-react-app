import { ReactElement } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export type ConfirmDeleteModalProps = {
  isOpened: boolean;
  loading: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
};

export default function ConfirmDeletePostModal({
  isOpened,
  loading,
  handleConfirm,
  handleCancel,
}: ConfirmDeleteModalProps): ReactElement {
  const { t } = useTranslation();

  return (
    <Modal
      open={isOpened}
      onOk={handleConfirm}
      onCancel={handleCancel}
      okButtonProps={{ loading }}
    >
      <p>{t("posts.deleteModal.message")}</p>
    </Modal>
  );
}
