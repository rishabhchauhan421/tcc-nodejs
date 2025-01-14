import {
  ClassicTshirtColor,
  ClassicTshirtSize,
  Design,
  DesignOrientation,
  LaptopSleeveSize,
  MousePadSize,
  PaperPosterFinish,
  PaperPosterSize,
  Product,
  ProductCategory,
  ProductColor,
  ProductStatus,
  Theme,
  Variant,
} from '@prisma/client';
import { toTitleCase } from './utils';
import { Product as ProductSchemaDTS } from 'schema-dts';
import keyword_extractor from 'keyword-extractor';

type ProductCategoryAttributes = {
  productcategory?: ProductCategory;
  title: string;
  titlePlural: string;
  slug: string;
  href: string;
  slugSingular: string;
  material: string;
  mrp: number;
  gstRate: number;
  paperPosterSize?: {
    [key: string]: string;
  };
  laptopSleeveSize?: {
    [key: string]: string;
  };
  laptopSleeveColor?: {
    [key: string]: string;
  };
  deskMatSize?: {
    [key: string]: string;
  };
  classicTshirtSize?: {
    [key: string]: string;
  };
  classicTshirtColor?: {
    [key: string]: string;
  };
  classicTshirtFront?: {
    [key: string]: string;
  };
  googleProductCategory: string;
};
export class ProductCategoryUtils {
  static getProductCategoryAttributes(
    productCategory: ProductCategory
  ): ProductCategoryAttributes {
    switch (productCategory) {
      case ProductCategory.METALPOSTER:
        return {
          productcategory: ProductCategory.METALPOSTER,
          title: 'Metal Poster',
          titlePlural: 'Metal Posters',
          slug: 'metal-poster',
          slugSingular: 'metal-poster',
          href: '/metal-poster',
          material: 'Coated Aluminium Sheet',
          googleProductCategory: '500044',
          mrp: 1299,
          gstRate: 18,
        };
      case ProductCategory.PAPERPOSTER:
        return {
          productcategory: ProductCategory.PAPERPOSTER,
          title: 'Poster',
          titlePlural: 'Posters',
          slug: 'posters',
          slugSingular: 'poster',
          href: '/posters',
          material: '200GSM Paper',
          googleProductCategory: '500044',
          paperPosterSize: {
            A1: 'A1',
            A2: 'A2',
            A3: 'A3',
            A4: 'A4',
            A5: 'A5',
          },
          mrp: 599,
          gstRate: 18,
        };
      case ProductCategory.LAPTOPSLEEVE:
        return {
          productcategory: ProductCategory.LAPTOPSLEEVE,
          title: 'Laptop Sleeve',
          titlePlural: 'Laptop Sleeves',
          slug: 'laptop-sleeves',
          slugSingular: 'laptop-sleeve',
          href: '/laptop-sleeve',
          material: 'Neoprene',
          laptopSleeveSize: {
            S12: '12"',
            S13: '13"',
            S14: '14"',
            S15: '15"',
            S16: '16"',
            S17: '17"',
          },
          laptopSleeveColor: {
            BLACK: 'Black',
            BROWN: 'Brown',
            GREY: 'Grey',
            PINK: 'Pink',
          },
          googleProductCategory: '7530',
          mrp: 1999,
          gstRate: 18,
        };
      case ProductCategory.FRAMEDPRINT:
        return {
          productcategory: ProductCategory.FRAMEDPRINT,
          title: 'Framed Print',
          titlePlural: 'Framed Prints',
          slug: 'framed-prints',
          slugSingular: 'framed-print',
          href: '/framed-prints',
          material: 'Plastic Frame',
          googleProductCategory: '500044',
          mrp: 999,
          gstRate: 18,
        };
      case ProductCategory.MOUSEPAD:
        return {
          productcategory: ProductCategory.MOUSEPAD,
          title: 'Mouse Pad',
          titlePlural: 'Mouse Pads',
          slug: 'mouse-pads',
          slugSingular: 'mouse-pad',
          href: '/mouse-pads',
          material: 'Rubber',
          googleProductCategory: '1993',
          mrp: 849,
          gstRate: 18,
        };

      case ProductCategory.CANVASPRINT:
        return {
          productcategory: ProductCategory.CANVASPRINT,
          title: 'Canvas Print',
          titlePlural: 'Canvas Prints',
          slug: 'canvas-prints',
          slugSingular: 'canvas-print',
          href: '/canvas-prints',
          material: 'Canvas',
          googleProductCategory: '19',
          mrp: 1499,
          gstRate: 18,
        };
      case ProductCategory.GALLERYPRINT:
        return {
          productcategory: ProductCategory.GALLERYPRINT,
          title: 'Gallery Print',
          titlePlural: 'Gallery Prints',
          slug: 'gallery-prints',
          slugSingular: 'gallery-print',
          href: '/gallery-prints',
          material: 'Paper',
          googleProductCategory: '500044',
          mrp: 999,
          gstRate: 18,
        };
      case ProductCategory.PHOTOGRAPHICPRINT:
        return {
          productcategory: ProductCategory.PHOTOGRAPHICPRINT,
          title: 'Photographic Print',
          titlePlural: 'Photographic Prints',
          slug: 'photographic-prints',
          slugSingular: 'photographic-print',
          href: '/photographic-prints',
          material: 'Photo Paper',
          googleProductCategory: '500044',
          mrp: 999,
          gstRate: 18,
        };
      case ProductCategory.DESKMAT:
        return {
          productcategory: ProductCategory.DESKMAT,
          title: 'Desk Mat',
          titlePlural: 'Desk Mats',
          slug: 'desk-mats',
          slugSingular: 'desk-mat',
          href: '/desk-mats',
          material: 'Neoprene',
          googleProductCategory: '8078',
          deskMatSize: {
            S28: 'Medium - 23 x 11 inches',
            S42: 'Super Large - 36 x 18 inches',
          },
          mrp: 2499,
          gstRate: 18,
        };
      case ProductCategory.CLASSICTSHIRT:
        return {
          productcategory: ProductCategory.CLASSICTSHIRT,
          title: 'T-Shirt',
          titlePlural: 'T-Shirts',
          slug: 't-shirts',
          slugSingular: 't-shirt',
          href: '/t-shirts',
          material: '100% Cotton',
          googleProductCategory: '212',
          gstRate: 5,
          classicTshirtSize: {
            S32: 'XXXS',
            S34: 'XXS',
            S36: 'S',
            S38: 'M',
            S40: 'L',
            S42: 'XL',
            S44: '2XL',
            S46: '3XL',
            S48: '4XL',
            S50: '5XL',
          },
          classicTshirtColor: {
            HEX_151515: 'Black',
            HEX_19E4FF: 'Sky Blue',
            HEX_2D0101: 'Maroon',
            HEX_2D314A: 'Navy Blue',
            HEX_453E2F: 'Olive Green',
            HEX_A50303: 'Red',
            HEX_C3C3C3: 'Grey Melange',
            HEX_E65E00: 'Orange',
            HEX_FFFFFF: 'White',
          },
          classicTshirtFront: {
            true: 'Front',
            false: 'Back',
          },
          mrp: 1499,
        };

      // case ProductCategory.CLASSICMUG:
      //   return {
      //     productcategory: ProductCategory.CLASSICMUG,
      //     title: 'Mug',
      //     titlePlural: 'Mugs',
      //     slug: 'mugs',
      //     slugSingular: 'mug',
      //     href: '/mugs',
      //     material: 'Ceramic',
      //     googleProductCategory: "",
      //   };

      default:
        return {
          title: '',
          titlePlural: '',
          slug: '',
          slugSingular: '',
          href: '/',
          material: '',
          googleProductCategory: '',
          mrp: 2999,
          gstRate: 18,
        };
    }
  }

  static getMetaDescription({
    productCategory,
    color,
    orientation,
    theme,
  }: {
    productCategory: ProductCategory;
    color: ProductColor;
    orientation: DesignOrientation;
    theme?: Theme;
  }): string {
    switch (productCategory) {
      case ProductCategory.PAPERPOSTER:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.MOUSEPAD:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.LAPTOPSLEEVE:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.METALPOSTER:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.CANVASPRINT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.FRAMEDPRINT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.GALLERYPRINT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.PHOTOGRAPHICPRINT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.DESKMAT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      case ProductCategory.CLASSICTSHIRT:
        return (
          'High-quality ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title +
          's available in various sizes and materials. Choose from a wide range of designs and themes. Perfect for your home, office, or dorm room.'
        );
      default:
        return '';
    }
  }

  // static getTshirtColorToName(color: ClassicTshirtColor): string {
  //   switch(color){
  //     case ClassicTshirtColor.HEX_A50303:
  //       return 'Red';
  //     case ClassicTshirtColor.HEX_19E4FF:
  //       return 'Sky Blue';
  //     case ClassicTshirtColor.HEX_151515:
  //       return 'Black';
  //     case ClassicTshirtColor.HEX_C3C3C3:
  //       return 'Grey Melange';
  //     case ClassicTshirtColor.HEX_2D314A:
  //       return 'Navy Blue';
  //     case ClassicTshirtColor.HEX_FFFFFF:
  //       return 'White';
  //     case ClassicTshirtColor.HEX_453E2F:
  //       return 'Olive Green';
  //     case ClassicTshirtColor.HEX_2D0101:
  //       return 'Maroon';
  //     case ClassicTshirtColor.HEX_E65E00:
  //       return 'Orange';
  //     default:
  //       return '';
  //   }
  // }
  // static getTshirtSizeToName(size: ClassicTshirtSize): string {
  //   switch(size){
  //     case ClassicTshirtSize.S34:
  //       return 'XXS';
  //     case ClassicTshirtSize.S36:
  //       return 'XS';
  //     case ClassicTshirtSize.S38:
  //       return 'S';
  //     case ClassicTshirtSize.S40:
  //       return 'M';
  //     case ClassicTshirtSize.S42:
  //       return 'L';
  //     case ClassicTshirtSize.S44:
  //       return 'XL';
  //     case ClassicTshirtSize.S46:
  //       return '2XL';
  //     case ClassicTshirtSize.S48:
  //       return '3XL';
  //     case ClassicTshirtSize.S50:
  //       return '4XL';
  //     default:
  //       return '';
  //   }
  // }
}

export function createProductTags({
  tags,
  theme,
  productCategory,
}: {
  tags: string[];
  productCategory: ProductCategory;
  theme?: Theme;
}): string[] {
  const mergedTags: string[] = [];
  tags.forEach((tag) => {
    mergedTags.push(
      tag +
        ' ' +
        ProductCategoryUtils.getProductCategoryAttributes(productCategory).title
    );
  });
  return mergedTags;
}

export function createProductTitle({
  title,
  productCategory,
}: {
  title: string;
  productCategory: ProductCategory;
}): string[] {
  return [
    title +
      ' ' +
      ProductCategoryUtils.getProductCategoryAttributes(productCategory).title,
  ];
}

// export function constructMetadata({
//   title = process.env.siteName + ' - the marketplace for metal prints',
//   description = process.env.siteName +
//     'DigitalHippo is an open-source marketplace for high-quality metal prints.',
//   image = '/thumbnail.png',
//   icons = '/favicon.ico',
//   noIndex = false,
// }: {
//   title?: string;
//   description?: string;
//   image?: string;
//   icons?: string;
//   noIndex?: boolean;
// } = {}): Metadata {
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [
//         {
//           url: image,
//         },
//       ],
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: [image],
//       creator: process.env.creator,
//     },
//     icons,
//     metadataBase: new URL('https://localhost:3000'),
//     ...(noIndex && {
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//   };
// }

//For creating searmTerms for search functionality
export function createSearchTerms(input: string[]): string[] {
  const terms = new Set<string>();
  input.forEach((term) => {
    // Split the term into words and add them to the set
    const words = term.split(' ');
    words.forEach((word) => {
      terms.add(word.toLowerCase());
      for (let i = 0; i < word.length; i++) {
        terms.add(word.slice(0, i).toLowerCase());
      }
    });

    // Add the term itself and its substrings to the set
    terms.add(term.toLowerCase());
    for (let i = 0; i < term.length; i++) {
      terms.add(term.slice(0, i).toLowerCase().trim());
    }
  });
  //remove empty string
  terms.delete('');
  return Array.from(terms);
}

export class ProductUtils {
  static getProductTitle({
    productCategory,
    title,
  }: {
    productCategory: ProductCategory;
    title: string;
  }): string {
    const updatedTitle =
      title +
      ' ' +
      ProductCategoryUtils.getProductCategoryAttributes(productCategory).title;
    return toTitleCase(updatedTitle);
  }
  static getProductTitleForVariant({
    product,
    variant,
  }: {
    product: Product;
    variant: Variant;
  }): string {
    const titleWithProductCategory =
      product.title +
      ' ' +
      ProductCategoryUtils.getProductCategoryAttributes(product.productCategory)
        .title;
    switch (product.productCategory) {
      case ProductCategory.PAPERPOSTER:
        let variantSizeTitle = '';
        let variantFinishTitle = '';
        if (variant.paperPosterSize === PaperPosterSize.A1)
          variantSizeTitle = 'A1';
        else if (variant.paperPosterSize === PaperPosterSize.A2)
          variantSizeTitle = 'A2';
        else if (variant.paperPosterSize === PaperPosterSize.A3)
          variantSizeTitle = 'A3';
        else if (variant.paperPosterSize === PaperPosterSize.A4)
          variantSizeTitle = 'A4';

        if (variant.paperPosterFinish === PaperPosterFinish.MATTE)
          variantFinishTitle = 'Matte';
        else if (variant.paperPosterFinish === PaperPosterFinish.GLOSS)
          variantFinishTitle = 'Gloss';

        return (
          titleWithProductCategory +
          ` | ${variantSizeTitle} Size | ${variantFinishTitle} Finish`
        );
      case ProductCategory.MOUSEPAD:
        return (
          titleWithProductCategory +
          ' with Anti-Slip Rubber Base & Smooth Mouse Control for gaming, laptop, daily usage (9 inch x 7.5 inch)'
        );
      case ProductCategory.LAPTOPSLEEVE:
        let variantSizeTitleLaptopSleeve = '';
        if (variant.laptopSleeveSize === LaptopSleeveSize.S12)
          variantSizeTitleLaptopSleeve = '12 inch';
        else if (variant.laptopSleeveSize === LaptopSleeveSize.S13)
          variantSizeTitleLaptopSleeve = '13 inch';
        else if (variant.laptopSleeveSize === LaptopSleeveSize.S14)
          variantSizeTitleLaptopSleeve = '14 inch';
        else if (variant.laptopSleeveSize === LaptopSleeveSize.S15)
          variantSizeTitleLaptopSleeve = '15 inch';
        else if (variant.laptopSleeveSize === LaptopSleeveSize.S16)
          variantSizeTitleLaptopSleeve = '16 inch';
        else if (variant.laptopSleeveSize === LaptopSleeveSize.S17)
          variantSizeTitleLaptopSleeve = '17 inch';
        return (
          titleWithProductCategory +
          ` | compatible with ${variantSizeTitleLaptopSleeve} laptops/notepads`
        );
      case ProductCategory.DESKMAT:
        return (
          titleWithProductCategory +
          ` with Anti-Slip Rubber Base & Smooth Mouse Control for gaming, laptop, daily usage (${
            ProductCategoryUtils.getProductCategoryAttributes(
              product.productCategory
            ).deskMatSize![variant.deskMatSize as MousePadSize]
          })`
        );
      case ProductCategory.CLASSICTSHIRT:
        const size = ProductCategoryUtils.getProductCategoryAttributes(
          product.productCategory
        ).classicTshirtSize![variant.classicTshirtSize as ClassicTshirtSize];
        const color = ProductCategoryUtils.getProductCategoryAttributes(
          product.productCategory
        ).classicTshirtColor![variant.classicTshirtColor as ClassicTshirtColor];
        const front = variant.classicTshirtFront ? 'Front' : 'Back';
        return (
          titleWithProductCategory +
          ' | 100% Cotton | Round Neck | Half Sleeve | Regular Fit (' +
          size +
          '/' +
          color +
          '/' +
          front +
          ')'
        );

      default:
        return titleWithProductCategory;
    }
  }

  static getProductUrl(product: Product): string {
    return `/${
      createProductSlug({
        title: product.title,
        productCategory: product.productCategory,
        length: 40,
      }) +
      '/dp/' +
      product.productId
    }`;
  }

  static getProductUrlWithDomain(product: Product): string {
    return process.env.NEXT_PUBLIC_domain + this.getProductUrl(product);
  }

  static getVariantUrl({
    product,
    variant,
  }: {
    product: Product;
    variant: Variant;
  }) {
    switch (product.productCategory) {
      case ProductCategory.CLASSICTSHIRT:
        const variantAttrSlug = variant.classicTshirtColor?.substring(4);
        return `${this.getProductUrl(product)}+"."+variantAttrSlug}`;
      default:
        return this.getProductUrl(product);
    }
  }

  // static getVariantImages({product, variant}:{product: Product, variant: Variant}):{
  //   thumbnailUrl:string;
  //   imageUrls:string[];
  // }{
  //   switch(product.productCategory){
  //     default:
  //       return {
  //         thumbnailUrl: product.imageUrl,
  //         imageUrl: product.
  //       };
  //   }
  // }

  static getProductDescription({
    productCategory,
    description,
  }: {
    productCategory: ProductCategory;
    description: string;
  }): string {
    // Remove leading and trailing spaces
    description = description.trim();
    // Remove any HTML tags
    description = description.replace(/<[^>]*>/g, '');
    // Replace '&' with ' and '
    description = description.replace(/&/g, ' and ');
    // Replace more than one space with a single space
    description = description.replace(/\s+/g, ' ');

    // Truncate description if it exceeds the specified length
    if (description.length > 500) {
      description = description.substring(0, 497) + '...';
    }

    return description.trim();
  }

  static getProductTags({
    tags,
    productCategory,
  }: {
    tags: string[];
    productCategory: ProductCategory;
  }): string[] {
    const mergedTags: string[] = [];
    tags.forEach((tag) => {
      mergedTags.push(
        tag +
          ' ' +
          ProductCategoryUtils.getProductCategoryAttributes(productCategory)
            .title
      );
    });
    return mergedTags;
  }

  static getProductStatusText(status: ProductStatus): string {
    switch (status) {
      case ProductStatus.ACTIVATED:
        return 'activated';
      case ProductStatus.DEACTIVATED:
        return 'deactivated';
      case ProductStatus.NOTAPPROVED:
        return 'not approved';
      case ProductStatus.UNDERREVIEW:
        return 'under review';
      default:
        return '';
    }
  }

  static getRandomTshirtColor(): ClassicTshirtColor {
    const colors = Object.values(ClassicTshirtColor);
    return (
      colors[Math.floor(Math.random() * colors.length)] ??
      ClassicTshirtColor.HEX_151515
    );
    //  return ClassicTshirtColor.HEX_151515;
  }

  static getProductSchema(product: Product): ProductSchemaDTS {
    return {
      '@type': 'Product',
      name: ProductUtils.getProductTitle(product),
      image: product.imageUrl,
      description: product.description,
      sku: product.productId,
      releaseDate: product.createdAt.toDateString(),
      brand: {
        '@type': 'Brand',
        name: process.env.siteName,
      },
      countryOfOrigin: process.env.seoBaseCountry,
      isFamilyFriendly: true,
      keywords: createProductTags({
        productCategory: product.productCategory,
        tags: product.tags,
      }),
      url:
        process.env.NEXT_PUBLIC_BASE_URL + ProductUtils.getProductUrl(product),
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url:
          process.env.NEXT_PUBLIC_BASE_URL +
          ProductUtils.getProductUrl(product),
      },
    };
  }
}

export function createProductSlug({
  title,
  productCategory,
  length,
}: {
  title: string;
  productCategory: ProductCategory;
  length: number;
}): string {
  // Remove leading and trailing spaces
  title = title.trim();
  let important_words = keyword_extractor.extract(title, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });
  let slug = important_words.join('-').toLowerCase().trim();

  // Convert title to lowercase and replace spaces with hyphens
  slug = slug.toLowerCase().replace(/\s+/g, '-');

  // Remove special characters
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // Replace more than one hyphen with a single hyphen
  slug = slug.replace(/-+/g, '-');

  // Truncate slug if it exceeds the specified length
  if (slug.length > length) {
    slug = slug.substring(0, length);
  }

  // Remove any trailing hyphens
  slug = slug.replace(/-+$/, '');

  const productCategorySlug =
    '-' +
    ProductCategoryUtils.getProductCategoryAttributes(productCategory)
      .slugSingular;

  slug =
    slug.length + productCategorySlug.length > length
      ? slug.substring(0, length - productCategorySlug.length)
      : slug;
  // Add product category to the slug
  slug += productCategorySlug;

  // Remove any trailing hyphens
  slug = slug.replace(/-+$/, '');

  // Remove any leading hyphens
  slug = slug.replace(/^-+/, '');

  // Replace more than one hyphen with a single hyphen
  slug = slug.replace(/-+/g, '-');

  return slug;
}
