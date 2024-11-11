import React from 'react';
import { InView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';
import { useInView } from 'react-intersection-observer';

export const LazyLoadingThreeColumns = ({ children, loading, skeletonHeight = 170 }) => {

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {loading && !inView ? (
        <div>
          <Skeleton 
            baseColor='#aaa'
            highlightColor='#7c7979'
            direction='ltr'
            height={270}
            width={'41%'}
            borderRadius={20}
            inline={true}
            />
          <Skeleton 
            baseColor='#aaa'
            highlightColor='#7c7979'
            direction='ltr'
            height={270}
            width={'41%'}
            borderRadius={20}
            inline={true}
            style={{marginLeft: '3%'}}
            />
          <Skeleton 
            baseColor='#aaa'
            highlightColor='#7c7979'
            direction='ltr'
            height={270}
            width={'12%'}
            inline={true}
            style={{marginLeft: '3%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}
            />
        </div>
      ) : (
        children
      )}
    </div>
  )
};
