import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { api } from '../api/api';
import { PostsList } from '../components/post/PostsList';
import { Seo } from '../components/seo/Seo';
import { useTranslation } from '../hooks/useTranslation';
import { DefaultLayout } from '../layouts/DefaultLayout';
import { IPost } from '../models/models';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const [posts, menus, banners, events] = await Promise.all([
    api.getPosts(locale, 0),
    api.getMenus(locale),
    api.getBanners(locale),
    api.getEvents(0),
  ]);

  return {
    props: {
      posts,
      menus,
      banners,
      events,
    },
    revalidate: 60 * 60, // 1h
  };
};

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  menus,
  banners,
  events,
}) => {
  const { t, locale } = useTranslation();
  const [allPosts, setAllPosts] = useState<IPost[]>(posts);
  const [isLoading, setIsLoading] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);
  const pageNumber = useRef(0);

  useEffect(() => {
    pageNumber.current = 0;
    setAllPosts(posts);
    setNoMorePosts(false);
  }, [locale, posts]);

  const handlePostsLoad = async () => {
    setIsLoading(true);

    const newPosts = await api.getPosts(locale, ++pageNumber.current);

    if (!newPosts.length) {
      setNoMorePosts(true);
    } else {
      setAllPosts((x) => [...x, ...newPosts]);
    }

    setIsLoading(false);
  };

  return (
    <DefaultLayout menus={menus} banners={banners} events={events}>
      <Seo />
      <PostsList posts={allPosts} />
      <div className="flex items-center justify-center py-4">
        {!noMorePosts && (
          <button
            onClick={handlePostsLoad}
            disabled={isLoading}
            type="button"
            className="flex w-44 items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm hover:bg-gray-200"
          >
            {isLoading ? <ImSpinner2 className="h-5 w-5 animate-spin" /> : t.moreNews}
          </button>
        )}
      </div>
    </DefaultLayout>
  );
};

export default HomePage;
