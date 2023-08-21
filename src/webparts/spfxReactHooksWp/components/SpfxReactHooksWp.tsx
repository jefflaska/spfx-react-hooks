import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './SpfxReactHooksWp.module.scss';
import { ISpfxReactHooksWpProps } from './ISpfxReactHooksWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const SpfxReactHooksWp: React.FC<ISpfxReactHooksWpProps> = (props) => {
  const {
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    currentSiteUrl,
    spHttpClient
  } = props;

  const [counter, setCounter] = useState<number>(1);
  const [evenOdd, setEvenOdd] = useState<string>('');
  const [siteLists, setSiteLists] = useState<string[]>([]);

  //init
  useEffect(() => {
    (async () => {
      const endpoint: string = `${currentSiteUrl}/_api/web/lists?$select=Title&$filter=Hidden eq false&$orderby=Title&$top=10`;
      const rawResponse: SPHttpClientResponse = await spHttpClient.get(endpoint, SPHttpClient.configurations.v1);
      setSiteLists(
        (await rawResponse.json()).value.map((list: { Title: string }) => {
          return list.Title;
        })
      );
    })();
  }, []);

  const onButtonClick = (test:number): void => {
    console.log(test);
    setCounter(counter + 1);
  }

useEffect(() => {
  setEvenOdd((counter % 2 === 0 ? 'even' : 'odd'));
}, [counter])

  return (
    <section className={`${styles.spfxReactHooksWp} ${hasTeamsContext ? styles.teams : ''}`}>
      <div className={styles.welcome}>
        <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
        <h2>Well done, {escape(userDisplayName)}!</h2>
        <div>{environmentMessage}</div>
        <div>Counter: <strong>{counter}</strong> is <strong>{evenOdd}</strong></div>
        <button className={styles['increment-counter']} onClick={ () => onButtonClick(1) }>+</button>
        <ul>
          {
            siteLists.map((list: string) => (
              <li>{list}</li>
            ))
          }
        </ul>
      </div>
    </section>
  );
}

export default SpfxReactHooksWp;
