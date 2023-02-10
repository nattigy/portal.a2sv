import { UserRepository } from '../user.repository'
import { UserModel } from './support/user.model'

describe('UserRepository', () => {
  let repository: UserRepository
  let userModel: UserModel

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     UserRepository,
    //     {
    //       provide: getModelToken(User.name),
    //       useValue: UserModel,
    //       useClass: UserModel,
    //     },
    //   ],
    // }).compile()
    //
    // repository = module.get<UserRepository>(UserRepository)
    // userModel = module.get<UserModel>(getModelToken(User.name))
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  // describe('get user', () => {
  //   describe('when called', () => {
  //     it('should get a new user', async () => {
  //       const user = await repository.findById(userStub().id.toString())
  //       expect(user).toEqual(userStub())
  //     })
  //   })
  // })
})
