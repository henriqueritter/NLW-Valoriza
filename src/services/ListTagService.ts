import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"

class ListTagService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tags = await tagsRepository.find();
    /*
    let tags = await tagsRepository.find();
    tags=tags.map((tag)=>({...tag,nameCustome: `#${tag.name}`}))
    */

    return tags;
  }
}

export { ListTagService }