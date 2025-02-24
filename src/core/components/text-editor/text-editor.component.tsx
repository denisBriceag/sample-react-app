import { forwardRef } from "react";
import ReactQuill from "react-quill-new";

import "./text-editor.component.css";
import Value = ReactQuill.Value;

type TextEditorProps = {
  value: Value;
  placeholder?: string;
  handleChange: (value: string) => void;
};

/**
 * @description
 *
 * Quill is automatically sanitizing any values passed into editor
 * Including cases like <script> tags or <img ... onerror="alert('Hacked!')">
 * */
const TextEditor = forwardRef<ReactQuill, TextEditorProps>(
  ({ value, placeholder = "", handleChange }, ref) => {
    return (
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    );
  },
);

export default TextEditor;
