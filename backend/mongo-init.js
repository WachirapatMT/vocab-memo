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
      { id: 1, term: "eye", definition: "ตา" },
      { id: 2, term: "ear", definition: "หู" },
      { id: 3, term: "nose", definition: "จมูก" },
    ],
  },
  {
    title: "CUTEP",
    description: "Prepare for CUTEP",
    vocaburaly: [
      { id: 1, term: "insolent", definition: "อวดดี" },
      { id: 2, term: "abhor", definition: "เกลียด" },
      { id: 3, term: "imitate", definition: "เลียนแบบ" },
    ],
  },
  {
    title: "IELTS",
    description: "Prepare for IELTS",
    vocaburaly: [
      { id: 1, term: "inundate", definition: "น้ำท่วม" },
      { id: 2, term: "mawkish", definition: "จืดชืด" },
      { id: 3, term: "despot", definition: "ทรราช" },
    ],
  },
]);
