import { ProblemDifficultyTypeEnum } from "@prisma/client"

const problemData = [
  {
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: ProblemDifficultyTypeEnum.EASY,
    platform: 'LEETCODE',
    // tags: [
    //   {
    //     name: 'ARRAY',
    //   },
    // ],
  },
  {
    title: 'Reverse Integer',
    link: 'https://leetcode.com/problems/reverse-integer/',
    difficulty: ProblemDifficultyTypeEnum.MEDIUM,
    platform: 'LEETCODE',
    // tags: [
    //   {
    //     name: 'ARRAY',
    //   },
    // ],
  },
  {
    title: 'Valid Soduku',
    link: 'https://leetcode.com/problems/valid-sudoku/',
    difficulty: ProblemDifficultyTypeEnum.HARD,
    platform: 'LEETCODE',
    // tags: [
    //   {
    //     name: 'RECURSION',
    //   },
    // ],
  },
]
export default problemData