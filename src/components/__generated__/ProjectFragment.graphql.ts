/**
 * @generated SignedSource<<2fcd3547bc6914182efabbb524250112>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProjectFragment$data = {
  readonly description: string | null | undefined;
  readonly name: string;
  readonly owner: {
    readonly uuid: any;
  };
  readonly " $fragmentType": "ProjectFragment";
};
export type ProjectFragment$key = {
  readonly " $data"?: ProjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Team",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "uuid",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Project",
  "abstractKey": null
};

(node as any).hash = "13dce10d094c8d03c6326e3806ff2b1d";

export default node;
