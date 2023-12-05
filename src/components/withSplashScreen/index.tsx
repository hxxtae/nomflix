import { useState, useEffect, FunctionComponent } from 'react';
import { AnimatePresence } from 'framer-motion';

import { publicUrlStr } from '../../utils';
import * as S from './style';

function SplashMessage() {
  return (
    <S.Section {...S.splashVariant}>
      <S.ImageBox>
        <S.Image src={`${publicUrlStr()}/assets/svg/netflix_logo.svg`} alt="netflix splash logo" />
      </S.ImageBox>
    </S.Section>
  )
}

function withSplashScreen<wrappedProps extends {}>(WrappedComponent: FunctionComponent<wrappedProps>) {
  return (props: wrappedProps) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const apiRequest = async () => {
        try {
          // Put here your await requests / API requests
          setTimeout(() => {
            setIsLoading(false);
          }, 2500);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
      apiRequest();
    }, []);
    
    return (
      <>
        <WrappedComponent {...props} />
        <AnimatePresence>
          {isLoading && <SplashMessage />}
        </AnimatePresence>
      </>
    )
  }
}

export default withSplashScreen;