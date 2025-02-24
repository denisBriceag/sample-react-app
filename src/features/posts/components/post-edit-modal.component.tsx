import { ReactElement } from "react";
import { Modal } from "antd";
import TextEditor from "../../../core/components/text-editor/text-editor.component.tsx";
import ReactQuill from "react-quill-new";

type EditModalProps = {
  isModalOpen: boolean;
  loading?: boolean;
  handleChange: (value: string) => void;
  handleEditMessage: () => void;
  cancelModal: () => void;
  editorValue: ReactQuill.Value;
};

export default function PostEditModalComponent({
  isModalOpen,
  handleEditMessage,
  handleChange,
  cancelModal,
  loading,
  editorValue,
}: EditModalProps): ReactElement {
  return (
    <Modal
      title="Change your message"
      open={isModalOpen}
      onOk={handleEditMessage}
      okButtonProps={{ loading }}
      onCancel={cancelModal}
    >
      <TextEditor value={editorValue} handleChange={handleChange} />
    </Modal>
  );
}
