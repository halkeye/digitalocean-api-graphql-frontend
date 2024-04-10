/**
 * @generated SignedSource<<a5cfdbc20f5dcd1dd7dc56c0e9e76576>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProjectFragment$data = {
  readonly createdAt: any | null | undefined;
  readonly description: string | null | undefined;
  readonly environment: string;
  readonly isDefault: boolean;
  readonly name: string;
  readonly owner: {
    readonly uuid: any;
  };
  readonly purpose: string;
  readonly updatedAt: any | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ResourcesListFragment">;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "purpose",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "environment",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefault",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ResourcesListFragment"
    }
  ],
  "type": "Project",
  "abstractKey": null
};

(node as any).hash = "f8c0537061489edeab8e059db113daa2";

export default node;
