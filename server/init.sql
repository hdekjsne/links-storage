-- links table
-- tags table

CREATE TABLE links (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(255),
  link varchar(255),
  description text,
  added boolean,
  tags text
);

CREATE TABLE tags (
  id PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag varchar(100),
  link_id bigint REFERENCES links (id)
);

INSERT INTO links (name, link, description) VALUES
('CanIUse', 'https://caniuse.com', 'своевременно обновляющиеся таблицы совместимости веб-технологий с браузерами'),
('Lodash', 'https://lodash.com', 'современная js-библиотека'),
('MDN', 'https://developer.mozilla.org/ru/', 'документация к веб-технологиям');

-- primary keys start from 1

INSERT INTO tags (tag, link_id) VALUES
('compatibility', 1),
('web', 1),
('js', 2),
('lib', 2),
('studybook', 3),
('docs', 3),
('web', 3),
('html', 3),
('css', 3),
('js', 3),
('css', 4),
('html', 5),
('hint', 5),
('docs', 6),
('web', 6),
('html', 6),
('css', 6),
('js', 6);
