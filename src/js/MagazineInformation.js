import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../css/MagazineInformation.css'; // Import CSS file for styling
import magazine1 from "../../src/img/magazine1.jpeg";
import magazine2 from "../../src/img/magazine2.jpeg";
import magazine3 from "../../src/img/magazine3.jpg";
import magazine4 from "../../src/img/magazine4.jpeg";
const pagesData = [
  {
    image: magazine1,
    content: null
  },
  {
    image: null,
    content: {
      headline: "Empowering Women: Breaking Barriers",
      paragraphs: [
        "Women empowerment involves providing women with the tools, resources, and opportunities necessary to participate fully in all aspects of life. It encompasses breaking down barriers and challenging societal norms that hinder women's progress.",
        "Empowered women are not only able to improve their own lives but also contribute positively to their families, communities, and societies at large. By empowering women, we create a more just, equitable, and prosperous world for everyone.",
        "Women's empowerment is a multifaceted concept that encompasses various dimensions, including economic, social, political, and cultural empowerment. It aims to address the structural inequalities and discriminatory practices that limit women's potential and hinder their advancement.",
        "Key elements of women empowerment include access to education, healthcare, employment opportunities, and equal participation in decision-making processes. It also involves challenging gender stereotypes, promoting women's rights, and addressing issues such as gender-based violence and discrimination.",
      
      ]
    }
  },
  {
    image: magazine2,
    content: null
  },
  {
    image: null,
    content: {
      headline: "Celebrating Women's Achievements",
      paragraphs: [
        "Throughout history, women have made remarkable contributions to society in various fields, including science, literature, politics, and the arts. Their achievements have shaped our world and inspired generations of people to dream big and strive for excellence.",
        "In science, women have played pivotal roles in advancing knowledge and innovation. From Marie Curie, the pioneering physicist who discovered radioactivity, to Rosalind Franklin, whose work was instrumental in the discovery of the structure of DNA, women scientists have pushed the boundaries of what is possible and transformed our understanding of the natural world.",
       
       
      ]
    }
  },
  {
    image: magazine3,
    content: null
  },
  {
    image: null,
    content: {
      headline: "Fostering Gender Equality",
      paragraphs: [
        "Gender equality is essential for the advancement of society. It ensures that both men and women have equal opportunities, rights, and responsibilities. Gender equality is not only a fundamental human right but also a necessary foundation for a peaceful, prosperous, and sustainable world.",
        "Achieving gender equality requires addressing the structural and systemic barriers that perpetuate discrimination and inequality. These barriers include patriarchal norms and attitudes, unequal access to education and healthcare, gender-based violence, and discriminatory laws and policies.",
        "One of the key challenges in fostering gender equality is changing deep-seated attitudes and beliefs about gender roles and stereotypes. From a young age, boys and girls are socialized into narrow and restrictive gender norms that dictate how they should behave, dress, and express themselves.",
      
       
           ]
    }
  },
  {
    image: magazine4,
    content: null
  },
  {
    image: null,
    content: {
      headline: "Empowering Women in Leadership",
      paragraphs: [
        "Despite significant progress in recent years, women remain underrepresented in leadership positions across various sectors, including politics, business, academia, and the nonprofit sector. This underrepresentation is not due to a lack of qualified women but rather to systemic barriers and biases that inhibit women's advancement.",
        "One of the main challenges in empowering women in leadership is addressing the structural and cultural barriers that limit women's access to leadership positions. These barriers include gender discrimination, unconscious bias, unequal access to opportunities and resources, and a lack of supportive policies and organizational cultures.",
        "To overcome these barriers and empower women in leadership, it is essential to adopt a multi-faceted approach that addresses the root causes of gender inequality. This includes implementing policies and initiatives that promote gender diversity and inclusion, such as affirmative action measures, mentorship programs, and leadership development initiatives for women.",
       
       
             ]
    }
  }
  // Add more page data objects as needed
];


const MagazineInformation = () => {
  const flipBook = useRef(null);

  const renderPage = (data, index) => {
    if (index % 2 === 0) {
      // Render image page
      return (
        <div className="page" key={index} data-density="hard">
          <div className="page-content">
            <img src={data.image} alt={`Magazine ${index}`} className="full-page-image" />
          </div>
        </div>
      );
    } else {
      // Render content page
      return (
        <div className="page" key={index} data-density="hard">
          <div className="page-content">
            <div className="headline-container">
              <h2>{data.content.headline}</h2>
            </div>
            <div className="content-container">
              {data.content.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container magazine-container">
     <HTMLFlipBook
  width={450}
  height={560}
  size="stretch"
  minWidth={315}
  maxWidth={1000}
  minHeight={400}
  maxHeight={1533}
  maxShadowOpacity={0.5}
  showCover={false}
  mobileScrollSupport={true}
  className="demo-book"
  ref={flipBook}
 
>
  {pagesData.map((page, index) => renderPage(page, index))}
</HTMLFlipBook>

    </div>
  );
};

export default MagazineInformation;
