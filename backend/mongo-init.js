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

db.wordset.insertMany([
  {
    title: "TCAS",
    description: "Prepare for TCAS",
    vocaburaly: [
      { _id: ObjectId(), term: "eye", definition: "ตา" },
      { _id: ObjectId(), term: "ear", definition: "หู" },
      { _id: ObjectId(), term: "nose", definition: "จมูก" },
    ],
  },
  {
    title: "CUTEP",
    description: "Prepare for CUTEP",
    vocaburaly: [
      { _id: ObjectId(), term: "insolent", definition: "อวดดี" },
      { _id: ObjectId(), term: "abhor", definition: "เกลียด" },
      { _id: ObjectId(), term: "imitate", definition: "เลียนแบบ" },
    ],
  },
  {
    title: "IELTS",
    description: "Prepare for IELTS",
    vocaburaly: [
      { _id: ObjectId(), term: "inundate", definition: "น้ำท่วม" },
      { _id: ObjectId(), term: "mawkish", definition: "จืดชืด" },
      { _id: ObjectId(), term: "despot", definition: "ทรราช" },
    ],
  },
]);
