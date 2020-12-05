/** @jsx h */
import { h, Fragment } from 'preact';
import SocialMedia from '../components/SocialMedia.js';

const Index = (props) => {
  return (
    <Fragment>
      <div>
        <h2 className="mb-6 font-bold text-gray-900 text-3xl">Welcome to my side of the Internet!</h2>
        <p className="text-lg">I am a full-stack web developer based in NYC. I love building things and making sure to bring people together around accessibility and security. Beyond the work I do, I love corgis.</p>
        {/* <SocialMedia /> */}
      </div>

      <h3 className="mt-6 mb-4 text-2xl font-bold">Articles</h3>
      <ol className="list-none list-inside">
        {props.posts.map((post) => (
          <li className="mt-5 mb-5 first:mt-0 last:mb-0">
            <a className="underline text-lg font-bold text-gray-900" href={post.slug}>
              {post.title}
            </a>
          </li>
        ))}
      </ol>

      <h3 className="mt-6 mb-4 text-2xl font-bold">Speaking Engagements</h3>
      <ol className="list-none list-inside">
        {props.engagements.map((engagement) => (
          <li className="mt-5 mb-5 first:mt-0 last:mb-0">
            <a className="underline text-lg font-bold text-gray-900" href={engagement.url}>
              {engagement.title} ({engagement.type})
            </a>
          </li>
        ))}
      </ol>
    </Fragment>
  )
}

export default Index;