import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from 'class-transformer'

class ListTagService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tags = await tagsRepository.find();

    //cria novos objetos a partir do que vem do TypeORM adicionando o objeto name_custom que criamos
    return classToPlain(tags);
  }
}

export { ListTagService }