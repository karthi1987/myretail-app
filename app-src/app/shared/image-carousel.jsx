import React from 'react';
import { render } from 'react-dom';

//Slider component 
import Slider from 'react-slick';
import { ProductImage } from './static-component';

//scss
import './shared.scss';


class HeroImageAndItsChildren extends React.Component {

  constructor( props ){
      super( props );
      this.state = { 
        heroImage: null
      }

      this.setHeroImage = this.setHeroImage.bind( this );
  }

  componentWillMount() {
    const { PrimaryImage } = this.props;
    if ( PrimaryImage && PrimaryImage.length > 0 ) {
      this.setState( { heroImage: PrimaryImage[ 0 ].image });
    }
  }

  setHeroImage( image ) {
    if ( image ) {
      const imageWithAlt = image.replace(/^[^_]+/,"");
      const heroImage = image.replace(imageWithAlt, "");
      //To do: update the hero image, since the alternate image and hero image are same
      // wont be able to update the hero image
      //this.setState( { heroImage: heroImage } );
    }
  }

   render() {

        const {
          props: {
            AlternateImages,
            PrimaryImage, 
            imageCount
          },
          state: {
            heroImage
          }
        } = this;

        return(
          <div className="image-wrapper">
            <HeroImageWrapper { ...this.state } />
            {
              AlternateImages
              && AlternateImages.length > 0
              && <HeroImageCarousel
                images={ AlternateImages }
                setHeroImage= { this.setHeroImage }
              />
            }
          </div>
        )
  }

}

/* Hero Image */
const HeroImageWrapper = ( { heroImage } ) => {

  return(
    <div className="hero-image">
      <ProductImage source={ heroImage } />
    </div>
  );
}


/* Image Carousel */
const HeroImageCarousel = ( { images, setHeroImage } ) => {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    autoplay: false,
    speed: 1200
  };

  return(
    <div className="carousel-wrapper">
      <ul>
        <Slider { ...settings } >
           { 
            images.map(
                 ( item, index ) =>
                    <li className="carousel-list" data-index={index} key={index}>
                      <a href="#" className="image-list-info" onClick={ ( event ) => { 
                          event.preventDefault();
                          setHeroImage( item.image )
                        } 
                      } >
                        <ProductImage source={ item.image } width="70" height="70" />
                      </a>
                    </li>
              )
           }
        </Slider>
      </ul>
    </div>
  );
}

export default HeroImageAndItsChildren;
