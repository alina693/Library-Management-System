-- Run this against your Neon database.
-- Easiest way: open your Neon project -> SQL Editor -> paste this in -> Run.
-- Or via psql:  psql "your_neon_connection_string" -f schema.sql

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  genre VARCHAR(100) DEFAULT 'General',
  isbn VARCHAR(50),
  copies INT NOT NULL DEFAULT 1,
  available INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample starter data (optional)
INSERT INTO books (title, author, genre, isbn, copies, available) VALUES
('The Pragmatic Programmer', 'David Thomas & Andrew Hunt', 'Technology', '978-0135957059', 4, 3),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', '978-0060935467', 2, 0),
('A Brief History of Time', 'Stephen Hawking', 'Science', '978-0553380163', 3, 3),
('Sapiens', 'Yuval Noah Harari', 'History', '978-0062316097', 3, 0);
