import "./CollectionNameDialog.css";

import { useState, type FormEvent } from "react";

import Dialog from "../../dialog/Dialog";
import ICollectionNameDialog from "../../../core/interfaces/props/collections/ICollectionNameDialog.props";

const MAX_NAME_LENGTH = 40;

// "Add Collection": asks for the name of the new collection
export default function CollectionNameDialog({ onCreate, onClose }: ICollectionNameDialog) {
  const [name, setName] = useState("");
  const trimmedName = name.trim();

  return (
    <Dialog title="New Collection" onClose={onClose}>
      {(close) => {
        const create = (event: FormEvent) => {
          event.preventDefault();
          if (trimmedName === "") return;

          onCreate(trimmedName);
          close();
        };

        return (
          <form onSubmit={create}>
            <label className="collection-name-label" htmlFor="collection-name">
              Collection name
            </label>
            <input
              id="collection-name"
              className="collection-name-input"
              type="text"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              placeholder="e.g. Shooting Games"
              autoComplete="off"
              data-autofocus
              onChange={(e) => setName(e.target.value)}
            />
            <p className="collection-name-count">
              {name.length} / {MAX_NAME_LENGTH}
            </p>

            <div className="dialog-actions">
              <button type="button" className="dialog-button" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="dialog-button dialog-button--main" disabled={trimmedName === ""}>
                Create
              </button>
            </div>
          </form>
        );
      }}
    </Dialog>
  );
}
