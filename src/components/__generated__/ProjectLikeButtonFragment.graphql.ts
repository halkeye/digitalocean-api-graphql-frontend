/**
 * @generated SignedSource<<860b89a7bc2223a6274a5b1a5081aed1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProjectLikeButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ProjectLikeButtonFragment";
};
export type ProjectLikeButtonFragment$key = {
  readonly " $data"?: ProjectLikeButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProjectLikeButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProjectLikeButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};

(node as any).hash = "96ac4662c371aa9b5f5913e19625db08";

export default node;
