import { useEffect, useState } from "react";
import Head from 'next/head'
import Link from "next/link";
import Image from 'next/image'
import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from '@/libs/client';
import type { Work, Tag } from '@/types/work';
import { Edit, Settings } from 'react-feather';
import { shuffle } from "lodash";

import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

import styles from '@/styles/Home.module.scss';

export const getStaticProps = async () => {
  const work = await client.get({ endpoint: 'work', queries: { limit: 100 } });
  const tag = await client.get({ endpoint: 'tag', queries: { limit: 100 } });

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

  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [tagsState, setTagsState] = useState(tags);
  const [showWorks, setShowWorks] = useState(works);

  const filterTag = (tag: Tag) => {
    tag.selected = !tag.selected;
    if (tag.selected) {
      setSelectTags([...selectTags, tag.title]);
    } else {
      setSelectTags(
        selectTags.filter((value, index) => (value !== tag.title))
      );
    }
  }

  const thumbnail = (work: Work) => {
    return work.thumbnail ? work.thumbnail.url : `https://placehold.jp/32/003060/e0e0e0/300x200.png?text=noImage`;
  }

  useEffect(() => {
    if (selectTags.length <= 0) {
      // 選択されたタグが0件の場合、すべてのWorksを表示
      setShowWorks(shuffle(works));
    } else {
      let resultList: Work[] = [];
      works.slice(0).forEach((element, key) => {
        const filterList = element.tags.filter((value) => selectTags.includes(value.title))
        if (filterList.length === selectTags.length) {
          resultList.push(element);
        }
      });
      setShowWorks(resultList);
    }
  }, [selectTags])

  return(
    <>
      <Head>
        <title>ポートフォリオ</title>
        <meta property="robots" content="noindex" />
        <meta property="referrer" content="no-referrer" />
      </Head>
      <main className={styles.main}>
        <h1>Portfolio</h1>
        <h2 className={styles.headline}><Settings />Skill</h2>
        <div className={styles.skill}>
          <ul>
            <li>フロントエンド： HTML、CSS、JavaScript</li>
            <li>フレームワーク、ライブラリ： jQuery、TypeScript、React（Next.js）、Vue（Nuxt.js）</li>
            <li>CMS構築： WordPress、microCMS</li>
            <li>アプリ開発： ReactNative（Expo）</li>
            <li>インフラ構築： VPS、AWS</li>
            <li>開発環境構築： Webpack、Gulp</li>
          </ul>
        </div>
        <h2 className={styles.headline}><Edit />Works</h2>
        <div className={styles.tags}>
          <ul>
          {tagsState.map((tag: Tag) => (
              <li key={tag.id} className={ tag.selected ? '-select' : '' }>
                <a onClick={() => {
                  filterTag(tag);
                }}>{tag.title}</a>
              </li>
              ))}
          </ul>
        </div>
        <div className={styles.cards}>
          <ul className={styles.cards}>
            {showWorks.map((work) => (
              <li key={work.id} className={styles.card}>
                {/* {work.tooltip && <Tooltip id={work.id + "-tooltip"} /> } */}
                <div className={styles.card__inner} data-tooltip-id={work.id + "-tooltip"} data-tooltip-content={work.tooltip}>
                  <Image
                    src={thumbnail(work)}
                    alt={work.title}
                    fill
                    className={styles.card__image}
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