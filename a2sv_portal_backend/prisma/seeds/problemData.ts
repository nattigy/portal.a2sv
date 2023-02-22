import { ProblemDifficultyTypeEnum } from '@prisma/client'

const problemData = [
  {
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: ProblemDifficultyTypeEnum.EASY,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'ARRAY',
      },
    ],
  },
  {
    title: 'Reverse Integer',
    link: 'https://leetcode.com/problems/reverse-integer/',
    difficulty: ProblemDifficultyTypeEnum.MEDIUM,
    platform: 'GeeksForGeeks',
    tags: [
      {
        name: 'ARRAY',
      },
    ],
  },
  {
    title: 'Valid Soduku',
    link: 'https://leetcode.com/problems/valid-sudoku/',
    difficulty: ProblemDifficultyTypeEnum.HARD,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'RECURSION',
      },
    ],
  },
  {
    title: 'Adding elements',
    link: 'https://leetcode.com/problems/adding-elements/',
    difficulty: ProblemDifficultyTypeEnum.EASY,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'Number',
      },
    ],
  },
  {
    title: 'Guess a number',
    link: 'https://leetcode.com/problems/guess-number/',
    difficulty: ProblemDifficultyTypeEnum.MEDIUM,
    platform: 'LEETCODE',
    tags: [
      {
        name: 'BFS',
      },
    ],
  },
  {
    title: 'Sort values',
    link: 'https://leetcode.com/problems/sort-values/',
    difficulty: ProblemDifficultyTypeEnum.HARD,
    platform: 'GeeksForGeeks',
    tags: [
      {
        name: 'Sorting',
      },
    ],
  }
]
export default problemData