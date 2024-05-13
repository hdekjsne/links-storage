import fs from 'node:fs/promises';

const creates = `CREATE TABLE links (
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
`;
let linksInserts = `INSERT INTO links (name, link, description) VALUES
`;
let tagsInserts = `INSERT INTO tags (tag, link_id) VALUES
`;

fs.readFile('/Users/naia/Desktop/links/list1.csv', 'utf-8')
  .then((value) => {
    value.split('\n').forEach((line, index, arr) => {
      const name = line.split(';')[0];
      const link = line.split(';')[1];
      const description = line.split(';')[2];
      const tags = line.split(';')[4].split(' ');
      const id = line.split(';')[5];
      linksInserts += `('${name}', '${link}', '${description}')${index === arr.length - 1 ? ';' : ','}\n`;
      tags.forEach((tag) => tagsInserts += `('${tag}', ${id})${index === arr.length - 1 ? ';' : ','}\n`);
      console.log(`line ${id} is processed`);
    });
  }).then(() => {
    fs.writeFile('./server/init.sql', creates + linksInserts + tagsInserts, 'utf-8');
    console.log('all\'s done');
  })
  .catch((err) => {
    console.log(err);
  });
