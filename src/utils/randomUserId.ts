import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";

// utils/randomUserId.ts
// const adjectives = ["Mysterious", "Witty", "Curious", "Silent"];
// const nouns = ["Cat", "Fox", "Owl", "Wolf"];

export function generateRandomUserId(): string {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 2,
  }); // big_red_donkey
  // const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  // const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomName}_${Math.floor(Math.random() * 1000)}`;
}
