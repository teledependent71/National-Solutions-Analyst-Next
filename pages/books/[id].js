import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/thq-react-components'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

import booksPageInitialPaths92abfResource from '../../resources/books-page-initial-paths-92abf'
import booksPageInitialPropsE102fResource from '../../resources/books-page-initial-props-e102f'

const Books = (props) => {
  return (
    <>
      <div className="books-container">
        <Head>
          <title>Books - National Solutions Analyst</title>
          <meta
            property="og:title"
            content="Books - National Solutions Analyst"
          />
        </Head>
        <DataProvider
          renderSuccess={(BooksEntity) => (
            <>
              <div className="books-container1">
                <h1>{BooksEntity?.title}</h1>
                <span>{BooksEntity?.price}</span>
                <span>{BooksEntity?.Description}</span>
                <div className="books-container2">
                  <Markdown>{BooksEntity?.Content}</Markdown>
                </div>
              </div>
            </>
          )}
          initialData={props.booksEntity}
          persistDataDuringLoading={true}
          key={props.page}
        />
      </div>
      <style jsx>
        {`
          .books-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .books-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .books-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Books.defaultProps = {
  booksEntity: [],
}

Books.propTypes = {
  booksEntity: PropTypes.array,
}

export default Books

export async function getStaticPaths() {
  const response = await booksPageInitialPaths92abfResource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  const response = await booksPageInitialPropsE102fResource({
    ...context?.params,
  })
  return {
    props: {
      booksEntity: response?.data?.[0],
      ...response?.meta?.pagination,
    },
    revalidate: 60,
  }
}
