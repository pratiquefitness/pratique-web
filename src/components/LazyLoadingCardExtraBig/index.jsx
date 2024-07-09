import React from 'react';
import { useInView } from 'react-intersection-observer';

import Skeleton from 'react-loading-skeleton';

export const LazyLoadingCardExtraBig = ({ children, loading, skeletonHeight = 220 }) => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {loading && !inView ? (
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
        )
      }
    </div>
  )
}
