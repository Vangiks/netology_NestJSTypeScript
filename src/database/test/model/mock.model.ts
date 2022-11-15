export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {}

  async findById(id: string): Promise<T> {
    return this.entityStub;
  }

  find(): { exec: () => T[] } {
    return {
      exec: (): T[] => [this.entityStub],
    };
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findByIdAndUpdate(id: string, update: any): Promise<T> {
    return { ...this.entityStub, ...update };
  }

  async deleteOne({ _id }): Promise<boolean> {
    return true;
  }
}
