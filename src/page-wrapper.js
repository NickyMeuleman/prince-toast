/** @jsx h */
import { h, Fragment } from 'preact';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/preact';
import getShareImage from '@jlengstorf/get-share-image';
import Callout from './components/Callout.js' // Remember local files requires extensions

const components = {
  Callout,
  wrapper: (props) => {
    const figureItOut = getShareImage.default || getShareImage
    const socialImage = figureItOut({
      title: props.title,
      titleExtraConfig: '_bold',
      tagline: '',
      cloudName: 'maxcell',
      imagePublicID: 'prince_social_template',
      titleFont: 'roboto',
      textColor: '222426',
      textAreaWidth: 616,
      textLeftOffset: 624,
    })

    return (
      <Fragment>
        <Helmet>
          <meta name="image" content={socialImage} />
        </Helmet>
        <article className="prose max-w-none">
          {props.title ? <h2>{props.title}</h2> : null}
          {props.children}
        </article>
      </Fragment>
    )
  },
  pre: props => (
    <div style={{ 'boxShadow': '0 10px 24px rgba(0,0,0,.25)' }}>
      <div dangerouslySetInnerHTML={{ __html: props.children.props.children }} />
    </div>
  ),
  codeblock: props => (
    <pre
      style={{ 'boxShadow': '0 10px 24px rgba(0,0,0,.25)' }}
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  ),
}


function NavLink(props) {
  return (
    <a {...props} className={`mr-6 text-lg focus:underline hover:underline ${props.className}`} />
  )
}

// Interesting that you can't use <></>
// Transpiling related:
// Note that most modern transpilers allow you to use a shorter syntax for Fragments.
// https://preactjs.com/guide/v10/components#fragments
export default function PageWrapper(props) {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/style.css" />
        <style>
          {`
            pre pre::-webkit-scrollbar {
              box-shadow: transparent;
            }
          `
          }
        </style>
        <meta name="image" content="https://res.cloudinary.com/maxcell/image/upload/v1579584116/main_social.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={props.title} />
      </Helmet>
      <div
        className="container mx-auto px-4 max-w-3xl"

      >
        <nav className="mt-4 mb-4 flex justify-between">
          <NavLink href="/" className="text-purple-600 font-bold">Prince</NavLink>
          <ul className="flex">
            <li><NavLink href="#">About</NavLink></li>
            <li><NavLink href="/garden">Blog</NavLink></li>
          </ul>
        </nav>
        {/* Does MDXProvider only render on MDX Pages */}
        <MDXProvider components={components}>
          <main {...props} />
        </MDXProvider>
      </div>
    </Fragment>
  )
}