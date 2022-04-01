INSERT INTO user (username, email, password)
VALUES
  ('froglegs', 'joe@gmail.com', 'kermit');

INSERT INTO post (description, image, location, user_id, created_at, updated_at)
VALUES
  ('This is the description', 'image1', '234.53, 321.32', 1, NOW(), NOW());

INSERT INTO comment (comment_text, user_id, created_at, updated_at)
VALUES
  ('This is a really nice comment', '1', NOW(), NOW());
 

-- INSERT INTO vote (user_id, post_id, flag)
-- VALUES
--   ('1', '1', '0');

