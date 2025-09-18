import { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Instagram } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState<'uz' | 'ru'>('uz');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.id]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const content = {
    uz: {
      nav: {
        about: "Elaynerlar haqida",
        advantages: "Afzalliklar",
        services: "Xizmatlar",
        process: "Ish jarayonimiz",
        results: "Natijalar",
        why: "Nega biz?",
        'doctors-order-bot': "Buyurtma berish"
      },
      hero: {
        title: "CleanCorrect – Zamonaviy Tish Tekislash",
        subtitle: "Shaffof, qulay va samarali davolash usuli",
        cta: "Maslahat olish"
      },
      advantages: {
        title: "Elaynerlarning afzalliklari nimada?",
        items: [
          {
            title: "Shaffof",
            description: "Deyarli ko'rinmaydi, metall simlar va qavslar yo'q"
          },
          {
            title: "Qulay",
            description: "Og'iz shilliq qavatini shikastlamaydi, kiyish oson"
          },
          {
            title: "Olib tashlash mumkin",
            description: "Ovqatlanish va tishlarni parvarish qilishda yechish qulay"
          }
        ]
      },
      mission: {
        title: "Maqsadimiz",
        description: "Odamlarga tekis va chiroyli tishlar ulashish. Buni sifatli va maqbul narxda amalga oshiramiz."
      },
      process: {
        title: "Bizning ish jarayonimiz"
      },
      results: {
        title: "Elaynerlar bilan erishilgan natijalar",
        before: "Avval",
        after: "Keyin"
      },
      services: {
        title: "Biz nima taklif qilamiz?",
        patients: {
          title: "Bemorlar uchun:",
          items: [
            "Elayner va breketlar bilan davolash",
            "Tish-qo'shiq tizimi nuqsonlarini to'g'rilash"
          ]
        },
        doctors: {
          title: "Shifokorlar uchun:",
          items: [
            "Elayner yetkazib berish",
            "Siz davolash jarayonini nazorat qilasiz. To'liq diagnostika va davolash rejasini biz – ortodontlar tuzamiz."
          ]
        }
      },
      why: {
        title: "Nega biz?",
        items: [
          "Davolash rejasini tajribali ortodontlar tuzadi",
          "Biz o'zimiz ishlab chiqaramiz, bu bizga elaynerlarni tez yetkazishga va yo'qolgan taqdirda tez tiklashga yordam beradi",
          "Material: uch qavatli poliuretan."
        ],
        details: "Deformatsiyaga chidamli, tishlarga ortiqcha bosim bermaydi. Breket tizimidagi nikel-titan sim kabi – yumshoq va uzoq vaqt davomida mo'tadil kuch bilan ishlaydi."
      },
      contact: {
        title: "Bog'lanish",
        telegram: "Telegram orqali yozing",
        call: "Qo'ng'iroq qiling"
      },
      orderBot: {
        badge: "Shifokorlar uchun",
        title: "1 qadamda Elayner buyurtma qiling",
        description: "Buyurtmangizni sifatli va tez yetkazib beramiz. Jarayon shaffof va qulay.",
        bullets: [
          "Tajribali ortodontlar nazorati",
          "Tezkor ishlab chiqarish va yetkazish",
          "Soddalashtirilgan buyurtma berish jarayoni"
        ],
        cta: "Botga o'tish",
        note: "24/7 buyurtma qabul qilinadi"
      }
    },
    ru: {
      nav: {
        about: "О элайнерах",
        advantages: "Преимущества",
        services: "Услуги",
        process: "Наш рабочий процесс",
        results: "Результаты",
        why: "Почему мы?",
        'doctors-order-bot': "Сделать заказ"
      },
      hero: {
        title: "CleanCorrect – Современное Выравнивание Зубов",
        subtitle: "Прозрачный, удобный и эффективный метод лечения",
        cta: "Получить консультацию"
      },
      advantages: {
        title: "В чем преимущества элайнеров?",
        items: [
          {
            title: "Прозрачные",
            description: "Практически невидимы, нет металлических проводов и скобок"
          },
          {
            title: "Удобные",
            description: "Не травмируют слизистую рта, легко надевать"
          },
          {
            title: "Съемные",
            description: "Удобно снимать для еды и ухода за зубами"
          }
        ]
      },
      mission: {
        title: "Наша миссия",
        description: "Дарить людям ровные и красивые зубы. Мы делаем это качественно и по доступной цене."
      },
      process: {
        title: "Наш рабочий процесс"
      },
      results: {
        title: "Результаты",
        before: "До",
        after: "После"
      },
      services: {
        title: "Что мы предлагаем?",
        patients: {
          title: "Для пациентов:",
          items: [
            "Лечение элайнерами и брекетами",
            "Исправление дефектов зубочелюстной системы"
          ]
        },
        doctors: {
          title: "Для врачей:",
          items: [
            "Поставка элайнеров",
            "Вы контролируете процесс лечения. Полную диагностику и план лечения составляем мы – ортодонты."
          ]
        }
      },
      why: {
        title: "Почему мы?",
        items: [
          "План лечения составляют опытные ортодонты",
          "Мы производим сами, это помогает нам быстро доставлять элайнеры и быстро восстанавливать в случае утери",
          "Материал: трехслойный полиуретан."
        ],
        details: "Устойчив к деформации, не оказывает чрезмерного давления на зубы. Как никель-титановая дуга в брекет-системе – мягкий и работает с умеренной силой длительное время."
      },
      contact: {
        title: "Контакты",
        telegram: "Написать в Telegram",
        call: "Позвонить"
      },
      orderBot: {
        badge: "Для врачей",
        title: "Начните заказ элайнеров в 1 шаг",
        description: "Мы быстро и качественно изготовим и доставим. Процесс прозрачный и удобный.",
        bullets: [
          "Под контролем опытных ортодонтов",
          "Оперативное производство и доставка",
          "Упрощённый процесс оформления заказа"
        ],
        cta: "Перейти в бота",
        note: "Принимаем заказы 24/7"
      }
    }
  };

  const beforeAfterCases = [
    {
      before: "https://i.postimg.cc/9FQDB9wd/11.jpg",
      after: "https://i.postimg.cc/h4rJxsv4/112.jpg"
    },
    {
      before: "https://i.postimg.cc/YqfnKJdN/03-00-8910.jpg",
      after: "https://i.postimg.cc/L89yHNWc/03-02-8910.jpg"
    },
    {
      before: "https://i.postimg.cc/JhtPXtMK/03-00-8050.jpg",
      after: "https://i.postimg.cc/SxggjcFJ/03-02-8050.jpg"
    }
    
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-[#3D85AA] hover-scale">CleanCorrect</div>
          
          <div className="hidden lg:flex items-center space-x-6">
            {Object.entries(content[language].nav).map(([key, value], index) => {
              const isPrimaryCta = key === 'doctors-order-bot';
              return (
                <a
                  key={key}
                  href={`#${key}`}
                  className={
                    isPrimaryCta
                      ? "cta-attention cta-attention--nav px-4 py-2 shadow"
                      : "text-gray-600 hover:text-[#3D85AA] transition-all duration-300 hover-scale"
                  }
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {value}
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            {/* Mobile Buyurtma CTA (always visible on small screens) */}
            <a
              href="#doctors-order-bot"
              className="lg:hidden cta-attention cta-attention--nav px-3 py-1 text-sm shadow"
            >
              {content[language].nav['doctors-order-bot']}
            </a>
            <button
              onClick={() => setLanguage('uz')}
              className={`px-3 py-1 rounded transition-all duration-300 hover-scale ${
                language === 'uz' ? 'bg-[#3D85AA] text-white' : 'text-gray-600'
              }`}
            >
              🇺🇿
            </button>
            <button
              onClick={() => setLanguage('ru')}
              className={`px-3 py-1 rounded transition-all duration-300 hover-scale ${
                language === 'ru' ? 'bg-[#3D85AA] text-white' : 'text-gray-600'
              }`}
            >
              🇷🇺
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="about"
        ref={el => sectionRefs.current['about'] = el}
        className="relative h-screen flex items-center"
        style={{
          backgroundImage: 'url("https://i.postimg.cc/hP7Rmgg8/photo-1606811841689-23dfddce3e95.avif")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-[#3D85AA]/40 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {content[language].hero.title}
            </h1>
            <p className="text-2xl md:text-3xl mb-12 font-light">
              {content[language].hero.subtitle}
            </p>
            <a
              href="https://t.me/AzamatKadirovv"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "🇺🇿Telegram orqali yozish uchun pastdagi tasdiqlash tugmasini bosing.\n\n***************\n\n" +
                  "🇷🇺Чтобы написать в Telegram, нажмите кнопку подтверждения ниже!"
                );
                window.location.href = "https://t.me/AzamatKadirovv";
              }}
              className="inline-block bg-white text-[#3D85AA] px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 hover-scale shadow-lg"
            >
              {content[language].hero.cta}
            </a>


          </div>
        </div>
      </section>

      {/* Advantages */}
      <section 
        id="advantages" 
        ref={el => sectionRefs.current['advantages'] = el}
        className={`py-16 bg-gray-50 section-fade-in ${visibleSections.has('advantages') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3D85AA] text-center mb-12">
            {content[language].advantages.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {content[language].advantages.items.map((item, index) => (
              <div
                key={index}
                className="card p-6 hover-scale transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-semibold mb-4 text-[#3D85AA]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section 
        id="mission" 
        ref={el => sectionRefs.current['mission'] = el}
        className={`py-16 bg-white section-fade-in ${visibleSections.has('mission') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold text-[#3D85AA] mb-6">
                {content[language].mission.title}
              </h2>
              <p className="text-xl text-gray-700">
                {content[language].mission.description}
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://www.hovedentalclinic.co.uk/wp-content/uploads/2022/12/bigstock-Clear-Aligner-Dental-Night-Gua-463488851.jpg"
                alt="Clear Aligner"
                className="rounded-lg shadow-xl w-full h-auto object-cover hover-scale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section 
        id="process" 
        ref={el => sectionRefs.current['process'] = el}
        className={`py-16 bg-gray-50 section-fade-in ${visibleSections.has('process') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3D85AA] text-center mb-12">
            {content[language].process.title}
          </h2>
          <div className="flex justify-center" >
            <div className="flex justify-center instagram-media-wrapper max-w-2xl w-full hover-scale">
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink="https://www.instagram.com/reel/DHgX2MkIg0X/?utm_source=ig_embed&utm_campaign=loading" 
                data-instgrm-version="14" 
                style={{
                  background: '#FFF',
                  border: '0',
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: '0',
                  width: 'calc(100% - 2px)'
                }}
              >
                <div style={{padding: '16px'}}>
                  <a 
                    href="https://www.instagram.com/reel/DHgX2MkIg0X/?utm_source=ig_embed&utm_campaign=loading" 
                    style={{
                      background: '#FFFFFF',
                      lineHeight: '0',
                      padding: '0 0',
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                      
                    }} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px'}}></div>
                      <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center'}}>
                        <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px'}}></div>
                        <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px'}}></div>
                      </div>
                    </div>
                    <div style={{padding: '19% 0'}}></div>
                    <div style={{display: 'block', height: '50px', margin: '0 auto 12px', width: '50px'}}>
                      <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                            <g>
                              <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div style={{paddingTop: '8px'}}>
                    </div>
                    <div style={{padding: '12.5% 0'}}></div>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center'}}>
                      <div>
                        <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)'}}></div>
                        <div style={{backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px'}}></div>
                        <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)'}}></div>
                      </div>
                      <div style={{marginLeft: '8px'}}>
                        <div style={{backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px'}}></div>
                        <div style={{width: '0', height: '0', borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)'}}></div>
                      </div>
                      <div style={{marginLeft: 'auto'}}>
                        <div style={{width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)'}}></div>
                        <div style={{backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)'}}></div>
                        <div style={{width: '0', height: '0', borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)'}}></div>
                      </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px'}}>
                      <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px'}}></div>
                      <div style={{backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px'}}></div>
                    </div>
                  </a>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section 
        id="results" 
        ref={el => sectionRefs.current['results'] = el}
        className={`py-16 bg-white section-fade-in ${visibleSections.has('results') ? 'visible' : ''}`}
      >
        <div className="container w-full mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3D85AA] text-center mb-12">
            {content[language].results.title}
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-12">
            {beforeAfterCases.map((caseItem, index) => (
              <div 
                key={index} 
                className="card overflow-hidden hover-scale transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="grid grid-cols-2 gap-6 p-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#3D85AA] mb-6">
                      {content[language].results.before}
                    </h3>
                    <img
                      src={caseItem.before}
                      alt="Before treatment"
                      className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#3D85AA] mb-6">
                      {content[language].results.after}
                    </h3>
                    <img
                      src={caseItem.after}
                      alt="After treatment"
                      className="w-full h-auto rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section 
        id="services" 
        ref={el => sectionRefs.current['services'] = el}
        className={`py-16 section-fade-in ${visibleSections.has('services') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3D85AA] text-center mb-12">
            {content[language].services.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8 hover-scale transition-all duration-300 card--interactive">
              <h3 className="text-2xl font-semibold mb-6 text-[#3D85AA]">
                {content[language].services.patients.title}
              </h3>
              <ul className="space-y-4">
                {content[language].services.patients.items.map((item, index) => (
                  <li key={index} className="flex items-baseline animate-slide-in" style={{ animationDelay: `${index * 200}ms` }}>
                    <span className="w-2 h-2 bg-[#3D85AA] rounded-full mr-2" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-8 hover-scale transition-all duration-300 card--interactive">
              <h3 className="text-2xl font-semibold mb-6 text-[#3D85AA]">
                {content[language].services.doctors.title}
              </h3>
              <ul className="space-y-4">
                {content[language].services.doctors.items.map((item, index) => (
                  <li key={index} className="flex items-baseline animate-slide-in" style={{ animationDelay: `${(index + 2) * 200}ms` }}>
                    <span className="w-2 h-2 bg-[#3D85AA] rounded-full mr-2" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section 
        id="why" 
        ref={el => sectionRefs.current['why'] = el}
        className={`py-16 bg-gray-50 section-fade-in ${visibleSections.has('why') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#3D85AA] text-center mb-12">
            {content[language].why.title}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {content[language].why.items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start animate-slide-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0 bg-[#3D85AA] text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg flex items-center justify-center mr-2 mt-1">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 hover-scale transition-all duration-300">
              {content[language].why.details.split('. ').map((detail, index) => (
                <div 
                  key={index} 
                  className="flex items-baseline mb-4 last:mb-0 animate-slide-in"
                  style={{ animationDelay: `${(index + 3) * 200}ms` }}
                >
                  <span className="w-2 h-2 bg-[#3D85AA] rounded-full mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Order Bot Section */}
      <section 
        id="doctors-order-bot"
        ref={el => sectionRefs.current['doctors-order-bot'] = el}
        className={`py-16 bg-gray-50 section-fade-in ${visibleSections.has('doctors-order-bot') ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#3D85AA]/20 p-8 md:p-10 hover-scale">
            <div className="absolute -top-3 left-6 bg-[#3D85AA] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {content[language].orderBot.badge}
            </div>
            <div className="md:flex md:items-center md:justify-between md:space-x-8">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-2xl md:text-3xl font-bold text-[#3D85AA] mb-3">
                  {content[language].orderBot.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg max-w-xl">
                  {content[language].orderBot.description}
                </p>
                <div className="mt-6 space-y-3">
                  {content[language].orderBot.bullets.map((point, idx) => (
                    <div key={idx} className="flex items-baseline">
                      <span className="w-2 h-2 bg-[#3D85AA] rounded-full mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right">
                <a
                  href="https://t.me/clean_correct_elaynerlari_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cta-attention px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-semibold shadow-lg"
                >
                  {content[language].orderBot.cta}
                </a>
                <p className={`text-gray-500 text-sm mt-3 ${language === 'ru' ? 'text-center' : ''}`}>{content[language].orderBot.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
<section 
  id="contact" 
  ref={el => sectionRefs.current['contact'] = el}
  className={`py-16 bg-[#3D85AA] text-white section-fade-in ${visibleSections.has('contact') ? 'visible' : ''}`}
>
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold text-white mb-12">
      {content[language].contact.title}
    </h2>
    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
      <a
        href="https://t.me/AzamatKadirovv"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-200 transition-all duration-300 hover-scale"
      >
        <MessageCircle className="w-6 h-6 mr-2" />
        {content[language].contact.telegram}
      </a>
      <a
        href="tel:+998910923730"
        className="flex items-center text-white hover:text-gray-200 transition-all duration-300 hover-scale"
      >
        <Phone className="w-6 h-6 mr-2" />
        +998 91 092 37 30
      </a>
      <a
        href="https://www.instagram.com/clean_correct_uz_/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-white hover:text-gray-200 transition-all duration-300 hover-scale"
      >
        <Instagram className="w-6 h-6 mr-2" />
        @clean_correct_uz_
      </a>
    </div>
  </div>
</section>

    </div>
  );
}

export default App;
