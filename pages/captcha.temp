import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState, useRef } from 'react';

const CaptchaTest: NextPage = () => {
  const handleClick = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_CAPTCHA_KEY, { action: 'name' })
        .then((token) => {
          // api request with token
        });
    });
  };
  return (
    <>
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_CAPTCHA_KEY}`}
          async
        ></script>
      </Head>

      <button onClick={handleClick}>Token</button>
    </>
  );
};

export default CaptchaTest;
