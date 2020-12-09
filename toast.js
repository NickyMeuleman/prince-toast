import * as PostSource from './data/fetch-mdx-post-files.js'
import engagements from './data/engagements.js'

export const sourceData = async ({ setDataForSlug }) => {
  let postsData = await PostSource.sourceData({ setDataForSlug })

  // Let's pull out stream posts for now
  const streamPosts = postsData.filter(post => !!post.youtubeId)

  postsData = postsData.filter(post => !!!post.youtubeId)

  postsData.sort((b, a) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    if (da < db) return -1
    if (da === db) return 0
    if (da > db) return 1
  })

  streamPosts.sort((b, a) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    if (da < db) return -1
    if (da === db) return 0
    if (da > db) return 1
  })

  const NUMBER_OF_POSTS = 5
  const firstPosts = postsData.slice(0, NUMBER_OF_POSTS + 1)

  await setDataForSlug("/", { data: { posts: firstPosts, engagements } })
  await setDataForSlug("/garden", { data: { posts: postsData } })
  await setDataForSlug("/streaming", { data: { streams: streamPosts } })
}