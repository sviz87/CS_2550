const menuBtn = document.getElementById("menu-btn");
const siteNav = document.getElementById("site-nav");
const siteHeader = document.querySelector(".site-header");
const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");
const galleryGrid = document.querySelector(".gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const themeStylesheetHref = "css/light-theme.css";
const themeStylesheetId = "light-theme-stylesheet";
const languageStorageKey = "romanian-roadbook-language";
let currentLanguage = "en";

const translations = {
  en: {
    documentTitle: "Romania Travel Guide",
    "brand.logoAlt": "Romania Roadbook logo",
    "brand.title": "Romania Roadbook",
    "brand.tagline": "History, food, and city adventures across three regions",
    "menu.label": "Menu",
    "nav.ariaLabel": "Main navigation",
    "nav.home": "Home",
    "nav.wallachia": "Wallachia",
    "nav.transylvania": "Transylvania",
    "nav.moldova": "Moldova",
    "nav.food": "Food",
    "nav.transport": "Transportation",
    "nav.weather": "Weather",
    "nav.gallery": "Gallery",
    "nav.media": "Media",
    "nav.contact": "Contact",
    "aside.transport.title": "Getting Around",
    "aside.transport.body1": "Romania has an extensive rail network operated by CFR (Căile Ferate Române). Trains connect major cities including Bucharest, Cluj-Napoca, Iași, Constanța, and Brașov",
    "aside.transport.body2": "Check schedules and tickets at <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">CFR Călători Official Website</a>",
    "aside.weather.title": "Weather",
    "aside.weather.body": "Current conditions and packing suggestions",
    "home.title": "Welcome to Romania",
    "home.intro": "Romania combines mountain landscapes, medieval towns, and lively urban culture. This site focuses on Wallachia, Transylvania, and Moldova while highlighting major destinations such as Bucharest, Cluj-Napoca, Suceava, and Constanta",
    "home.map.ariaLabel": "Romania map region quick links",
    "home.map.alt": "Map of Romania with region labels",
    "home.map.transylvania": "Transylvania",
    "home.map.moldova": "Moldova",
    "home.map.wallachia": "Wallachia",
    "home.cards.regions.title": "Discover the Regions",
    "home.cards.regions.body": "Romania is traditionally divided into several historical regions, each with its own identity and traditions. This guide focuses on Wallachia, Transylvania, and Moldova, three regions known for their castles, monasteries, vibrant cities, and breathtaking landscapes",
    "home.cards.cities.title": "Historic Cities & Landmarks",
    "home.cards.cities.body": "From the grand boulevards of Bucharest to the medieval streets of Sibiu and Sighisoara, Romania offers a rich architectural heritage. Visitors can explore castles, historic churches, monasteries, and UNESCO heritage sites across the country",
    "home.cards.nature.title": "Nature & Scenic Landscapes",
    "home.cards.nature.body": "Romania's landscapes range from the towering peaks of the Carpathian Mountains to the forests of Transylvania and the shores of the Black Sea. The country offers spectacular natural scenery ideal for hiking, photography, and cultural exploration",
    "home.cards.tips.title": "Travel Tips",
    "home.cards.tips.body": "Romania is best explored by combining city visits with countryside trips. Spring and early autumn offer pleasant weather and fewer crowds, while summer is ideal for visiting the Black Sea coast. Trains operated by the national railway (CFR) connect most major cities, making travel between regions convenient and scenic",
    "home.quickTips.title": "Quick Trip Planning Tips",
    "home.quickTips.body": "Pack layers for variable weather, keep cash for smaller towns, and include one rest day between long intercity travel legs",
    "wallachia.title": "Wallachia",
    "wallachia.p1": "Wallachia is one of the historical principalities of southern Romania and was once ruled by powerful voievods during the medieval period. The region's early capital was the fortified city of Targoviste before political power gradually shifted to Bucharest, which remains Romania's modern capital today. Wallachia is characterized by rolling hills, fertile plains, and historic towns that reflect centuries of political and cultural development",
    "wallachia.p2": "One of the most iconic landmarks associated with the region is Bran Castle. Perched dramatically on a rocky hill near the Carpathian Mountains, the castle was built in the 14th century and served as a strategic defensive fortress. Although commonly linked with the Dracula legend, Bran Castle is historically valuable for its medieval architecture and panoramic mountain views",
    "wallachia.p3": "Travelers can also visit Constanta on the Black Sea coast. As Romania's largest seaport, Constanta combines ancient history with seaside tourism. Originally founded as the Greek colony of Tomis, the city today offers beaches, maritime culture, and historic landmarks such as the famous Constanta Casino overlooking the sea",
    "wallachia.img1.alt": "Arcul de Triumf in Bucharest",
    "wallachia.img2.alt": "Constanta city on the Black Sea coast",
    "wallachia.img3.alt": "Peles Castle exterior view",
    "wallachia.img4.alt": "Peles Castle alternate architectural view",
    "common.topStops": "Top Stops",
    "common.food": "Food",
    "common.foodHighlights": "Regional Food Highlights",
    "common.culturalHighlights": "Cultural Highlights",
    "common.culture.monasteries": "Historic monasteries",
    "common.culture.castles": "Medieval castles",
    "common.culture.markets": "Traditional markets",
    "common.culture.festivals": "Local cuisine and festivals",
    "wallachia.card1.body": "Palace of the Parliament, Old Town, Curtea de Arges Monastery",
    "wallachia.card2.body": "Sarmale, ciorba de burta, and papanasi served in traditional bistros",
    "wallachia.card3.body": "Try moussaka-style baked dishes, grilled mici, and seasonal produce from southern markets near Bucharest and Prahova",
    "transylvania.title": "Transylvania",
    "transylvania.p1": "Transylvania is one of Romania's most historically rich regions and is famous for its dramatic landscapes, medieval towns, and cultural diversity. Surrounded by the Carpathian Mountains, the region offers breathtaking natural scenery including forests, alpine valleys, and mountain passes",
    "transylvania.p2": "Throughout history Transylvania has been influenced by Romanian, Hungarian, and Saxon cultures, which shaped the architecture and traditions still visible today. Cities such as Cluj-Napoca, Sibiu, and Brasov feature colorful historic squares, gothic churches, and well-preserved medieval fortifications",
    "transylvania.p3": "The region is also known for its castles and fortified churches that once protected settlements from invasion. Today Transylvania blends historic charm with modern cultural life, festivals, universities, and growing technology industries centered in cities like Cluj-Napoca",
    "transylvania.img1.alt": "Bran Castle in Transylvania",
    "transylvania.img2.alt": "Cluj-Napoca city center",
    "transylvania.img3.alt": "Historic Sibiu square",
    "transylvania.img4.alt": "Sighisoara church and medieval streets",
    "transylvania.card1.body": "Cluj Old Center, Turda Salt Mine, nearby castles and fortified churches",
    "transylvania.card2.body": "Goulash-style stews, smoked meats, and artisan pastries",
    "transylvania.card3.body": "Look for slow-cooked stews, smoked cheeses, and rustic breads influenced by mountain and Saxon traditions",
    "moldova.title": "Moldova Region",
    "moldova.p1": "The historical region of Moldova in northeastern Romania should not be confused with the modern Republic of Moldova. This region has long been an important center of Romanian political, religious, and cultural life",
    "moldova.p2": "One of the most celebrated rulers of the region was Stefan cel Mare (Stephen the Great), a 15th-century voievod who defended Moldova from numerous invasions and strengthened the principality's independence. His reign left a lasting legacy in the form of churches and monasteries built throughout the region",
    "moldova.p3": "Among Moldova's greatest cultural treasures are the Painted Monasteries of Bucovina, recognized as UNESCO World Heritage sites. Monasteries such as Voronet are famous for their vividly colored exterior frescoes depicting biblical scenes and medieval history. The city of Iasi later emerged as an important political and intellectual center and remains one of Romania's major university cities today",
    "moldova.img1.alt": "Rarau mountain panorama",
    "moldova.img2.alt": "Cetatea Suceava fortress",
    "moldova.img3.alt": "Sucevita Monastery",
    "moldova.img4.alt": "Voronet Monastery exterior",
    "moldova.img5.alt": "Voronet Monastery fresco details",
    "moldova.card1.body": "Suceava Fortress, Voronet Monastery, Bucovina scenic routes",
    "moldova.card2.body": "Hearty soups, roasted meats, local cheeses, and honey desserts",
    "moldova.card3.body": "Enjoy hearty soups, oven-roasted dishes, and honey-rich desserts shaped by monastic and village culinary traditions",
    "food.title": "Romanian Food Highlights",
    "food.intro": "Romanian cuisine blends rural traditions, Balkan flavors, and seasonal ingredients. These dishes are popular across regional markets and family-run restaurants",
    "food.card1.alt": "Mititei grilled street food",
    "food.card1.title": "Mititei",
    "food.card1.body": "Grilled minced meat rolls served hot with mustard and fresh bread",
    "food.card2.alt": "Mici traditional Romanian barbecue",
    "food.card2.title": "Mici",
    "food.card2.body": "A Romanian barbecue favorite often enjoyed in parks and open-air markets",
    "food.card3.alt": "Traditional Romanian cold salad",
    "food.card3.title": "Cold Salad",
    "food.card3.body": "Refreshing appetizers with seasonal vegetables, herbs, and creamy textures",
    "food.card4.alt": "Coliva ceremonial dessert",
    "food.card4.title": "Coliva",
    "food.card4.body": "A ceremonial wheat dessert with nuts and spices rooted in Orthodox tradition",
    "transport.title": "Transportation",
    "transport.p1": "Romania is well connected by rail, road, and regional airports. The most common way to travel between major cities is by train using the national railway operator CFR Calatori. Trains connect Bucharest with cities such as Cluj-Napoca, Iasi, Brasov, Sibiu, and Constanta",
    "transport.p2": "While travel times can be slower than in Western Europe, the rail system offers scenic routes through the Carpathian Mountains and countryside. Modern InterCity trains provide comfortable seating and connections between Romania's major urban centers",
    "transport.card1.title": "Rail Travel",
    "transport.card1.body": "CFR trains link most Romanian cities. The Bucharest-Brasov-Cluj route is particularly scenic as it crosses the Carpathian Mountains. Plan routes on <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">CFR Călători</a>",
    "transport.card2.title": "Regional Buses",
    "transport.card2.body": "Private bus companies connect smaller towns and villages not served by direct rail routes",
    "transport.card3.title": "City Transport",
    "transport.card3.body1": "For Bucharest city transport, see <a href=\"https://www.stb.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Bucharest Buses</a>",
    "transport.card3.body2": "For Bucharest Metro service, visit <a href=\"https://www.metrorex.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Metrorex</a>",
    "transport.card3.body3": "Major cities such as Bucharest and Cluj-Napoca offer public transport including buses, trams, and metro lines",
    "gallery.title": "Gallery",
    "gallery.img1.alt": "Bran Castle overlooking the Carpathian Mountains",
    "gallery.img1.caption": "Bran Castle overlooking the Carpathian Mountains",
    "gallery.img2.alt": "Peles Castle in Wallachia",
    "gallery.img2.caption": "Peles Castle architecture in the Carpathian foothills",
    "gallery.img3.alt": "Sibiu historic city center",
    "gallery.img3.caption": "Sibiu's historic square and colorful facades",
    "gallery.img4.alt": "Voronet Monastery exterior",
    "gallery.img4.caption": "Voronet Monastery, known for iconic painted walls",
    "gallery.img5.alt": "Sucevita Monastery architecture",
    "gallery.img5.caption": "Sucevita Monastery and fortified monastic architecture",
    "gallery.img6.alt": "Rarau mountain panorama",
    "gallery.img6.caption": "Panoramic view of the Rarau mountain landscape",
    "gallery.img7.alt": "Constanta Black Sea coastline",
    "gallery.img7.caption": "Constanta coastline along Romania's Black Sea shore",
    "gallery.img8.alt": "Arcul de Triumf in Bucharest",
    "gallery.img8.caption": "Arcul de Triumf landmark in Bucharest",
    "media.title": "Media",
    "media.videoTitle": "Romania travel video",
    "media.body": "If the embedded player is unavailable in your browser, watch directly on <a href=\"https://www.youtube.com/watch?v=4h4DwufM8xI\" target=\"_blank\" rel=\"noopener noreferrer\">YouTube</a>",
    "contact.title": "Contact & Resources",
    "contact.email": "travel@romaniaroadbook.example",
    "contact.phone": "+40 21 555 1234",
    "contact.address": "15 Carpathian Ave, Bucharest 010101",
    "contact.links": "<i class=\"fa-solid fa-link\"></i> Transit portals: <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">CFR</a>, <a href=\"https://www.metrorex.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Metrorex</a>, <a href=\"https://www.stb.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">STB</a>",
    "footer.text": "Romania Roadbook | Responsive travel website project",
    "lightbox.close": "Close image viewer",
    "language.toggleToRo": "Switch to Romanian",
    "language.toggleToEn": "Switch to English",
    "weather.loading": "Loading live weather",
    "weather.error": "Unable to load weather right now",
    "weather.updated": "Updated",
    "weather.snapshotTitle": "March Snapshot",
    "weather.snapshotBody": "Sample spring conditions in Romania",
    "weather.offline": "Offline mode sample",
    "weather.outfit.cold": "Bring a coat and scarf",
    "weather.outfit.mild": "Wear a light jacket",
    "weather.outfit.warm": "Use a t-shirt and sunglasses",
    "theme.enableLight": "Enable light theme",
    "theme.enableDark": "Enable dark theme"
  },
  ro: {
    documentTitle: "Ghid de Călătorie prin România",
    "brand.logoAlt": "Sigla Romania Roadbook",
    "brand.title": "Romania Roadbook",
    "brand.tagline": "Istorie, gastronomie și aventuri urbane în trei regiuni",
    "menu.label": "Meniu",
    "nav.ariaLabel": "Navigare principală",
    "nav.home": "Acasă",
    "nav.wallachia": "Țara Românească",
    "nav.transylvania": "Transilvania",
    "nav.moldova": "Moldova",
    "nav.food": "Mâncare",
    "nav.transport": "Transport",
    "nav.weather": "Vreme",
    "nav.gallery": "Galerie",
    "nav.media": "Media",
    "nav.contact": "Contact",
    "aside.transport.title": "Cum te deplasezi",
    "aside.transport.body1": "România are o rețea feroviară extinsă operată de CFR (Căile Ferate Române). Trenurile leagă orașe importante precum București, Cluj-Napoca, Iași, Constanța și Brașov.",
    "aside.transport.body2": "Verifică programul și biletele pe <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">site-ul oficial CFR Călători</a>",
    "aside.weather.title": "Vreme",
    "aside.weather.body": "Condiții curente și sugestii pentru bagaj",
    "home.title": "Bine ai venit în România",
    "home.intro": "România îmbină peisaje montane, orașe medievale și o cultură urbană plină de viață. Acest site se concentrează pe Țara Românească, Transilvania și Moldova, evidențiind destinații importante precum București, Cluj-Napoca, Suceava și Constanța.",
    "home.map.ariaLabel": "Hartă a României cu linkuri rapide către regiuni",
    "home.map.alt": "Hartă a României cu etichetele regiunilor",
    "home.map.transylvania": "Transilvania",
    "home.map.moldova": "Moldova",
    "home.map.wallachia": "Țara Românească",
    "home.cards.regions.title": "Descoperă regiunile",
    "home.cards.regions.body": "România este împărțită în mod tradițional în mai multe regiuni istorice, fiecare cu identitatea și tradițiile sale. Acest ghid se concentrează pe Țara Românească, Transilvania și Moldova, trei regiuni cunoscute pentru castele, mănăstiri, orașe vibrante și peisaje spectaculoase.",
    "home.cards.cities.title": "Orașe istorice și repere",
    "home.cards.cities.body": "De la marile bulevarde ale Bucureștiului la străzile medievale din Sibiu și Sighișoara, România oferă un patrimoniu arhitectural bogat. Vizitatorii pot explora castele, biserici istorice, mănăstiri și situri aflate în patrimoniul UNESCO.",
    "home.cards.nature.title": "Natură și peisaje",
    "home.cards.nature.body": "Peisajele României pornesc de la vârfurile înalte ale Carpaților și ajung până la pădurile Transilvaniei și țărmul Mării Negre. Țara oferă decoruri naturale spectaculoase, ideale pentru drumeții, fotografie și explorare culturală.",
    "home.cards.tips.title": "Sfaturi de călătorie",
    "home.cards.tips.body": "România se descoperă cel mai bine combinând vizitele urbane cu excursiile la țară. Primăvara și începutul toamnei aduc vreme plăcută și mai puțină aglomerație, iar vara este ideală pentru litoral. Trenurile CFR leagă majoritatea orașelor importante, făcând deplasarea între regiuni comodă și pitorească.",
    "home.quickTips.title": "Sfaturi rapide pentru planificare",
    "home.quickTips.body": "Ia haine în straturi pentru vreme schimbătoare, păstrează numerar pentru orașele mici și lasă cel puțin o zi de odihnă între deplasările lungi.",
    "wallachia.title": "Țara Românească",
    "wallachia.p1": "Țara Românească este unul dintre principatele istorice ale sudului României și a fost condusă cândva de voievozi puternici în perioada medievală. Capitala timpurie a regiunii a fost cetatea Târgoviște, înainte ca puterea politică să se mute treptat la București, capitala modernă a României. Regiunea este caracterizată de dealuri line, câmpii fertile și orașe istorice care reflectă secole de dezvoltare politică și culturală.",
    "wallachia.p2": "Unul dintre cele mai emblematice repere asociate cu regiunea este Castelul Bran. Așezat dramatic pe o stâncă în apropierea Carpaților, castelul a fost construit în secolul al XIV-lea și a servit drept fortăreață defensivă strategică. Deși este legat adesea de legenda lui Dracula, Castelul Bran are o valoare istorică reală prin arhitectura sa medievală și panoramele montane.",
    "wallachia.p3": "Călătorii pot vizita și Constanța, pe litoralul Mării Negre. Fiind cel mai mare port al României, Constanța combină istoria antică cu turismul de coastă. Fondat inițial ca colonia grecească Tomis, orașul oferă astăzi plaje, cultură maritimă și repere istorice precum celebrul Cazinou din Constanța.",
    "wallachia.img1.alt": "Arcul de Triumf din București",
    "wallachia.img2.alt": "Orașul Constanța pe litoralul Mării Negre",
    "wallachia.img3.alt": "Vedere exterioară a Castelului Peleș",
    "wallachia.img4.alt": "Altă perspectivă arhitecturală a Castelului Peleș",
    "common.topStops": "Opriri recomandate",
    "common.food": "Mâncare",
    "common.foodHighlights": "Specialități regionale",
    "common.culturalHighlights": "Repere culturale",
    "common.culture.monasteries": "Mănăstiri istorice",
    "common.culture.castles": "Castele medievale",
    "common.culture.markets": "Piețe tradiționale",
    "common.culture.festivals": "Bucătărie locală și festivaluri",
    "wallachia.card1.body": "Palatul Parlamentului, Centrul Vechi, Mănăstirea Curtea de Argeș",
    "wallachia.card2.body": "Sarmale, ciorbă de burtă și papanași serviți în bistrouri tradiționale",
    "wallachia.card3.body": "Încearcă preparate coapte în stil musaca, mici la grătar și produse de sezon din piețele sudice din jurul Bucureștiului și Prahovei.",
    "transylvania.title": "Transilvania",
    "transylvania.p1": "Transilvania este una dintre cele mai bogate regiuni istorice ale României și este faimoasă pentru peisajele dramatice, orașele medievale și diversitatea culturală. Înconjurată de Carpați, regiunea oferă decoruri naturale impresionante, inclusiv păduri, văi alpine și trecători montane.",
    "transylvania.p2": "De-a lungul istoriei, Transilvania a fost influențată de culturile română, maghiară și săsească, care au modelat arhitectura și tradițiile vizibile și astăzi. Orașe precum Cluj-Napoca, Sibiu și Brașov au piețe istorice colorate, biserici gotice și fortificații medievale bine păstrate.",
    "transylvania.p3": "Regiunea este cunoscută și pentru castelele și bisericile fortificate care protejau cândva așezările de invazii. Astăzi, Transilvania îmbină farmecul istoric cu viața culturală modernă, festivalurile, universitățile și industriile tehnologice în creștere din orașe precum Cluj-Napoca.",
    "transylvania.img1.alt": "Castelul Bran în Transilvania",
    "transylvania.img2.alt": "Centrul orașului Cluj-Napoca",
    "transylvania.img3.alt": "Piața istorică din Sibiu",
    "transylvania.img4.alt": "Biserica și străzile medievale din Sighișoara",
    "transylvania.card1.body": "Centrul vechi din Cluj, Salina Turda, castele și biserici fortificate din apropiere",
    "transylvania.card2.body": "Tocănițe în stil gulaș, mezeluri afumate și produse de patiserie artizanale",
    "transylvania.card3.body": "Caută tocănițe gătite lent, brânzeturi afumate și pâini rustice influențate de tradițiile montane și săsești.",
    "moldova.title": "Regiunea Moldova",
    "moldova.p1": "Regiunea istorică Moldova din nord-estul României nu trebuie confundată cu actuala Republică Moldova. Această zonă a fost mult timp un centru important al vieții politice, religioase și culturale românești.",
    "moldova.p2": "Unul dintre cei mai cunoscuți conducători ai regiunii a fost Ștefan cel Mare, un voievod al secolului al XV-lea care a apărat Moldova de numeroase invazii și a consolidat independența principatului. Domnia sa a lăsat o moștenire durabilă prin bisericile și mănăstirile ridicate în întreaga regiune.",
    "moldova.p3": "Printre cele mai mari comori culturale ale Moldovei se numără mănăstirile pictate din Bucovina, recunoscute ca situri UNESCO. Mănăstiri precum Voroneț sunt renumite pentru frescele exterioare viu colorate, care ilustrează scene biblice și istorie medievală. Orașul Iași a devenit ulterior un important centru politic și intelectual și rămâne astăzi unul dintre marile orașe universitare ale României.",
    "moldova.img1.alt": "Panoramă din masivul Rarău",
    "moldova.img2.alt": "Cetatea Suceava",
    "moldova.img3.alt": "Mănăstirea Sucevița",
    "moldova.img4.alt": "Exteriorul Mănăstirii Voroneț",
    "moldova.img5.alt": "Detalii de frescă la Mănăstirea Voroneț",
    "moldova.card1.body": "Cetatea Sucevei, Mănăstirea Voroneț, trasee pitorești în Bucovina",
    "moldova.card2.body": "Supe consistente, fripturi, brânzeturi locale și deserturi cu miere",
    "moldova.card3.body": "Savurează supe consistente, preparate coapte la cuptor și deserturi bogate în miere, influențate de tradițiile monahale și sătești.",
    "food.title": "Repere culinare românești",
    "food.intro": "Bucătăria românească îmbină tradițiile rurale, aromele balcanice și ingredientele de sezon. Aceste preparate sunt populare în piețele regionale și restaurantele de familie.",
    "food.card1.alt": "Mititei la grătar",
    "food.card1.title": "Mititei",
    "food.card1.body": "Rulouri din carne tocată la grătar, servite fierbinți cu muștar și pâine proaspătă",
    "food.card2.alt": "Mici tradiționali românești",
    "food.card2.title": "Mici",
    "food.card2.body": "Un favorit al grătarelor românești, adesea savurat în parcuri și piețe în aer liber",
    "food.card3.alt": "Salată rece tradițională românească",
    "food.card3.title": "Salată rece",
    "food.card3.body": "Aperitive răcoritoare cu legume de sezon, verdețuri și texturi cremoase",
    "food.card4.alt": "Colivă ceremonială",
    "food.card4.title": "Colivă",
    "food.card4.body": "Un desert ceremonial din grâu, cu nuci și mirodenii, legat de tradiția ortodoxă",
    "transport.title": "Transport",
    "transport.p1": "România este bine conectată prin cale ferată, drumuri și aeroporturi regionale. Cea mai comună metodă de deplasare între marile orașe este trenul operat de CFR Călători. Trenurile leagă Bucureștiul de orașe precum Cluj-Napoca, Iași, Brașov, Sibiu și Constanța.",
    "transport.p2": "Deși timpii de călătorie pot fi mai lenți decât în Europa de Vest, sistemul feroviar oferă rute pitorești prin Carpați și zone rurale. Trenurile InterCity moderne oferă locuri confortabile și legături între marile centre urbane ale României.",
    "transport.card1.title": "Călătorie cu trenul",
    "transport.card1.body": "Trenurile CFR leagă majoritatea orașelor din România. Ruta București-Brașov-Cluj este deosebit de pitorească, traversând Carpații. Planifică traseele pe <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">CFR Călători</a>",
    "transport.card2.title": "Autobuze regionale",
    "transport.card2.body": "Companiile private de autobuze leagă orașe mici și sate care nu sunt deservite direct de tren.",
    "transport.card3.title": "Transport urban",
    "transport.card3.body1": "Pentru transportul urban din București, vezi <a href=\"https://www.stb.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Autobuze București</a>",
    "transport.card3.body2": "Pentru serviciul de metrou din București, vizitează <a href=\"https://www.metrorex.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Metrorex</a>",
    "transport.card3.body3": "Orașe mari precum București și Cluj-Napoca oferă transport public, inclusiv autobuze, tramvaie și linii de metrou.",
    "gallery.title": "Galerie",
    "gallery.img1.alt": "Castelul Bran deasupra Carpaților",
    "gallery.img1.caption": "Castelul Bran privind spre Munții Carpați",
    "gallery.img2.alt": "Castelul Peleș în Țara Românească",
    "gallery.img2.caption": "Arhitectura Castelului Peleș la poalele Carpaților",
    "gallery.img3.alt": "Centrul istoric al Sibiului",
    "gallery.img3.caption": "Piața istorică a Sibiului și fațadele sale colorate",
    "gallery.img4.alt": "Exteriorul Mănăstirii Voroneț",
    "gallery.img4.caption": "Mănăstirea Voroneț, cunoscută pentru pereții săi pictați",
    "gallery.img5.alt": "Arhitectura Mănăstirii Sucevița",
    "gallery.img5.caption": "Mănăstirea Sucevița și arhitectura ei monastică fortificată",
    "gallery.img6.alt": "Panoramă din Rarău",
    "gallery.img6.caption": "Priveliște panoramică asupra peisajului montan din Rarău",
    "gallery.img7.alt": "Litoralul Mării Negre la Constanța",
    "gallery.img7.caption": "Faleza din Constanța pe țărmul Mării Negre",
    "gallery.img8.alt": "Arcul de Triumf din București",
    "gallery.img8.caption": "Arcul de Triumf din București",
    "media.title": "Media",
    "media.videoTitle": "Videoclip de călătorie despre România",
    "media.body": "Dacă playerul încorporat nu este disponibil în browserul tău, urmărește direct pe <a href=\"https://www.youtube.com/watch?v=4h4DwufM8xI\" target=\"_blank\" rel=\"noopener noreferrer\">YouTube</a>",
    "contact.title": "Contact și resurse",
    "contact.email": "travel@romaniaroadbook.example",
    "contact.phone": "+40 21 555 1234",
    "contact.address": "Str. Carpaților 15, București 010101",
    "contact.links": "<i class=\"fa-solid fa-link\"></i> Portaluri de transport: <a href=\"https://www.cfrcalatori.ro\" target=\"_blank\" rel=\"noopener noreferrer\">CFR</a>, <a href=\"https://www.metrorex.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">Metrorex</a>, <a href=\"https://www.stb.ro/\" target=\"_blank\" rel=\"noopener noreferrer\">STB</a>",
    "footer.text": "Romania Roadbook | Proiect de site de călătorie responsive",
    "lightbox.close": "Închide vizualizatorul imaginii",
    "language.toggleToRo": "Schimbă în română",
    "language.toggleToEn": "Switch to English",
    "weather.loading": "Se încarcă vremea live",
    "weather.error": "Vremea nu poate fi încărcată acum",
    "weather.updated": "Actualizat",
    "weather.snapshotTitle": "Instantaneu de martie",
    "weather.snapshotBody": "Exemplu de condiții de primăvară în România",
    "weather.offline": "Exemplu pentru modul offline",
    "weather.outfit.cold": "Ia o haină groasă și un fular",
    "weather.outfit.mild": "Poartă o geacă ușoară",
    "weather.outfit.warm": "Poartă tricou și ochelari de soare",
    "theme.enableLight": "Activează tema luminoasă",
    "theme.enableDark": "Activează tema închisă"
  }
};

function t(key) {
  return translations[currentLanguage][key] ?? translations.en[key] ?? key;
}

window.roadbookI18n = {
  t,
  getLanguage: () => currentLanguage
};

function applyTranslations() {
  document.title = t("documentTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const mappings = element.dataset.i18nAttr.split(",");
    mappings.forEach((mapping) => {
      const [attribute, key] = mapping.split(":");
      if (!attribute || !key) return;
      element.setAttribute(attribute.trim(), t(key.trim()));
    });
  });
}

function updateLanguageToggle() {
  if (!langToggle) return;

  const isRomanian = currentLanguage === "ro";
  langToggle.setAttribute("aria-pressed", String(isRomanian));
  langToggle.setAttribute(
    "aria-label",
    isRomanian ? t("language.toggleToEn") : t("language.toggleToRo")
  );
  langToggle.innerHTML = isRomanian
    ? '<span aria-hidden="true">🇷🇴</span>'
    : '<span aria-hidden="true">🇬🇧</span>';
}

function applyLanguage(language) {
  currentLanguage = language === "ro" ? "ro" : "en";
  document.documentElement.lang = currentLanguage;
  localStorage.setItem(languageStorageKey, currentLanguage);
  applyTranslations();
  updateLanguageToggle();
  updateThemeToggleLabel(Boolean(getThemeStylesheet()));

  if (typeof initWeatherWidget === "function") {
    initWeatherWidget();
  }
}

function setupLanguageToggle() {
  if (!langToggle) return;

  const savedLanguage = localStorage.getItem(languageStorageKey);
  applyLanguage(savedLanguage === "ro" ? "ro" : "en");

  langToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "en" ? "ro" : "en");
  });
}

// Keeps the mobile overlay menu pinned directly under the header
function syncMenuPanelOffset() {
  if (!siteHeader) return;
  if (window.innerWidth > 960) {
    siteNav.style.top = "";
    siteNav.style.maxHeight = "";
    return;
  }

  const headerBottom = Math.ceil(siteHeader.getBoundingClientRect().bottom);
  const menuTop = headerBottom + 8;
  siteNav.style.top = `${menuTop}px`;
  siteNav.style.maxHeight = `calc(100vh - ${menuTop + 10}px)`;
}

function setupMobileMenu() {
  if (!menuBtn || !siteNav) return;

  menuBtn.addEventListener("click", () => {
    syncMenuPanelOffset();
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// One-time reveal animation for section panels and cards
function setupFadeIns() {
  const targets = document.querySelectorAll(".fade-in");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  targets.forEach((el) => observer.observe(el));
}

function setupRegionCardFadeIns() {
  const regionCards = document.querySelectorAll(
    "#wallachia .info-card, #transylvania .info-card, #moldova .info-card"
  );

  regionCards.forEach((card, idx) => {
    card.classList.add("fade-in");
    card.style.transitionDelay = `${(idx % 4) * 0.08}s`;
  });
}

// Subtle desktop-only parallax offset for region images
function setupSubtleParallax() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const targets = Array.from(
    document.querySelectorAll("#wallachia .region-gallery img, #transylvania .region-gallery img, #moldova .region-gallery img")
  );
  if (!targets.length) return;

  targets.forEach((img) => img.classList.add("parallax-target"));

  let ticking = false;

  const update = () => {
    if (window.innerWidth <= 960) {
      targets.forEach((img) => img.style.removeProperty("--parallax-y"));
      ticking = false;
      return;
    }

    const mid = window.innerHeight * 0.5;
    targets.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const delta = (mid - rect.top) * 0.04;
      const clamped = Math.max(-14, Math.min(14, delta));
      img.style.setProperty("--parallax-y", `${clamped.toFixed(2)}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function updateThemeToggleLabel(isLightThemeEnabled) {
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(isLightThemeEnabled));
  themeToggle.setAttribute(
    "aria-label",
    isLightThemeEnabled ? t("theme.enableDark") : t("theme.enableLight")
  );
  themeToggle.innerHTML = isLightThemeEnabled
    ? '<span aria-hidden="true">🌙</span>'
    : '<span aria-hidden="true">☀️</span>';
}

function getThemeStylesheet() {
  return document.getElementById(themeStylesheetId);
}

function enableLightTheme() {
  if (getThemeStylesheet()) {
    updateThemeToggleLabel(true);
    return;
  }

  const themeLink = document.createElement("link");
  themeLink.id = themeStylesheetId;
  themeLink.rel = "stylesheet";
  themeLink.href = themeStylesheetHref;
  document.head.appendChild(themeLink);
  updateThemeToggleLabel(true);
}

function disableLightTheme() {
  const themeLink = getThemeStylesheet();
  if (themeLink) {
    themeLink.remove();
  }
  updateThemeToggleLabel(false);
}

function setupThemeToggle() {
  if (!themeToggle) return;

  updateThemeToggleLabel(Boolean(getThemeStylesheet()));

  themeToggle.addEventListener("click", () => {
    if (getThemeStylesheet()) {
      disableLightTheme();
      return;
    }

    enableLightTheme();
  });
}

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "Gallery image";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

// Click image to open, click backdrop/X/Escape to close
function setupGalleryLightbox() {
  if (!galleryGrid || !lightbox || !lightboxImage || !lightboxClose) return;

  galleryGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    openLightbox(target.src, target.alt);
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
}

setupLanguageToggle();
syncMenuPanelOffset();
window.addEventListener("resize", syncMenuPanelOffset);
setupMobileMenu();
setupRegionCardFadeIns();
setupFadeIns();
setupGalleryLightbox();
setupSubtleParallax();
setupThemeToggle();
