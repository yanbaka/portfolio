import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from '@/libs/client';
import type { Work, Tag } from '@/types/work';
import { Edit, Settings } from 'react-feather';

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
        <h2 className={styles.headline}><Settings />Skill</h2>
        <div className={styles.skill}>
          <ul>
            <li>フロントエンド： HTML、CSS、JavaScript</li>
            <li>フレームワーク、ライブラリ： jQuery、React（Next.js）、Vue（Nuxt.js）</li>
            <li>CMS構築： WordPress、microCMS</li>
            <li>アプリ開発： ReactNative（Expo）</li>
            <li>インフラ構築： VPS、AWS</li>
            <li>開発環境構築： Webpack、Gulp</li>
          </ul>
        </div>
        <h2 className={styles.headline}><Edit />Works</h2>
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
                  <Image
                    src={work.thumbnail && work.thumbnail.url}
                    alt=""
                    fill
                    className={styles.card__image}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.jp/32/003060/e0e0e0/300x200.png?text=noImage`
                    }}
                  ></Image>
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