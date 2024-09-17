
import Head from 'next/head'
import React from 'react'


interface Props {
  meta: {
    title: string
    description: string
  }
  customMeta?: JSX.Element
  children?: React.ReactNode
  noindex?: boolean
}

const Layout = ({ children, meta, noindex = false }: Props) => {

  return (
    <>
      <Head>
        <meta
          name="robots"
          content={
            noindex ? 'noindex, nofollow' : process.env.NEXT_PUBLIC_URL_INDEX
          }
        />
        <meta charSet="UTF-8" />
        <meta name="google" content="notranslate" />
        <meta name="apple-itunes-app" content="app-id=1611282499" />
        <meta name="snapedit-remove-objects-ai" content="app-id=1611282499" />
        {/* TODO: change meta when in production */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="yandex-verification" content="87d30d17d58bc33f" />
        <meta name="revisit-after" content="1 days" />
        <meta itemProp="name" content={meta?.title} />
        <meta name="author" content="SmartDocs" />
        <meta itemProp="image" content="/preview.webp" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta name="twitter:image:src" content="/preview.webp" />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:site_name" content={meta?.title} />
        <link rel="shortcut icon" href="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
    </Head>
    <div>{children}</div>
    </>
  )
}

export default Layout
