import { Card, Skeleton } from "antd";
import { ReactElement } from "react";

export function PostSkeleton(): ReactElement {
  return (
    <Card style={{ minWidth: 300, position: "relative" }}>
      <Card.Meta
        avatar={<Skeleton active avatar />}
        title={<Skeleton active title />}
      />
    </Card>
  );
}
