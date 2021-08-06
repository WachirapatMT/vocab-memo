db = db.getSiblingDB("vocabmemo");

// db.createUser({
//   user: "test-user",
//   pwd: "test-password",
//   roles: [
//     {
//       role: "root",
//       db: "test-database",
//     },
//   ],
// });

db.wordset.insertMany([
  {
    title: "TCAS",
    description: "Prepare for TCAS",
    vocaburaly: [
      { term: "eye", definition: "ตา" },
      { term: "ear", definition: "หู" },
      { term: "nose", definition: "จมูก" },
    ],
  },
  {
    title: "CUTEP",
    description: "Prepare for CUTEP",
    vocaburaly: [
      { term: "insolent", definition: "อวดดี" },
      { term: "abhor", definition: "เกลียด" },
      { term: "imitate", definition: "เลียนแบบ" },
    ],
  },
  {
    title: "IELTS",
    description: "Prepare for IELTS",
    vocaburaly: [
      { term: "inundate", definition: "น้ำท่วม" },
      { term: "mawkish", definition: "จืดชืด" },
      { term: "despot", definition: "ทรราช" },
    ],
  },
]);
