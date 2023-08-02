-- Active: 1690566160860@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT UNIQUE PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(datetime('now', 'localtime'))
);

DROP TABLE users;
SELECT * FROM users;
INSERT INTO users(id, name, email, password,role)
    VALUES
        ('u001','Orci','orci@email','orci1234','adm'),
        ('u002','Ana','ana@email','ana1234','normal'),
        ('u003','Arthur','arthur@email','arthur1234','normal')
        ;

CREATE Table posts(
    id TEXT UNIQUE PRIMARY KEY,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT(datetime('now', 'localtime')),
    updated_at TEXT DEFAULT(datetime('now', 'localtime')),
        FOREIGN KEY (creator_id) REFERENCES users(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);
DROP TABLE posts;
SELECT * FROM posts;
INSERT INTO posts(id, content, creator_id)
    VALUES
        ('p001','conteudo qualquer Orci','u001'),
        ('p002','conteudo qualquer Arthur','u003'),
        ('p003','conteudo qualquer Orci','u001'),
        ('p004','conteudo qualquer Ana','u002');

CREATE TABLE like_dislike (
    user_id TEXT NOT NULL,    
    post_id TEXT NOT NULL,    
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);
DROP TABLE like_dislike;
SELECT * FROM like_dislike;

INSERT INTO like_dislike(user_id, post_id, like)
    VALUES
        ('u001','p001',1),
        ('u002','p001',1), 
        ('u003','p001',1), 
        ('u002','p001',0),
        ('u001','p002',1), 
        ('u002','p002',1),
        ('u003','p002',1),
        ('u001','p003',1),
        ('u002','p003',1),
        ('u003','p003',0);

