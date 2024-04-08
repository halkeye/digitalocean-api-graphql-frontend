import * as React from "react";
import { graphql } from "relay-runtime";
import { useFragment } from "react-relay";

import type { ProjectLikeButtonFragment$key } from "./__generated__/ProjectLikeButtonFragment.graphql";

type Props = {
  story: ProjectLikeButtonFragment$key;
};

const ProjectLikeButtonFragment = graphql`
  fragment ProjectLikeButtonFragment on Project {
    id
  }
`;

export default function ProjectLikeButton({ story }: Props): React.ReactElement {
  const data = useFragment<ProjectLikeButtonFragment$key>(
    ProjectLikeButtonFragment,
    story
  );
  const onLikeButtonClicked = () => {
    // To be filled in
  };
  return (
    <div className="likeButton">
      <div>{data.id}</div>
    </div>
  );
}
