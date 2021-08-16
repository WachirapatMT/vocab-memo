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
// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MjkwOTk3NzAsImV4cCI6MTYyOTE4NjE3MH0.NxyyMvu6IARQdrUljpGRJRShnlFigrCcseuZO5LyYfY
db.user.insert({
  username: "user",
  salt: "$2a$10$PQjUCNeBCbmDMSae7OORWO",
  password: "$2a$10$PQjUCNeBCbmDMSae7OORWOeDM72tAL9pRcTNCZupXcJ1WhWY.zhc2",
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
