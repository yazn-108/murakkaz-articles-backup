# murakkaz Articles Backup

## Purpose

This repository stores a backup of articles from the murakkaz platform. GitHub Actions automatically synchronizes article data from the main platform to this repository.

## Data Structure

The `articles.json` file contains an array of article objects. Each article object has these properties:

- `_id` (string) - unique identifier
- `title` (string) - article title
- `slug` (string) - URL-friendly identifier
- `description` (string) - short summary
- `tag` (string) - category tag
- `banner` (object) - banner image data
  - `url` (string) - image URL
  - `public_id` (string) - Cloudinary public ID
  - `alt` (string) - alternative text
- `blocks` (array) - content blocks
  - `id` (string) - block identifier
  - `title` (string or null) - section title
  - `content` (string) - text content
  - `code` (object or null) - code snippet
    - `content` (string) - code text
    - `language` (string) - programming language
  - `image` (object or null) - image data
- `createdAt` (string) - ISO 8601 timestamp
- `SubscribersNotified` (boolean) - notification status

## Automatic Synchronization

The `.github/workflows/backup-articles.yml` workflow runs on these events:

- `article.created` - new article added
- `article.updated` - existing article modified
- `article.deleted` - article removed

The workflow executes `scripts/backup-events-handler.js` to update `articles.json`. The script:

1. Reads the current `articles.json` file
2. Processes the event payload
3. Updates the article array
4. Sorts articles by creation date (newest first)
5. Writes the updated array to `articles.json`
6. Commits and pushes changes

## Manual Operations

To run the backup handler manually:

1. Set environment variables:
   - `EVENT_TYPE` - one of: `article.created`, `article.updated`, `article.deleted`
   - `PAYLOAD` - JSON string of article data
2. Run: `node scripts/backup-events-handler.js`

## File List

| File | Description |
|------|-------------|
| `articles.json` | Article data storage |
| `scripts/backup-events-handler.js` | Event processing script |
| `.github/workflows/backup-articles.yml` | GitHub Actions workflow |

## Requirements

- Node.js (LTS version)

## License

This repository contains backup data only. The original content belongs to murakkaz.