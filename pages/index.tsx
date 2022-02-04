import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { DefaultLayout } from '../layouts/DefaultLayout';

const Home: NextPage = () => {
  return (
    <>
      <DefaultLayout>
        <p className="text-2xl">Vilniaus Pranciškaus Skorinos gimnazija</p>
        <p className="max-w-prose text-justify">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industrys standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <p className="text-2xl">Гімназія імя Ф. Скарыны г. Вільнюса</p>
        <p className="max-w-prose text-justify">
          Лорем ипсум долор сит амет, иллуд алтера яуодси ин нец, еам еирмод аудиам ет. Цетеро
          вивендум инсоленс ад еос. Доминг мнесарчум инцидеринт ад про, еа ипсум елигенди перципитур
          усу, цибо елитр реформиданс цу цум. Еа атяуи волумус меа, меи ат цетеро апериам. Ид усу
          делицата волуптатум. Про ин алияуам праесент, цу про молестиае хендрерит.
        </p>
      </DefaultLayout>
    </>
  );
};

export default Home;
