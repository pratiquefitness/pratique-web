import React from 'react';
import { InView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';

export const LazyLoadingCardBig = ({ children, loading, skeletonHeight = 170 }) => (
  <InView triggerOnce threshold={0.1}>
    {({ inView, ref }) => (
      <div ref={ref}>
        {loading && !inView? (
          <Skeleton 
            baseColor='#aaa'
            highlightColor='#7c7979'
            height={skeletonHeight}
            width={'100%'}
            borderRadius={20}
            inline={false}
          />
        ) : (
          children
        )}
      </div>
    )}
  </InView>
);
