import { memo, useCallback, useState } from "react";
import TextEditor from "../../../core/components/text-editor/text-editor.component.tsx";
import ButtonComponent from "../../../core/components/button.component.tsx";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../core/axios/axios-instance.ts";
import { useAuth } from "../../auth/contexts/auth.context.ts";

const PostNew = memo(() => {
  const [editorState, setEditorState] = useState<{
    editorValue: string;
    loading: boolean;
  }>({
    editorValue: "",
    loading: false,
  });
  const { t } = useTranslation();
  const { sub } = useAuth();

  function postMessage(): void {
    setEditorState((prev) => ({ ...prev, loading: true }));

    axiosInstance
      .post("/messages", {
        userId: sub,
        message: editorState.editorValue,
      })
      .then(() => setEditorState({ editorValue: "", loading: false }))
      .catch(() => setEditorState({ editorValue: "", loading: false }));
  }

  const handleEditorChange = useCallback((value: string) => {
    setEditorState((prev) => ({ ...prev, editorValue: value }));
  }, []);

  return (
    <>
      <TextEditor
        handleChange={handleEditorChange}
        value={editorState.editorValue}
        placeholder={t("textEditor.placeholder")}
      />

      <div className="flex justify-end">
        <ButtonComponent
          loading={editorState.loading}
          label={t("main.tweetButton")}
          variant="solid"
          disabled={
            !editorState.editorValue.trim() ||
            editorState.editorValue === "<p><br></p>"
          }
          handleClick={postMessage}
        />
      </div>
    </>
  );
});

export default PostNew;
