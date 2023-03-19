import Link from "next/link";
import { client } from '@/libs/client';
import type { Work, Tag } from '@/types/work';
import type { InferGetStaticPropsType, NextPage } from 'next';

// microCMSへAPIリクエスト
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

// blogsとtagsの型
type Props = {
  works: Work[];
  tags: Tag[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  works,
  tags,
}: Props) => {
  console.log(works);
  console.log(tags);
  return(
    <div>
      <h2>Works</h2>
      <ul>
      {tags.map((tag) => (
          <li key={tag.id}>
            {tag.title}
          </li>
          ))}
      </ul>
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link href={`${work.url}`} target="_blank">
              {work.title}
            </Link>
            <ul>
              {work.tags.map((tag) => (
                <li key={tag.id}>
                  #{tag.title}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home;