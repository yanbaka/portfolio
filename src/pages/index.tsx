import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import { client } from '@/libs/client';
import type { Work, Tag } from '@/types/work';
import type { InferGetStaticPropsType, NextPage } from 'next';

import styles from '@/styles/Home.module.scss';

export const getStaticProps = async () => {
  const work = await client.get({ endpoint: 'work' });
  const tag = await client.get({ endpoint: 'tag' });

  return {
    props: {
      works: work.contents,
      tags: tag.contents,
    },
  };
};

type Props = {
  works: Work[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  works,
  tags,
}: Props) => {

  console.log(works);
  return(
    <>
      <Head>
        <title>ポートフォリオ</title>
      </Head>
      <main className={styles.main}>
        <h1>Portfolio</h1>
        <h2>Works</h2>
        <div className={styles.tags}>
          <ul>
          {tags.map((tag) => (
              <li key={tag.id}>
                <a>{tag.title}</a>
              </li>
              ))}
          </ul>
        </div>
        <div className={styles.cards}>
          <ul className={styles.cards}>
            {works.map((work) => (
              <li key={work.id} className={styles.card}>
                <div className={styles.card__inner}>
                  <Image src={work.thumbnail && work.thumbnail.url} alt="" fill className={styles.card__image}></Image>
                  <div className={styles.card__info}>
                    <p className={styles.card__title}>{work.title}</p>
                    <Link href={`${work.url}`} target="_blank"  className={styles.card__url}>
                      {work.url}
                    </Link>
                    <ul className={styles.card__tags}>
                      {work.tags.map((tag) => (
                        <li key={tag.id}>
                          #{tag.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}

export default Home;