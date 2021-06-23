import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories'

class CreateTagService {
  async execute(name: string) {
    if (!name) {
      throw new Error('Incorrect name')
    }

    const tagsRepository = getCustomRepository(TagsRepositories);

    //verifica se existe tag com o mesmo nome
    const tagAlreadyExists = await tagsRepository.findOne({ name })
    if (tagAlreadyExists) {
      throw new Error('Tag already exists')
    }

    //cria nova tag
    const tag = tagsRepository.create({
      name
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService }