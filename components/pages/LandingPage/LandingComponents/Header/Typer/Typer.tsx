/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
import React from 'react';
import styles from './Typer.module.css';

let indexWord = 1;
let timeOut: NodeJS.Timeout;

function Typer() {
  const words = [
    'lets you be productive',
    'is a query builder on steroids',
    'performs and lasts',
    'developers love',
    'is not as good as Django',
    'is production ready',
    'lets you make friends with SQL',
    'Dax should definitely try',
    'is not as good as Laravel',
    'is not VC backed yet',
    'is familiar, but different',
    'is JavaScript ORM too',
    'will be here for a while',
  ];

  const [canAnimate, setCanAnimate] = React.useState(false);
  const [reverse, setRevers] = React.useState(true);

  const [state, setState] = React.useState({
    index: 0,
    sentence: words[0],
  });

  let { index, sentence } = state;

  const reduceText = () => {
    const sentenceLength = sentence.length;

    timeOut = setTimeout(() => {
      setState({
        ...state,
        sentence: sentence.slice(0, -1),
        index: 0,
      });
    }, 32);

    if (sentenceLength === 0) {
      clearTimeout(timeOut);
      setRevers(false);
      increaseText();
    }
  };

  const increaseText = () => {
    const sentenceLength = sentence.length;
    const wordLength = words[indexWord].length;

    if (sentenceLength < wordLength) {
      timeOut = setTimeout(() => {
        setState({
          ...state,
          sentence: sentence + words[indexWord][index],
          index: ++index,
        });
      }, 32);
    } else {
      clearTimeout(timeOut);

      setRevers(true);

      if (indexWord === words.length - 1) {
        indexWord = 0;
      } else {
        ++indexWord;
      }

      setTimeout(reduceText, 3000);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      reduceText();
      setCanAnimate(true);
    }, 3000);
  }, []);

  React.useEffect(() => {
    if (canAnimate) {
      if (reverse) {
        reduceText();
      } else {
        increaseText();
      }
    }
  }, [sentence]);

  return (
    <div className={styles.contentTitle}>
      <span className={styles.underline}>{sentence}</span>
      {' '}
      <div className={styles.cursor}>&#8203;</div>
    </div>
  );
}

export default Typer;
