import * as React from 'react';
import { useState } from 'react';
import styles from './SpfxReactHooksWp.module.scss';
import { ISpfxReactHooksWpProps } from './ISpfxReactHooksWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

const SpfxReactHooksWp: React.FC<ISpfxReactHooksWpProps> = (props) => {
  const {
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName
  } = props;

  const [counter, setCounter] = useState<number>(1)

  const onButtonClick = (test:number): void => {
    console.log(test);
    setCounter(counter + 1);
  }

  return (
    <section className={`${styles.spfxReactHooksWp} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>Counter: <strong>{counter}</strong></div>
        <button className={styles['increment-counter']} onClick={ () => onButtonClick(1) }>+</button>
      </div>
    </section>
  );
}

export default SpfxReactHooksWp;
