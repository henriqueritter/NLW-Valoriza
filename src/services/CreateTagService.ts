import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories'

interface IRequestTag {
  name: string
}

class CreateTagService {
  async execute({ name }: IRequestTag) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tag = tagsRepository.create({
      name
    });

    await tagsRepository.save(tag)
  }
}

export { CreateTagService }