/**
 * @generated SignedSource<<ecaae41f3ab5a197645f6c01862b9d7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ResourceFragment$data = {
  readonly __typename: "ProjectResource";
  readonly assignedAt: string;
  readonly id: string;
  readonly resource: {
    readonly __typename: string;
  };
  readonly status: string;
  readonly " $fragmentType": "ResourceFragment";
};
export type ResourceFragment$key = {
  readonly " $data"?: ResourceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ResourceFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ResourceFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assignedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "resource",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "ProjectResource",
  "abstractKey": null
};
})();

(node as any).hash = "62532dd7166a07de2de996c743df9f5d";

export default node;
