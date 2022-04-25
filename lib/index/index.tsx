import { Container, Typography } from '@mui/material';
import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { sanityClient } from '~/lib/components/sanityio';
import s from './styles.module.scss';
import { top100CelebSlugs } from './top100CelebSlugs';

export const Index = (p: any) => {
  return (
    <>
      <Container className="{s.Index}" maxWidth="md">
        <div className="container mx-auto px-4 md:px-0">
          <Typography className="font-primary text-black font-semibold text-xl md:text-2xl py-4" variant="h1" fontWeight={400}>
            Top 100 Celebrities
          </Typography>

          <div className={s.container}>
            <CelebGallery celebGalleryItems={p.top100Celebs} />
          </div>
        </div>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const top100Celebs = (await sanityClient.fetch(
    `*[_type == 'celeb' && slug.current in $slugs]{
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
    }`,
    { slugs: top100CelebSlugs },
  )) as any[];

  top100Celebs.sort((a, b) => {
    return top100CelebSlugs.indexOf(a.slug) - top100CelebSlugs.indexOf(b.slug);
  });

  return {
    props: {
      top100Celebs,
    },
  };
};
