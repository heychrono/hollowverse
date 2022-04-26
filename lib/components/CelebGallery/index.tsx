import React from 'react';
import Image from 'next/image';
import { sanityImage } from '~/lib/components/sanityio';
import { TCelebGalleryItem } from '~/lib/components/types';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();

  return (
    <div className="container mx-auto w-full h-auto items-center justify-center">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-center justify-center w-full">
        {p.celebGalleryItems.map((celebData) => {
          const picture = celebData.picture || context.placeholderImage;

          return (
            <a
              className="celeb-card overflow-hidden rounded-xl w-full"
              href={`/${celebData.slug}`}
              key={celebData.slug}
            >
              <span className="relative block w-full h-auto">
                <Image
                  objectFit="cover"
                  objectPosition="center"
                  blurDataURL={picture.metadata.lqip}
                  placeholder="blur"
                  src={sanityImage(picture).url()}
                  alt={celebData.name}
                  layout="responsive"
                  width={200}
                  height={225}
                  className="rounded-lg w-full h-auto block"
                />

                <p className="font-primary absolute bottom-3 left-3 font-semibold text-white z-10 text-sm">
                  {celebData.name}
                </p>

                {/* overlay */}
                <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black block" />
              </span>
              
            </a>
          );
        })}
      </div>
    </div>
  );
};
