db = db.getSiblingDB("vocabmemo");

db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "vocabmemo",
    },
  ],
});

// password: password
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjgzMjg4ODgsImV4cCI6MTYyODQxNTI4OH0.-VmBTwdjN87zs58WrKuZbAawCqKAstMkQFzZ8AAKuKk
db.user.insert({
  username: "user",
  salt: "$2a$10$BhRPNeULJGfYFFRRZ.wKnO",
  password: "$2a$10$BhRPNeULJGfYFFRRZ.wKnOlh8YBxflWVgpT/bUZB7TPNNN7.7afiG",
});

db.wordset.insertMany([
  {
    title: "TCAS",
    description: "Prepare for TCAS",
    vocaburaly: [
      { id: 1, term: "eye", definition: "ตา" },
      { id: 2, term: "ear", definition: "หู" },
      { id: 3, term: "nose", definition: "จมูก" },
      { id: 3, term: "mouth", definition: "ปาก" },
      { id: 3, term: "hair", definition: "ผม" },
    ],
    user: "user",
  },
  {
    title: "CUTEP",
    description: "Prepare for CUTEP",
    vocaburaly: [
      { id: 1, term: "insolent", definition: "อวดดี" },
      { id: 2, term: "abhor", definition: "เกลียด" },
      { id: 3, term: "imitate", definition: "เลียนแบบ" },
    ],
    user: "user",
  },
  {
    title: "IELTS",
    description: "Prepare for IELTS",
    vocaburaly: [
      { id: 1, term: "inundate", definition: "น้ำท่วม" },
      { id: 2, term: "mawkish", definition: "จืดชืด" },
      { id: 3, term: "despot", definition: "ทรราช" },
    ],
    user: "user",
  },
]);

