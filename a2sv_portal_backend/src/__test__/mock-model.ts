export abstract class MockModel<T, TC, TW, TWU, TU> {
  protected abstract entityStub: T

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData)
  }

  constructorSpy(_createEntityData: T): void {
  }

  async create(data: TC): Promise<T> {
    return this.entityStub
  }

  async count(where?: TW): Promise<number> {
    return 1
  }

  async findOne(where: TWU): Promise<T> {
    return this.entityStub
  }

  async findAll(params: {
    skip?: number
    take?: number
    where?: TW
    orderBy?: Object
  }): Promise<T[]> {
    return [this.entityStub]
  }

  async update(params: {
    where: TWU
    data: TU
  }): Promise<T> {
    return this.entityStub
  }

  async remove(where: TWU) {
    return this.entityStub
  }
}