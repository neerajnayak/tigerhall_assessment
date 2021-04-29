import './css/style.css'

// Card View class
class CardView {
    constructor(name, img, categories, experts) {
        this.inflate(name, img, categories, experts);
    }

    inflate(name, img, categories, experts) {
        this._cardWrapper = document.createElement('div');
        this._cardWrapper.classList.add('content-card-wrapper');
        this._cardContents = document.createElement('div');
        this._cardContents.classList.add('content-card-contents');
        this._name = document.createElement('div');
        this._name.classList.add('content-card-name');
        this._image = document.createElement('img');
        this._image.classList.add('content-card-img');
        this._categories = document.createElement('div');
        this._categories.classList.add('content-card-categories');
        this._expertName = document.createElement('div');
        this._expertName.classList.add('content-card-expert-name');
        this._expertTitle = document.createElement('div');
        this._expertTitle.classList.add('content-card-expert-title');
        this._expertCompany = document.createElement('div');
        this._expertCompany.classList.add('content-card-expert-company');

        for(const category of categories) {
            const cat = document.createElement('div');
            cat.classList.add('content-card-category-item');
            cat.textContent = category.name;
            this._categories.appendChild(cat);
        }

        this._cardWrapper.appendChild(this._image);
        this._cardContents.appendChild(this._name);
        this._cardContents.appendChild(this._categories);
        this._cardContents.appendChild(this._expertName);
        this._cardContents.appendChild(this._expertTitle);
        this._cardContents.appendChild(this._expertCompany);
        this._cardWrapper.appendChild(this._cardContents);

        this._name.textContent = name;
        this._image.src = img;
        this._expertName.textContent = `${experts.firstName} ${experts.lastName}`;
        this._expertTitle.textContent = experts.title;
        this._expertCompany.textContent = experts.company;
    }

    get parent() {
       return this._cardWrapper.parentElement;
    }
}

// Card controller class
class Card {
    constructor(name, img, categories, experts) {
        this._id = name;
        this.addView(name, img, categories, experts);
    }

    addView(name, img, categories, experts) {
        this._view = new CardView(name, img, categories, experts);
    }

    get view() {
       return this._view;
    }

    get id() {
       return this._id;
    }
}

class MyApp {
    constructor() {
        console.log("My App constructor");
    }

    onCreate() {
        console.log("MyApp onCreate");
        this.inflate();

        this._cards = [];

        (async () => {
            await this.getJson();
            for(const data of this._data) {
                const card = new Card(data.name, data.image.uri, data.categories, data.experts[0]);
                this._cards.push(card);
            }

            this.appendCards();
        })();
    }

    inflate() {
        console.log("Inflate MyApp");
        this._header = document.createElement('div');
        this._header.classList.add('myapp-header');
        this._title = document.createElement('div');
        this._title.classList.add('myapp-title');
        this._title.textContent = 'Search';

        this._searchArea = document.createElement('div');
        this._searchArea.classList.add('myapp-search-area');
        this._inputField = document.createElement('input');
        this._inputField.classList.add('myapp-input-field');
        this._inputField.placeholder = 'Type Keyword here';
        this.keyUpListener = this.filterContentCards.bind(this);
        this._inputField.addEventListener('keyup', this.keyUpListener);

        this._header.appendChild(this._title);
        this._searchArea.appendChild(this._inputField);
        this._header.appendChild(this._searchArea);

        this._pageContents = document.createElement('div');
        this._pageContents.classList.add('myapp-page-contents');

        this._contents = document.createElement('div');
        this._contents.classList.add('myapp-contents');
        this._pageContents.appendChild(this._contents);
        
        document.body.appendChild(this._header);
        document.body.appendChild(this._pageContents);
    }

    appendCards() {
        for(const card of this._cards) {
            const container = document.createElement('div');
            container.classList.add('card-container');

            container.appendChild(card._view._cardWrapper);

            this._contents.appendChild(container);
        }
    }

    filterContentCards(e) {
        console.log('keyup');
        for(const card of this._cards) {
            if(card.id.toLowerCase().includes(this._inputField.value.toLowerCase())) {
                card.view.parent.classList.toggle('hide', false);
            } else {
                card.view.parent.classList.toggle('hide', true);
            }
        }
    };

    async getJson() {
        let jsonData;
        jsonData = {
            "data":{
               "contentCards":{
                  "edges":[
                     {
                        "name":"This Is How Online Ads Get You to Click",
                        "image":{
                           "uri":"https://static.tigerhall.com/resize/250x/uploads/image-2cf457b0-ba4d-46d6-a482-39d4712074ef-this-is-how-targeted-online-ads-get-you-to-click-jpg"
                        },
                        "categories":[
                           {
                              "name":"Consumer Behaviour"
                           },
                           {
                              "name":"Let's Talk Tech"
                           }
                        ],
                        "experts":[
                           {
                              "firstName":"Lars",
                              "lastName":"Voedisch",
                              "title":"MD & Principal Consultant",
                              "company":"PRecious Communications"
                           }
                        ]
                     },
                     {
                        "name":"PR for New Brands: It's Not About What You Sell",
                        "image":{
                           "uri":"https://static.tigerhall.com/resize/250x/uploads/image-ea60e125-dbbf-4ec9-9cc6-f33a6bd8100f-pr-for-new-brands-jpg"
                        },
                        "categories":[
                           {
                              "name":"Public Relations"
                           }
                        ],
                        "experts":[
                           {
                              "firstName":"Lars",
                              "lastName":"Voedisch",
                              "title":"MD & Principal Consultant",
                              "company":"PRecious Communications"
                           }
                        ]
                     },
                     {
                        "name":"Rumours and Rules: Preparing Staff For IPO",
                        "image":{
                           "uri":"https://static.tigerhall.com/resize/250x/uploads/image-e1fde116-b208-4c4a-b5d9-5a18f96d866d-preparing-staff-for-ipo-jpg"
                        },
                        "categories":[
                           {
                              "name":"Managing Change and Business Transformation"
                           }
                        ],
                        "experts":[
                           {
                              "firstName":"Larissa",
                              "lastName":"Tan",
                              "title":"CEO",
                              "company":"Vanda Electrics"
                           }
                        ]
                     },
                     {
                        "name":"Execution: Spreading Your Wings In a New Market",
                        "image":{
                           "uri":"https://static.tigerhall.com/resize/250x/uploads/image-73fec4d6-51dc-404a-aba5-cc0d88084077-image-for-pod-3_-lifestyle-changes-to-be-more-sustainable-jpg"
                        },
                        "categories":[
                           {
                              "name":"Grow and Scale Your Business"
                           }
                        ],
                        "experts":[
                           {
                              "firstName":"Steve",
                              "lastName":"Melhuish",
                              "title":"Co-founder & Vice Chairman",
                              "company":"PropertyGuru Group"
                           }
                        ]
                     },
                     {
                        "name":"An Inclusive Digital Transformation Strategy",
                        "image":{
                           "uri":"https://static.tigerhall.com/resize/250x/uploads/image-64034e36-5bf4-4458-9139-73de145f6d50-an-inclusive-digital-transformation-strategy-jpg"
                        },
                        "categories":[
                           {
                              "name":"Managing Change and Business Transformation"
                           }
                        ],
                        "experts":[
                           {
                              "firstName":"Jeremy",
                              "lastName":"Blain",
                              "title":"CEO",
                              "company":"PerformanceWorks International"
                           }
                        ]
                     }
                  ]
               }
            }
         };

        let response;
        try {
            response = await fetch('https://api.staging.tigerhall.io/graphql', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query: `
                    {
                        contentCards(filter: {limit: 20, keywords: "", types: [PODCAST]}) {
                          edges {
                            ... on Podcast {
                              name
                              image {
                                ...Image
                              }
                              categories {
                                ...Category
                              }
                              experts {
                                ...Expert
                              }
                            }
                          }
                        }
                      }
                      
                      fragment Image on Image {
                        uri
                      }
                      
                      fragment Category on Category {
                        name
                      }
                      
                      fragment Expert on Expert {
                        firstName
                        lastName
                        title
                        company
                      }                  
                    `
                })
            });
            jsonData = await response.json();
        } catch(e) {
            console.log(e.message);
        }
        
        console.log(jsonData.data);
        this._data = jsonData.data.contentCards.edges;
    }
}

window.App = new MyApp();
window.App.onCreate();