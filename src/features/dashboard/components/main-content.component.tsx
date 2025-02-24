import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import { Divider } from "antd";

import PostList from "../../posts/components/post-list.component.tsx";
import PostNew from "../../posts/components/post-new.component.tsx";

export default function MainContent(): ReactElement {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-1 w-full">
        <PostNew />
      </div>

      <Divider orientation="left">{t("main.whatOthersAreSaying")}</Divider>

      <PostList />
    </section>
  );
}
