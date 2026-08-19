import { NewsPreviewItem } from '@/components/news/news-preview-item'
import type { PostResponse } from '@/lib/models'

interface Props {
  posts: PostResponse[];
}

export async function News({ posts }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => <NewsPreviewItem key={post.id} post={post} />)}
    </div>
  )
}