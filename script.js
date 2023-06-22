async function EtsyReviewSlider(shopId, apiKey, limit = 10, offset = 0) {
    const container = document.createElement('div');
    const slider = document.createElement('div');
    slider.classList.add('slider');
    container.appendChild(slider);
  
    const loader = document.createElement('div');
    loader.classList.add('loader');
    container.appendChild(loader);
  
    const slickCSS = document.createElement('link');
    slickCSS.rel = 'stylesheet';
    slickCSS.type = 'text/css';
    slickCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css';
  
    const slickThemeCSS = document.createElement('link');
    slickThemeCSS.rel = 'stylesheet';
    slickThemeCSS.type = 'text/css';
    slickThemeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css';
  
    const slickJS = document.createElement('script');
    slickJS.type = 'text/javascript';
    slickJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js';
  
    document.head.appendChild(slickCSS);
    document.head.appendChild(slickThemeCSS);
    document.head.appendChild(slickJS);
  
    try {
      const response = await fetch(`https://openapi.etsy.com/v3/application/shops/${shopId}/reviews?limit=${limit}&offset=${offset}`, {
        headers: {
          'x-api-key': apiKey
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch reviews: ${response.status} ${response.statusText}`);
      }
  
      loader.remove();
  
      const data = await response.json();
      const reviews = data.results;
  
      for (const review of reviews) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const message = document.createElement('p');
        message.textContent = review.message;
        const rating = document.createElement('p');
        rating.textContent = `Rating: ${review.rating}`;
        const author = document.createElement('p');
        author.textContent = `By: ${review.user_name}`;
        slide.appendChild(message);
        slide.appendChild(rating);
        slide.appendChild(author);
        slider.appendChild(slide);
      }
  
      new Slick(slider, {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      });
  
      return container;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }