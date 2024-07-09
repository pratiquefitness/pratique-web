import React from 'react';
import { useInView } from 'react-intersection-observer';

import Skeleton from 'react-loading-skeleton';

export const LazyLoadingTwoColumns = ({ children, loading, skeletonHeight = 170 }) => {


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
          height={170}
          width={'70%'}
          borderRadius={20}
          inline={true}
          />
        <Skeleton 
          baseColor='#aaa'
          highlightColor='#7c7979'
          direction='ltr'
          height={170}
          width={'27%'}
          inline={true}
          style={{marginLeft: '3%', borderTopLeftRadius: 20, borderBottomLeftRadius: 20}}
        />
      </div>
      ) : (
        children
      )}
  </div>
 )
}