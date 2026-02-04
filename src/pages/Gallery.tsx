import React from "react";
import GallerySection from "../components/GallerySection";
import SectionHeading from "../components/SectionHeading";
<<<<<<< styles
import MovingTape from "../components/Tape";
=======
import "../Gallery.css"
>>>>>>> main

const Gallery: React.FC = () => {
  return (
<<<<<<< styles
    <div className="min-h-screen w-full bg-[#4FB1CD] flex flex-col">
      <MovingTape />

      <div className="flex-none pt-20 pb-10">
        <SectionHeading
          text1="OUR"
          text2="GALLERY"
          text2Color="text-[#F53489]"
        />
      </div>

      <div className="flex-1 w-full relative mt-4 mb-20">
        <GallerySection />
      </div>
=======
    <div style={{ backgroundColor: "#4FB1CD", minHeight: "100vh" }}>
      <SectionHeading text1="OUR" text2="GALLERY" />
      <CustomerReviewGrid />
      <ReviewCarousel />
>>>>>>> main
    </div>
  );
};

const CustomerReviewGrid = () => {
  // Source data extracted from the HTML
  const reviewData = [
    { id: 0, src: "//beyondthesugar.com/cdn/shop/files/c.jpg?v=1762412334&width=200" },
    { id: 1, src: "//beyondthesugar.com/cdn/shop/files/a.jpg?v=1762412428&width=200" },
    { id: 2, src: "//beyondthesugar.com/cdn/shop/files/610Lv3mGiAL._SL1600.jpg?v=1762412637&width=200" },
    { id: 3, src: "//beyondthesugar.com/cdn/shop/files/Image_Editor.png?v=1757519461&width=200" },
    { id: 4, src: "//beyondthesugar.com/cdn/shop/files/71xHnnKN0aL._SY88.jpg?v=1762412818&width=200" },
    { id: 5, src: "//beyondthesugar.com/cdn/shop/files/Group_21.png?v=1762478704&width=200" },
    { id: 6, src: "//beyondthesugar.com/cdn/shop/files/bts-monogram-empty-bg.png?v=1757520112&width=200" },
    { id: 7, src: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.29.29_2e5e0861.jpg?v=1762413079&width=200" },
    { id: 8, src: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.21_924e1e76.jpg?v=1762413159&width=200" },
    { id: 9, src: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.21_b9f8deb5.jpg?v=1762413253&width=200" },
    { id: 10, src: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.22_3c2541c3.jpg?v=1762413307&width=200" },
    { id: 11, src: "//beyondthesugar.com/cdn/shop/files/2_48902a11-0aa3-448c-b8ea-a8cc091e6027.png?v=1763637956&width=200" },
    { id: 12, src: "//beyondthesugar.com/cdn/shop/files/2_ee65c17b-938c-4513-ac57-8dc20026dcec.png?v=1763882334&width=200" },
    { id: 13, src: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.51.53_eb1aa494.jpg?v=1762413772&width=200" },
  ];

  // In your original HTML, the list repeated roughly 3.5 times. 
  // We create a master list to mimic that specific layout density.
  const fullGridList = [
    ...reviewData,
    ...reviewData,
    ...reviewData,
    ...reviewData.slice(0, 5) // The partial set at the end
  ];

  return (
    <div id="shopify-section-template--21594160201763__review_slider_grid_YM8fNg" className="shopify-section">
      {/* Note: In a real React app (like Next.js or Create React App), 
        these link tags should ideally go in a <Head> component or your global CSS file, 
        not inside the body component.
      */}
      <link href="//beyondthesugar.com/cdn/shop/t/8/assets/component-slider.css?v=4474" rel="stylesheet" type="text/css" media="all" />
      <link href="//beyondthesugar.com/cdn/shop/t/8/assets/component-card.css?v=4474" rel="stylesheet" type="text/css" media="all" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet" />

      <div className="customer-review-grid-section">
        <div className="review-grid-container">
          
          <div className="customer-photos-grid-full" id="customerPhotosGridFull">
            {fullGridList.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="customer-photo-item" 
                data-review-index={item.id}
              >
                <img 
                  src={item.src} 
                  alt="Customer" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

import React from 'react';

const ReviewCarousel = () => {
  const reviews = [
    {
      id: 1,
      name: "Chinmay",
      title: "Great Sugar Alternative",
      image: "//beyondthesugar.com/cdn/shop/files/c.jpg?v=1762412334&width=400",
      text: "This bts sweetener is a good alternative to cut down on refined sugar. I was using trunativ earlier, found a great replacement without erythritol. Its naturally sweet without the bitter aftertaste often found in other sugar substitutes. Its made from monk fruit extract… it’s a low-calorie and diabetic-friendly option, making it suitable for people managing their sugar intake."
    },
    {
      id: 2,
      name: "Arham Chajjer",
      title: "Amazing product!",
      image: "//beyondthesugar.com/cdn/shop/files/a.jpg?v=1762412428&width=400",
      text: "exceeds expectations. have been on the lookout for a good replacement and finally. used it to make a bar of almond chocolate and it baked and tasted exactly like sugar. 2 things that I'd like to point out: 1. having previously used stevia, this is miles better that that. 2. having recently used trunativ everyday sweet, which claimed to be 1:1 replacement but usse sweet bilkul hota hi nai tha. had to put in 4 spoons to replace 1 spoon of sugar. plus they add erythritol which is bad for heart."
    },
    {
      id: 3,
      name: "Bharti",
      title: "Loved the Product !",
      image: "//beyondthesugar.com/cdn/shop/files/610Lv3mGiAL._SL1600.jpg?v=1762412637&width=400",
      text: "So I was looking for zero calorie sweetner found a number of different Monk Fruit sweeteners, each different brand was mixed with erythitol which wasn't too great but I bought one. I also saw something there called beyondthesugar monk fruit and allulose. I had never heard of before and I bought the packet. I got home and put some of bts in iced tea and man. Oh. Man. It tasted just like sugar. I can't believe it. No bitterness, no aftertaste."
    },
    {
      id: 4,
      name: "Subramoniam M J",
      title: "Excellent taste and truly transparent labeling",
      image: "//beyondthesugar.com/cdn/shop/files/Image_Editor.png?v=1757519461&width=400",
      text: "I tried several “monk fruit” products, and most had hidden erythritol, but this one is clearly a blend of monk fruit and allulose exactly as stated. The sweetness is clean, very close to real sugar, and no digestive issues at all. Works perfectly in coffee, tea etc . Slightly pricey but worth it for the honesty and natural taste. Highly recommended for anyone looking for a safe sugar replacement."
    },
    {
      id: 5,
      name: "Arpit S.",
      title: "So far so good",
      image: "//beyondthesugar.com/cdn/shop/files/71xHnnKN0aL._SY88.jpg?v=1762412818&width=400",
      text: "It's been a few days since I have started using this product. Since I haven't consumed it raw, I can't pinpoint whether it tastes sweeter, same or different than sugar. However, the meals that my mother prepares tastes exactly the same as before - no discernible difference. Hence, I am inclined to believe that it is a proper sweetening substitute. I have asked mother to keep a tab on when the packet finishes (I am the only one in the family who is consuming it as of today and would like to monitor the cost vs. duration of use). If it lasts for a reasonable period of time - perhaps a month, I wouldn't have hesitation in reordering despite the premium pricing - I'd consider it as buying a nutraceutical necessary for good health. That being said, I will still take time to closely observe whether consuming it has any side effects - I had chosen this product after researching about erythritol - which most other sugar substitutes use, and compared it to allulose, which besides this brand, hardly anyone else uses. The negative effects of the former and the no-negative effects of the latter helped me finalize the selection of this product. So far, besides fatigue (which I am sure this product isn't to be blamed, but my poor lifestyle is) I don't seem to have any issues. Perhaps, my next blood report will tell me if my markers have improved or stayed the same. The product is couriered in a really robust outer packaging - mom felt like I had received some gift :). There is a lab report accompanying it as well - tested on the same batch - indicating that the product is free from metals etc. A spoon is also included in the inner pack - which is a nice touch. If all goes well, I'd only wish that the product is priced a little more economically."
    },
    {
      id: 6,
      name: "Jaideep",
      title: "Good for Baking and Cooking!",
      image: "//beyondthesugar.com/cdn/shop/files/Group_21.png?v=1762478704&width=400",
      text: "It's good to have access to monkfruit and allulose in India. The sweetener works incredibly well in baking and has a fantastic taste with no strange aftertaste. Since they have mentioned baking as well on the pack I used it to make granola, and There were no problems. If you bake frequently, it finishes quickly, so I only wish it came in a larger pack. Customer image"
    },
    {
      id: 7,
      name: "Amazon Customer",
      title: "Can be 5 stars..Read why it is 4..",
      image: "//beyondthesugar.com/cdn/shop/files/bts-monogram-empty-bg.png?v=1757520112&width=400",
      text: "Product and packaging is premium. It's probably little sweeter than sugar. Full points for the team for introducing and delivering a quality product. A copy of lab test of samples from manufacturing batch is provided with the order. This helps to build authenticity and I hope this product is truly authentic as customers have to put faith into the process. Although a premium and nisch product at the moment, the price point is very high for this becoming a sugar replacement. Currently, I can personally justify using this product for very specific items that requires sweetner..not for day to day items or cooking. The sugar pandemic definately needs such products"
    },
    {
      id: 8,
      name: "Ansh",
      title: "Amazing product!",
      image: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.29.29_2e5e0861.jpg?v=1762413079&width=400",
      text: "Hello bropther i tried the product it tastes too good, i usually put in nimbu paani"
    },
    {
      id: 9,
      name: "Vishal Parekh",
      title: "Very Tasty and Filling!",
      image: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.21_924e1e76.jpg?v=1762413159&width=400",
      text: "Ordered 2 packets of this protein when I came across the money back guarantee they are giving. But this is very tasty. This is not sweet and like other proteins. Very chatpata and wholesome. One glass fills me for the next 2/3 hours."
    },
    {
      id: 10,
      name: "Parva Thakkar",
      title: "\"Healthy itna tasty hoga toh kyu nai 🤣\"",
      image: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.21_b9f8deb5.jpg?v=1762413253&width=400",
      text: "Never knew a protein can be chatpata. Made an impulse decision while buying it but it has become a daily drink for me during my work hours….have replaced coffee with this. Healthy itna tasty hoga toh kyu nai 🤣"
    },
    {
      id: 11,
      name: "Raj Jain",
      title: "GO try this protein right now",
      image: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.34.22_3c2541c3.jpg?v=1762413307&width=400",
      text: "I have been consuming Whey Protein from 2-3 years but never liked the taste.  A friend recommended Fuel to me and I fell in love with it! Very chatpata and refreshing.  To everyone who are reading this - GO try this protein right now because It changed the way i thought about protein and will change it for you too. So putting this here publicly. The brand owes me a free packet a for this honest review 😍🤣"
    },
    {
      id: 12,
      name: "S Syam",
      title: "Glad I ordered",
      image: "//beyondthesugar.com/cdn/shop/files/2_48902a11-0aa3-448c-b8ea-a8cc091e6027.png?v=1763637956&width=400",
      text: "Yesterday, had Fuel, It got back memories of my 17 years in Bokaro Steel City, where I lived for 17 years (my first job in SAIL). Most of my friends would bring 'Sattu' to the plant and I enjoyed having it. Nostalgia apart, Fuel does taste good. Glad I ordered"
    },
    {
      id: 13,
      name: "Dnyanesh kamath",
      title: "Thanks for FUEL",
      image: "//beyondthesugar.com/cdn/shop/files/2_ee65c17b-938c-4513-ac57-8dc20026dcec.png?v=1763882334&width=400",
      text: "Extremely delighted with FUEL. First of all the packaging, so neat and careful. Second, super impressed with cute hand written note. Say's a lot about your passion towards marketing FUEL. Third, awesome taste. Not only enjoyed, but thoroughly enjoyed."
    },
    {
      id: 14,
      name: "Sajneesh Sharma",
      title: "Did not spike my blood sugar and improved liver health",
      image: "//beyondthesugar.com/cdn/shop/files/WhatsApp_Image_2025-11-06_at_12.51.53_eb1aa494.jpg?v=1762413772&width=400",
      text: "The product is very good. It's helped me loose a lot of weight...Since it's very clean the body absorbs it completely. Being a pilot, I have blood tests every 6 months and because of Whey Protein my SGOT and SGPT (Liver health indicators) were inflated. But with Fuel everything has come back to normal and this does not even spike my blood sugar. I think its a great product!"
    }
  ];

  return (
    <div className="review-center-section">
      <div className="review-white-card">
        <h2 className="review-grid-title">Thousands of Happy Customers</h2>
        
        {/* Review Carousel */}
        <div className="review-carousel-wrapper">
          <button className="carousel-nav prev" id="prevBtn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <div className="review-carousel">
            <div 
              className="review-carousel-track" 
              id="carouselTrack" 
              style={{ transition: 'transform 0.5s', transform: 'translateX(-600%)' }}
            >
              {reviews.map((review) => (
                <div className="review-card" key={review.id}>
                  <div className="review-card-image">
                    <img src={review.image} alt={review.name} />
                  </div>
                  <div className="review-card-content">
                    <h3 className="review-card-title">{review.title}</h3>
                    <p className="review-card-text">"{review.text}"</p>
                    <div className="review-card-stars">
                      {'★'.repeat(5).split('').map((star, i) => (
                        <React.Fragment key={i}>
                          {star}<br style={{display: 'none'}}/> {/* Preservation of formatting if needed, though usually just characters */}
                        </React.Fragment>
                      ))}
                    </div>
                    <p className="review-card-author">{review.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-nav next" id="nextBtn">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ReviewCarousel };
export { CustomerReviewGrid };
export default Gallery;
