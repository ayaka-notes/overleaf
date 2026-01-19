---
icon: rectangle-vertical-history
---

# Projects Collection

`Project` represents a single LaTeX project in Overleaf. It stores project metadata, ownership and access control, file structure, compilation settings, and collaboration state.

#### Core Identification & Metadata

* `_id`: Unique MongoDB ObjectId identifying the project.
* `name`: Project display name.
* `description`: Optional textual description of the project.
* `active`: Indicates whether the project is currently active.
* `version`: Internal schema or project format version.
* `trashed`: List of items moved to trash (soft-deleted).
* `deletedDocs`: Records of permanently deleted documents.

#### Ownership & Access Control

* `owner_ref`: Reference to the user who owns the project.
* `collaberator_refs`: Users with edit permissions.
* `reviewer_refs`: Users with reviewer-level access.
* `readOnly_refs`: Users with read-only access.
* `pendingEditor_refs` / `pendingReviewer_refs`: Pending invitations.

#### Token-Based Access

* `tokens`: Token registry for shared links.
* `tokenAccessReadOnly_refs`: Tokens granting read-only access.
* `tokenAccessReadAndWrite_refs`: Tokens granting read–write access.

#### Activity Tracking

* `lastUpdated`: Timestamp of the most recent modification.
* `lastUpdatedBy`: User who performed the last update.
* `lastOpened`: Timestamp of the last time the project was opened.
* `deletedByExternalDataSource`: Whether deletion was triggered by an external integration.

#### Project Structure

Root Document & Folder

* `rootDoc_id`: ObjectId of the main LaTeX entry document (usually `main.tex`).
* `rootFolder`: Inlined representation of the project’s file tree.

Each folder entry contains:

* `name` / `_id`: Folder name and identifier.
* `docs`: List of LaTeX source documents with name and `_id`.
* `fileRefs`: Binary file references (images, data files), including:
  * `name`: Filename
  * `created`: Upload timestamp
  * `rev`: Revision counter
  * `hash`: Content hash for deduplication
  * `linkedFileData`: External storage linkage (if any)
* `folders`: Nested subfolders.

#### Compilation & Editor Settings

* `compiler`: Selected LaTeX engine (`pdflatex`, `xelatex`, `lualatex`, etc.).
* `spellCheckLanguage`: Spell checker language for this project.

#### Public & Sharing Settings

* `publicAccesLevel`: Project visibility (`private`, `readOnly`, `public`, etc.).
* `collabratecUsers`: Linked users from external collaboration platforms.

#### Overleaf-Specific Extensions

* `overleaf.history`:
  * `id`: Identifier used by the history service.
  * `display`: Whether history is enabled and visible.

#### Internal Versioning

* `__v`: Mongoose internal version key for concurrency control.

Here is an real example for Overleaf User.

<details>

<summary>Project Example</summary>

```json5
{
    _id: ObjectId('69686c09bcb72ccea226ff33'),
    name: 'overleaf-example',
    lastUpdated: ISODate('2026-01-15T04:25:34.637Z'),
    lastUpdatedBy: ObjectId('696868f6bcb72ccea226fe5f'),
    lastOpened: ISODate('2026-01-15T04:25:22.286Z'),
    active: true,
    owner_ref: ObjectId('696868f6bcb72ccea226fe5f'),
    collaberator_refs: [],
    reviewer_refs: [],
    readOnly_refs: [],
    pendingEditor_refs: [],
    pendingReviewer_refs: [],
    rootDoc_id: ObjectId('69686c09bcb72ccea226ff38'),
    rootFolder: [
        {
            name: 'rootFolder',
            _id: ObjectId('69686c09bcb72ccea226ff32'),
            docs: [
                {
                    name: 'main.tex',
                    _id: ObjectId('69686c09bcb72ccea226ff38')
                },
                {
                    name: 'sample.bib',
                    _id: ObjectId('69686c09bcb72ccea226ff3f')
                }
            ],
            fileRefs: [
                {
                    name: 'frog.jpg',
                    created: ISODate('2026-01-15T04:24:41.963Z'),
                    rev: 0,
                    linkedFileData: null,
                    hash: '5b889ef3cf71c83a4c027c4e4dc3d1a106b27809',
                    _id: ObjectId('69686c09bcb72ccea226ff45')
                }
            ],
            folders: []
        }
    ],
    version: 3,
    publicAccesLevel: 'private',
    compiler: 'pdflatex',
    spellCheckLanguage: 'en',
    deletedByExternalDataSource: false,
    description: '',
    trashed: [],
    deletedDocs: [],
    tokens: {},
    tokenAccessReadOnly_refs: [],
    tokenAccessReadAndWrite_refs: [],
    overleaf: {
        history: {
            id: '69686c09bcb72ccea226ff33',
            display: true
        }
    },
    collabratecUsers: [],
    __v: 0
}
```



</details>
