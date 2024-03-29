import { Model, models, Schema, model, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateOne(id: string, data: Partial<T>): Promise<void> {
    await this.model.findByIdAndUpdate(
      { _id: id },
      { ...data } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async deleteOne(id: string): Promise<void> {
    await this.model.findByIdAndDelete({ _id: id });
  }
}
