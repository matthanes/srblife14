export {
  getSrcKey,
  removeParams,
  getFiles,
  getSinglePost,
  getAllPublished,
  getAllAuthors,
  getAllTags,
} from './directus';
export { slugify } from './slugify';

export const titleCase = (input: string) => { 
  return input
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
 }

 export default titleCase;
