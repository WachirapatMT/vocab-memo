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
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjkwMDQzOTAsImV4cCI6MTYyOTA5MDc5MH0.3Nu8IpuuFIGtwWXDbysoN9Qyaf9A2mO-bkqQA8La5m0
db.user.insert({
  username: "user",
  salt: "$2a$10$BhRPNeULJGfYFFRRZ.wKnO",
  password: "$2a$10$BhRPNeULJGfYFFRRZ.wKnOlh8YBxflWVgpT/bUZB7TPNNN7.7afiG",
});

db.wordset.insertMany([
  {
    title: "TCAS",
    description: "Prepare for TCAS",
    vocabulary: [
      { id: ObjectId(), term: "eye", definition: "ตา" },
      { id: ObjectId(), term: "ear", definition: "หู" },
      { id: ObjectId(), term: "nose", definition: "จมูก" },
      { id: ObjectId(), term: "mouth", definition: "ปาก" },
      { id: ObjectId(), term: "hair", definition: "ผม" },
    ],
    user: "user",
  },
  {
    title: "CUTEP",
    description: "Prepare for CUTEP",
    vocabulary: [
      { id: ObjectId(), term: "insolent", definition: "อวดดี" },
      { id: ObjectId(), term: "abhor", definition: "เกลียด" },
      { id: ObjectId(), term: "imitate", definition: "เลียนแบบ" },
    ],
    user: "user",
  },
  {
    title: "IELTS",
    description: "Prepare for IELTS",
    vocabulary: [
      { id: ObjectId(), term: "inundate", definition: "น้ำท่วม" },
      { id: ObjectId(), term: "mawkish", definition: "จืดชืด" },
      { id: ObjectId(), term: "despot", definition: "ทรราช" },
    ],
    user: "user",
  },
]);
