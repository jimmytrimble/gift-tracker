import React from 'react';
import {useState} from 'react';

const Wishlist = () => {
  const [link, setLink] = useState('');

  const getLink = (gift_title) => {
    setLink(`amazon.com/s?k=${gift_title}`)
  }

  return (
    <>
    </>
  )
}