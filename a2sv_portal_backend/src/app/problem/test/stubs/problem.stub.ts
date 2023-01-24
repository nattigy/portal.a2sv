import { ProblemDifficultyTypeEnum } from "@prisma/client"

export const problemStub = () => ({
    id: "id",
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: ProblemDifficultyTypeEnum.EASY,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'ARRAY',
      },
    ],
  })

export const updateProblemStub = () => ({
    problemId: "id",
    title: '3Sum',
    link: 'https://leetcode.com/problems/3sum/',
    difficulty: ProblemDifficultyTypeEnum.MEDIUM,
    platform: 'GeeksForGeeks',
    tags: [
      {
        name: 'Hash Map',
      },
    ],
})

export const createProblemStub =() => ({
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: ProblemDifficultyTypeEnum.EASY,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'ARRAY',
      },
    ],
})