import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** 每页文章数：首页与分页页共用，避免魔法数字重复 */
export const PAGE_SIZE = 5;

export interface ArchivePageData {
  data: Post[];
  total: number;
  currentPage: number;
  lastPage: number;
  size: number;
  url: { current: string; prev?: string; next?: string };
}

/** 根据全量文章与当前页码，构造统一的 ArchivePage 分页对象（首页页码=1） */
export function buildArchivePage(all: Post[], currentPage: number): ArchivePageData {
  const lastPage = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  return {
    data: all.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    total: all.length,
    currentPage,
    lastPage,
    size: PAGE_SIZE,
    url: {
      current: currentPage === 1 ? '/' : `/${currentPage}`,
      prev: currentPage > 1 ? (currentPage === 2 ? '/' : `/${currentPage - 1}`) : undefined,
      next: currentPage < lastPage ? `/${currentPage + 1}` : undefined,
    },
  };
}

/** 读取已发布文章（排除草稿），按发布时间倒序 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 统计每个标签的文章数量，按数量倒序返回 */
export function getTagCounts(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export interface YearGroup {
  year: number;
  months: { month: number; posts: Post[] }[];
}

/** 按年/月对文章分组（posts 已倒序，分组顺序天然保持倒序） */
export function groupPostsByDate(posts: Post[]): YearGroup[] {
  const groups: YearGroup[] = [];
  for (const post of posts) {
    const d = post.data.pubDate;
    const year = d.getFullYear();
    const month = d.getMonth();
    let yGroup = groups.find((g) => g.year === year);
    if (!yGroup) {
      yGroup = { year, months: [] };
      groups.push(yGroup);
    }
    let mGroup = yGroup.months.find((m) => m.month === month);
    if (!mGroup) {
      mGroup = { month, posts: [] };
      yGroup.months.push(mGroup);
    }
    mGroup.posts.push(post);
  }
  return groups;
}

export interface PostWithAdjacent {
  post: Post;
  prev: Post | null;
  next: Post | null;
}

/** 为每篇文章计算上一篇/下一篇（基于倒序列表），避免详情页重复拉取全量数据 */
export function getPostsWithAdjacent(posts: Post[]): PostWithAdjacent[] {
  return posts.map((post, index) => ({
    post,
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  }));
}
