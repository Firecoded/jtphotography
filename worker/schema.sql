CREATE TABLE IF NOT EXISTS likes (
    photo_id INTEGER NOT NULL,
    visitor TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (photo_id, visitor)
);
