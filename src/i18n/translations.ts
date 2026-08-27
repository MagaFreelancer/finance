export type Locale = 'ru' | 'en' | 'ar' | 'tr'

export const localeMeta: {
  code: Locale
  label: string
  native: string
  dir: 'ltr' | 'rtl'
  bcp47: string
}[] = [
  { code: 'ru', label: 'RU', native: 'Русский', dir: 'ltr', bcp47: 'ru-RU' },
  { code: 'en', label: 'EN', native: 'English', dir: 'ltr', bcp47: 'en-US' },
  // { code: 'ar', label: 'AR', native: 'العربية', dir: 'rtl', bcp47: 'ar' },
  // { code: 'tr', label: 'TR', native: 'Türkçe', dir: 'ltr', bcp47: 'tr-TR' },
]

const ru = {
  brand: 'Амана',
  metaTitle: 'Амана — исламская рассрочка',
  metaDescription:
    'Амана — исламская рассрочка без процентов и скрытых комиссий. Честное финансирование покупок.',
  header: {
    navAria: 'Основная навигация',
    mobileAria: 'Мобильная навигация',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    about: 'О сервисе',
    how: 'Как это работает',
    products: 'Товары',
    principles: 'Принципы',
    faq: 'FAQ',
    calculate: 'Рассчитать рассрочку',
    language: 'Язык',
  },
  hero: {
    eyebrow: 'Исламское финансирование',
    title: 'Исламская рассрочка',
    titleAccent: 'честно и прозрачно.',
    lead: 'Финансирование покупок без процентов и скрытых комиссий, в соответствии с принципами исламского финансирования.',
    cta: 'Рассчитать рассрочку',
    secondary: 'Как это работает',
  },
  charts: {
    monthly: 'Ежемесячный платёж',
    schedule: 'График платежей',
    split: 'Структура суммы',
    down: 'Взнос',
    financed: 'Рассрочка',
    remaining: 'Остаток',
    month: 'мес.',
    hoverBar: 'Наведите на столбец',
    term: 'Срок',
    downShare: 'Взнос',
  },
  benefits: {
    eyebrow: 'О сервисе',
    title: 'Честная рассрочка без лишнего',
    subtitle:
      'Амана помогает оформить покупку прозрачно: вы видите сумму, срок и платёж ещё до подачи заявки.',
    items: [
      {
        title: 'Без процентов',
        text: 'Прозрачные условия без начисления процентов и скрытых переплат.',
      },
      {
        title: 'По принципам шариата',
        text: 'Финансирование строится с учётом принципов исламского финансирования.',
      },
      {
        title: 'Прозрачные условия',
        text: 'Вы заранее понимаете стоимость покупки и график платежей.',
      },
      {
        title: 'Просто и удобно',
        text: 'Минимум действий: рассчитайте рассрочку и отправьте заявку онлайн.',
      },
    ],
  },
  how: {
    eyebrow: 'Процесс',
    title: 'Как это работает',
    subtitle:
      'Четыре понятных шага от расчёта до решения — без лишних форм и сложных условий.',
    steps: [
      {
        title: 'Выберите товар или услугу',
        text: 'Определите покупку и её стоимость — в магазине, онлайн или у партнёра.',
      },
      {
        title: 'Рассчитайте рассрочку',
        text: 'Укажите сумму, взнос и удобный срок в калькуляторе — платёж обновится сразу.',
      },
      {
        title: 'Отправьте заявку',
        text: 'Заполните короткую форму: товар, место покупки, ФИО и телефон.',
      },
      {
        title: 'Получите решение',
        text: 'Мы свяжемся с вами и подтвердим условия финансирования.',
      },
    ],
  },
  video: {
    eyebrow: 'Видео',
    title: 'Посмотрите, как устроена рассрочка',
    subtitle:
      'Коротко о сервисе: прозрачные условия, понятный расчёт и заявка без лишних шагов.',
    clipTitle: 'Амана за 60 секунд',
    watch: 'Смотреть видео',
    click: 'Нажмите, чтобы смотреть',
  },
  principles: {
    eyebrow: 'Принципы',
    title: 'Финансирование, которому можно доверять',
    subtitle:
      'Амана ориентирована на спокойный и понятный формат рассрочки — без процентной ставки и без давления.',
    items: [
      {
        title: 'Без риба',
        text: 'Мы не используем процентную модель. Стоимость сделки фиксируется заранее.',
      },
      {
        title: 'Прозрачность',
        text: 'Вы видите сумму покупки, срок и ежемесячный платёж до отправки заявки.',
      },
      {
        title: 'Договорённость сторон',
        text: 'Условия согласуются открыто — без скрытых комиссий и неожиданных начислений.',
      },
    ],
  },
  products: {
    eyebrow: 'Каталог',
    title: 'Самые покупаемые товары',
    subtitle:
      'Выберите товар и оформите заявку — название подставится в форму автоматически.',
    apply: 'Оформить заявку',
    empty: 'Товары скоро появятся в этом разделе.',
    error: 'Не удалось загрузить товары',
  },
  calculator: {
    eyebrow: 'Калькулятор',
    title: 'Рассчитайте рассрочку',
    subtitle:
      'Укажите стоимость покупки, взнос и удобный срок — затем сразу отправьте заявку.',
    amount: 'Сумма покупки',
    amountAria: 'Сумма покупки, ползунок',
    down: 'Первоначальный взнос',
    downAria: 'Первоначальный взнос, ползунок',
    term: 'Срок рассрочки',
    termAria: 'Срок рассрочки, ползунок',
    monthsShort: 'мес.',
    monthly: 'Ежемесячный платёж',
    lastPayment: 'Последний платёж',
    cost: 'Стоимость покупки',
    percent: 'Итоговый процент',
    paymentsCount: 'Количество платежей',
    total: 'Общая сумма',
    formTitle: 'Оставить заявку',
    formLead: 'Данные расчёта будут прикреплены автоматически.',
    productName: 'Наименование товара или услуги',
    productPlaceholder: 'Например, смартфон',
    purchasePlace: 'Место покупки',
    purchasePlaceholder: 'Магазин или сайт',
    fullName: 'Ваше ФИО',
    fullNamePlaceholder: 'Иванов Иван Иванович',
    phone: 'Личный телефон',
    submit: 'Отправить заявку',
    submitting: 'Отправляем…',
    successTitle: 'Заявка успешно отправлена',
    successText: 'Мы свяжемся с вами в ближайшее время.',
    another: 'Отправить ещё одну заявку',
    toastOk: 'Заявка успешно отправлена',
    toastFail: 'Не удалось отправить заявку. Попробуйте ещё раз.',
  },
  errors: {
    productName: 'Укажите наименование товара или услуги',
    purchasePlace: 'Укажите место покупки',
    fullName: 'Укажите ваше ФИО',
    fullNameShort: 'Введите фамилию и имя',
    phone: 'Укажите номер телефона',
    phoneInvalid: 'Введите корректный номер телефона',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Частые вопросы',
    subtitle:
      'Коротко о главном — если останутся вопросы, напишите нам после заявки.',
    items: [
      {
        q: 'Что такое исламская рассрочка?',
        a: 'Это способ финансирования покупки без начисления процентов. Стоимость и график платежей известны заранее и согласуются прозрачно.',
      },
      {
        q: 'Есть ли скрытые комиссии?',
        a: 'Нет. Калькулятор показывает стоимость покупки, взнос, срок и ежемесячный платёж. Итоговая сумма зависит от выбранного процента сервиса.',
      },
      {
        q: 'Как быстро рассматривают заявку?',
        a: 'Обычно мы связываемся в течение рабочего дня после отправки заявки, чтобы уточнить детали и сообщить решение.',
      },
      {
        q: 'Какие покупки можно оформить?',
        a: 'Технику, мебель, услуги и другие легальные покупки в рамках лимитов сервиса. Точные условия подтверждаются после заявки.',
      },
    ],
  },
  footer: {
    about:
      'Прозрачное финансирование покупок в соответствии с принципами исламского финансирования.',
    nav: 'Навигация',
    contacts: 'Контакты',
    hours: 'Ежедневно, 9:00–21:00',
    calculate: 'Рассчитать',
    rights: '© 2026. Все права защищены.',
    partners: 'Для партнёров',
  },
}

export type Dictionary = typeof ru

const en: Dictionary = {
  brand: 'Amana',
  metaTitle: 'Amana — Islamic installment',
  metaDescription:
    'Amana — Islamic installment without interest or hidden fees. Transparent purchase financing.',
  header: {
    navAria: 'Main navigation',
    mobileAria: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    about: 'About',
    how: 'How it works',
    products: 'Products',
    principles: 'Principles',
    faq: 'FAQ',
    calculate: 'Calculate installment',
    language: 'Language',
  },
  hero: {
    eyebrow: 'Islamic finance',
    title: 'Islamic installment',
    titleAccent: 'honest and transparent.',
    lead: 'Purchase financing without interest or hidden fees, in line with Islamic finance principles.',
    cta: 'Calculate installment',
    secondary: 'How it works',
  },
  charts: {
    monthly: 'Monthly payment',
    schedule: 'Payment schedule',
    split: 'Amount split',
    down: 'Down payment',
    financed: 'Financed',
    remaining: 'Balance',
    month: 'mo.',
    hoverBar: 'Hover a bar',
    term: 'Term',
    downShare: 'Down payment',
  },
  benefits: {
    eyebrow: 'About',
    title: 'Fair installment, nothing extra',
    subtitle:
      'Amana helps you buy transparently: you see the amount, term and payment before applying.',
    items: [
      {
        title: 'No interest',
        text: 'Clear terms without interest charges or hidden overpayments.',
      },
      {
        title: 'Shariah principles',
        text: 'Financing is structured around Islamic finance principles.',
      },
      {
        title: 'Transparent terms',
        text: 'You know the purchase cost and payment schedule in advance.',
      },
      {
        title: 'Simple and convenient',
        text: 'Calculate the installment and send an application online in a few steps.',
      },
    ],
  },
  how: {
    eyebrow: 'Process',
    title: 'How it works',
    subtitle:
      'Four clear steps from calculation to a decision — no extra forms or complex terms.',
    steps: [
      {
        title: 'Choose a product or service',
        text: 'Decide on the purchase and its price — in a store, online or with a partner.',
      },
      {
        title: 'Calculate the installment',
        text: 'Enter the amount, down payment and term — the payment updates instantly.',
      },
      {
        title: 'Send an application',
        text: 'Fill in a short form: product, place of purchase, full name and phone.',
      },
      {
        title: 'Get a decision',
        text: 'We will contact you and confirm the financing terms.',
      },
    ],
  },
  video: {
    eyebrow: 'Video',
    title: 'See how the installment works',
    subtitle:
      'A short look at the service: transparent terms, a clear calculation and a simple application.',
    clipTitle: 'Amana in 60 seconds',
    watch: 'Watch video',
    click: 'Click to watch',
  },
  principles: {
    eyebrow: 'Principles',
    title: 'Financing you can trust',
    subtitle:
      'Amana is built for a calm, understandable installment — without an interest rate and without pressure.',
    items: [
      {
        title: 'No riba',
        text: 'We do not use an interest model. The deal cost is fixed in advance.',
      },
      {
        title: 'Transparency',
        text: 'You see the purchase amount, term and monthly payment before applying.',
      },
      {
        title: 'Mutual agreement',
        text: 'Terms are agreed openly — no hidden fees or unexpected charges.',
      },
    ],
  },
  products: {
    eyebrow: 'Catalog',
    title: 'Best-selling products',
    subtitle:
      'Choose a product and apply — its name will be filled in the form automatically.',
    apply: 'Apply now',
    empty: 'Products will appear in this section soon.',
    error: 'Could not load products',
  },
  calculator: {
    eyebrow: 'Calculator',
    title: 'Calculate your installment',
    subtitle:
      'Enter the purchase price, down payment and term — then send an application right away.',
    amount: 'Purchase amount',
    amountAria: 'Purchase amount slider',
    down: 'Down payment',
    downAria: 'Down payment slider',
    term: 'Installment term',
    termAria: 'Installment term slider',
    monthsShort: 'mo.',
    monthly: 'Monthly payment',
    lastPayment: 'Last payment',
    cost: 'Purchase cost',
    percent: 'Total percent',
    paymentsCount: 'Number of payments',
    total: 'Total amount',
    formTitle: 'Leave an application',
    formLead: 'Calculation details will be attached automatically.',
    productName: 'Product or service name',
    productPlaceholder: 'e.g. smartphone',
    purchasePlace: 'Place of purchase',
    purchasePlaceholder: 'Store or website',
    fullName: 'Full name',
    fullNamePlaceholder: 'John Smith',
    phone: 'Phone number',
    submit: 'Send application',
    submitting: 'Sending…',
    successTitle: 'Application sent',
    successText: 'We will contact you shortly.',
    another: 'Send another application',
    toastOk: 'Application sent successfully',
    toastFail: 'Could not send the application. Please try again.',
  },
  errors: {
    productName: 'Enter the product or service name',
    purchasePlace: 'Enter the place of purchase',
    fullName: 'Enter your full name',
    fullNameShort: 'Enter first and last name',
    phone: 'Enter a phone number',
    phoneInvalid: 'Enter a valid phone number',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'The essentials — if you still have questions, write to us after applying.',
    items: [
      {
        q: 'What is Islamic installment?',
        a: 'A way to finance a purchase without charging interest. The cost and payment schedule are known in advance and agreed transparently.',
      },
      {
        q: 'Are there hidden fees?',
        a: 'No. The calculator shows the purchase cost, down payment, term and monthly payment. The total depends on the service percent set by the admin.',
      },
      {
        q: 'How fast is the application reviewed?',
        a: 'We usually get in touch within a business day after you apply to clarify details and share a decision.',
      },
      {
        q: 'What purchases can I finance?',
        a: 'Electronics, furniture, services and other legal purchases within service limits. Exact terms are confirmed after the application.',
      },
    ],
  },
  footer: {
    about:
      'Transparent purchase financing in accordance with Islamic finance principles.',
    nav: 'Navigation',
    contacts: 'Contacts',
    hours: 'Daily, 9:00–21:00',
    calculate: 'Calculate',
    rights: '© 2026. All rights reserved.',
    partners: 'For partners',
  },
}

const ar: Dictionary = {
  brand: 'أمانة',
  metaTitle: 'أمانة — تقسيط إسلامي',
  metaDescription:
    'أمانة — تقسيط إسلامي بدون فوائد أو رسوم مخفية. تمويل شفاف للمشتريات.',
  header: {
    navAria: 'التنقل الرئيسي',
    mobileAria: 'تنقل الجوال',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    about: 'عن الخدمة',
    how: 'كيف يعمل',
    products: 'المنتجات',
    principles: 'المبادئ',
    faq: 'الأسئلة',
    calculate: 'احسب التقسيط',
    language: 'اللغة',
  },
  hero: {
    eyebrow: 'تمويل إسلامي',
    title: 'تقسيط إسلامي',
    titleAccent: 'بوضوح وأمانة.',
    lead: 'تمويل المشتريات بدون فوائد أو رسوم مخفية، وفق مبادئ التمويل الإسلامي.',
    cta: 'احسب التقسيط',
    secondary: 'كيف يعمل',
  },
  charts: {
    monthly: 'القسط الشهري',
    schedule: 'جدول الأقساط',
    split: 'توزيع المبلغ',
    down: 'الدفعة الأولى',
    financed: 'التقسيط',
    remaining: 'المتبقي',
    month: 'شهر',
    hoverBar: 'مرّر فوق العمود',
    term: 'المدة',
    downShare: 'الدفعة',
  },
  benefits: {
    eyebrow: 'عن الخدمة',
    title: 'تقسيط عادل دون زيادة خفية',
    subtitle:
      'تساعدك أمانة على الشراء بوضوح: ترى المبلغ والمدة والقسط قبل تقديم الطلب.',
    items: [
      {
        title: 'بدون فوائد',
        text: 'شروط واضحة دون فوائد أو زيادات مخفية.',
      },
      {
        title: 'وفق الشريعة',
        text: 'يُبنى التمويل على مبادئ التمويل الإسلامي.',
      },
      {
        title: 'شروط شفافة',
        text: 'تعرف تكلفة الشراء وجدول الأقساط مسبقاً.',
      },
      {
        title: 'سهل ومريح',
        text: 'احسب التقسيط وأرسل الطلب عبر الإنترنت بخطوات قليلة.',
      },
    ],
  },
  how: {
    eyebrow: 'الخطوات',
    title: 'كيف يعمل',
    subtitle: 'أربع خطوات واضحة من الحساب إلى القرار — بلا نماذج زائدة.',
    steps: [
      {
        title: 'اختر المنتج أو الخدمة',
        text: 'حدد الشراء وسعره — في المتجر أو عبر الإنترنت أو لدى شريك.',
      },
      {
        title: 'احسب التقسيط',
        text: 'أدخل المبلغ والدفعة الأولى والمدة — يتحدث القسط فوراً.',
      },
      {
        title: 'أرسل الطلب',
        text: 'املأ نموذجاً قصيراً: المنتج ومكان الشراء والاسم والهاتف.',
      },
      {
        title: 'احصل على القرار',
        text: 'سنتواصل معك ونؤكد شروط التمويل.',
      },
    ],
  },
  video: {
    eyebrow: 'فيديو',
    title: 'شاهد كيف يعمل التقسيط',
    subtitle: 'نبذة قصيرة عن الخدمة: شروط واضحة وحساب مفهوم وطلب بسيط.',
    clipTitle: 'أمانة في 60 ثانية',
    watch: 'مشاهدة الفيديو',
    click: 'انقر للمشاهدة',
  },
  principles: {
    eyebrow: 'المبادئ',
    title: 'تمويل يمكن الوثوق به',
    subtitle: 'أمانة لتقسيط هادئ ومفهوم — بدون فائدة وبدون ضغط.',
    items: [
      {
        title: 'بدون ربا',
        text: 'لا نستخدم نموذج الفائدة. تُثبت تكلفة الصفقة مسبقاً.',
      },
      {
        title: 'الشفافية',
        text: 'ترى مبلغ الشراء والمدة والقسط الشهري قبل إرسال الطلب.',
      },
      {
        title: 'اتفاق الطرفين',
        text: 'تُتفق الشروط بوضوح — دون رسوم مخفية أو زيادات مفاجئة.',
      },
    ],
  },
  products: {
    eyebrow: 'الكتالوج',
    title: 'الأكثر شراءً',
    subtitle: 'اختر المنتج وقدّم طلباً — سيُملأ الاسم في النموذج تلقائياً.',
    apply: 'تقديم طلب',
    empty: 'ستظهر المنتجات في هذا القسم قريباً.',
    error: 'تعذر تحميل المنتجات',
  },
  calculator: {
    eyebrow: 'الحاسبة',
    title: 'احسب التقسيط',
    subtitle: 'أدخل سعر الشراء والدفعة الأولى والمدة ثم أرسل الطلب مباشرة.',
    amount: 'مبلغ الشراء',
    amountAria: 'شريط مبلغ الشراء',
    down: 'الدفعة الأولى',
    downAria: 'شريط الدفعة الأولى',
    term: 'مدة التقسيط',
    termAria: 'شريط مدة التقسيط',
    monthsShort: 'شهر',
    monthly: 'القسط الشهري',
    lastPayment: 'القسط الأخير',
    cost: 'تكلفة الشراء',
    percent: 'النسبة النهائية',
    paymentsCount: 'عدد الأقساط',
    total: 'المبلغ الإجمالي',
    formTitle: 'اترك طلباً',
    formLead: 'ستُرفق بيانات الحساب تلقائياً.',
    productName: 'اسم المنتج أو الخدمة',
    productPlaceholder: 'مثلاً: هاتف ذكي',
    purchasePlace: 'مكان الشراء',
    purchasePlaceholder: 'متجر أو موقع',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'محمد أحمد علي',
    phone: 'رقم الهاتف',
    submit: 'إرسال الطلب',
    submitting: 'جارٍ الإرسال…',
    successTitle: 'تم إرسال الطلب',
    successText: 'سنتواصل معك قريباً.',
    another: 'إرسال طلب آخر',
    toastOk: 'تم إرسال الطلب بنجاح',
    toastFail: 'تعذر إرسال الطلب. حاول مرة أخرى.',
  },
  errors: {
    productName: 'أدخل اسم المنتج أو الخدمة',
    purchasePlace: 'أدخل مكان الشراء',
    fullName: 'أدخل اسمك الكامل',
    fullNameShort: 'أدخل الاسم واللقب',
    phone: 'أدخل رقم الهاتف',
    phoneInvalid: 'أدخل رقم هاتف صالحاً',
  },
  faq: {
    eyebrow: 'الأسئلة',
    title: 'الأسئلة الشائعة',
    subtitle: 'أهم الإجابات — وإن بقي سؤال فاكتب لنا بعد تقديم الطلب.',
    items: [
      {
        q: 'ما هو التقسيط الإسلامي؟',
        a: 'طريقة لتمويل الشراء دون فوائد. تُعرف التكلفة وجدول الأقساط مسبقاً وتُتفق بشفافية.',
      },
      {
        q: 'هل هناك رسوم مخفية؟',
        a: 'لا. تُظهر الحاسبة تكلفة الشراء والدفعة والمدة والقسط الشهري. الإجمالي يعتمد على النسبة التي يحددها المسؤول.',
      },
      {
        q: 'كم يستغرق مراجعة الطلب؟',
        a: 'عادة نتواصل خلال يوم عمل بعد إرسال الطلب لتوضيح التفاصيل وإبلاغ القرار.',
      },
      {
        q: 'ما المشتريات التي يمكن تمويلها؟',
        a: 'الأجهزة والأثاث والخدمات ومشتريات قانونية أخرى ضمن حدود الخدمة. تُؤكد الشروط بعد الطلب.',
      },
    ],
  },
  footer: {
    about: 'تمويل شفاف للمشتريات وفق مبادئ التمويل الإسلامي.',
    nav: 'التنقل',
    contacts: 'التواصل',
    hours: 'يومياً، 9:00–21:00',
    calculate: 'احسب',
    rights: '© 2026. جميع الحقوق محفوظة.',
    partners: 'للشركاء',
  },
}

const tr: Dictionary = {
  brand: 'Amana',
  metaTitle: 'Amana — İslami taksit',
  metaDescription:
    'Amana — faizsiz ve gizli ücretsiz İslami taksit. Şeffaf alışveriş finansmanı.',
  header: {
    navAria: 'Ana gezinme',
    mobileAria: 'Mobil gezinme',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    about: 'Hizmet hakkında',
    how: 'Nasıl çalışır',
    products: 'Ürünler',
    principles: 'İlkeler',
    faq: 'SSS',
    calculate: 'Taksiti hesapla',
    language: 'Dil',
  },
  hero: {
    eyebrow: 'İslami finans',
    title: 'İslami taksit',
    titleAccent: 'dürüst ve şeffaf.',
    lead: 'Faiz ve gizli ücret olmadan, İslami finans ilkelerine uygun alışveriş finansmanı.',
    cta: 'Taksiti hesapla',
    secondary: 'Nasıl çalışır',
  },
  charts: {
    monthly: 'Aylık ödeme',
    schedule: 'Ödeme planı',
    split: 'Tutar dağılımı',
    down: 'Peşinat',
    financed: 'Taksit',
    remaining: 'Kalan',
    month: 'ay',
    hoverBar: 'Çubuğun üzerine gelin',
    term: 'Vade',
    downShare: 'Peşinat',
  },
  benefits: {
    eyebrow: 'Hizmet hakkında',
    title: 'Dürüst taksit, fazlası yok',
    subtitle:
      'Amana alışverişi şeffaf yapar: tutarı, vade ve ödemeyi başvurudan önce görürsünüz.',
    items: [
      {
        title: 'Faiz yok',
        text: 'Faiz ve gizli fazla ödemeler olmadan net koşullar.',
      },
      {
        title: 'Şeriat ilkeleri',
        text: 'Finansman İslami finans ilkelerine göre yapılandırılır.',
      },
      {
        title: 'Şeffaf koşullar',
        text: 'Alışveriş bedelini ve ödeme planını önceden bilirsiniz.',
      },
      {
        title: 'Basit ve kolay',
        text: 'Taksiti hesaplayın ve başvuruyu birkaç adımda online gönderin.',
      },
    ],
  },
  how: {
    eyebrow: 'Süreç',
    title: 'Nasıl çalışır',
    subtitle:
      'Hesaptan karara dört net adım — gereksiz formlar ve karmaşık şartlar yok.',
    steps: [
      {
        title: 'Ürün veya hizmet seçin',
        text: 'Alışverişi ve fiyatını belirleyin — mağazada, online veya partnerde.',
      },
      {
        title: 'Taksiti hesaplayın',
        text: 'Tutarı, peşinatı ve vade süresini girin — ödeme anında güncellenir.',
      },
      {
        title: 'Başvuru gönderin',
        text: 'Kısa formu doldurun: ürün, alış yeri, ad soyad ve telefon.',
      },
      {
        title: 'Kararı alın',
        text: 'Sizinle iletişime geçip finansman koşullarını onaylarız.',
      },
    ],
  },
  video: {
    eyebrow: 'Video',
    title: 'Taksitin nasıl işlediğini görün',
    subtitle:
      'Hizmete kısa bakış: şeffaf koşullar, net hesaplama ve basit başvuru.',
    clipTitle: '60 saniyede Amana',
    watch: 'Videoyu izle',
    click: 'İzlemek için tıklayın',
  },
  principles: {
    eyebrow: 'İlkeler',
    title: 'Güvenilir finansman',
    subtitle:
      'Amana sakin ve anlaşılır taksit için tasarlandı — faiz oranı ve baskı olmadan.',
    items: [
      {
        title: 'Riba yok',
        text: 'Faiz modeli kullanmayız. İşlem bedeli önceden sabitlenir.',
      },
      {
        title: 'Şeffaflık',
        text: 'Başvurudan önce tutarı, vade ve aylık ödemeyi görürsünüz.',
      },
      {
        title: 'Karşılıklı anlaşma',
        text: 'Koşullar açıkça belirlenir — gizli ücret veya sürpriz yok.',
      },
    ],
  },
  products: {
    eyebrow: 'Katalog',
    title: 'En çok alınan ürünler',
    subtitle:
      'Ürünü seçin ve başvurun — adı forma otomatik yazılır.',
    apply: 'Başvuru yap',
    empty: 'Ürünler bu bölümde yakında görünecek.',
    error: 'Ürünler yüklenemedi',
  },
  calculator: {
    eyebrow: 'Hesaplayıcı',
    title: 'Taksitinizi hesaplayın',
    subtitle:
      'Alış fiyatını, peşinatı ve vade süresini girin — ardından hemen başvuru gönderin.',
    amount: 'Alış tutarı',
    amountAria: 'Alış tutarı kaydırıcısı',
    down: 'Peşinat',
    downAria: 'Peşinat kaydırıcısı',
    term: 'Taksit süresi',
    termAria: 'Taksit süresi kaydırıcısı',
    monthsShort: 'ay',
    monthly: 'Aylık ödeme',
    lastPayment: 'Son ödeme',
    cost: 'Alış bedeli',
    percent: 'Toplam yüzde',
    paymentsCount: 'Ödeme sayısı',
    total: 'Toplam tutar',
    formTitle: 'Başvuru bırakın',
    formLead: 'Hesaplama verileri otomatik eklenir.',
    productName: 'Ürün veya hizmet adı',
    productPlaceholder: 'Örn. akıllı telefon',
    purchasePlace: 'Alış yeri',
    purchasePlaceholder: 'Mağaza veya site',
    fullName: 'Ad soyad',
    fullNamePlaceholder: 'Ahmet Yılmaz',
    phone: 'Telefon',
    submit: 'Başvuruyu gönder',
    submitting: 'Gönderiliyor…',
    successTitle: 'Başvuru gönderildi',
    successText: 'Kısa süre içinde sizinle iletişime geçeceğiz.',
    another: 'Başka başvuru gönder',
    toastOk: 'Başvuru başarıyla gönderildi',
    toastFail: 'Başvuru gönderilemedi. Lütfen tekrar deneyin.',
  },
  errors: {
    productName: 'Ürün veya hizmet adını girin',
    purchasePlace: 'Alış yerini girin',
    fullName: 'Adınızı soyadınızı girin',
    fullNameShort: 'Ad ve soyad girin',
    phone: 'Telefon numarası girin',
    phoneInvalid: 'Geçerli bir telefon numarası girin',
  },
  faq: {
    eyebrow: 'SSS',
    title: 'Sık sorulan sorular',
    subtitle:
      'Kısaca en önemlileri — sorunuz kalırsa başvurudan sonra bize yazın.',
    items: [
      {
        q: 'İslami taksit nedir?',
        a: 'Faiz alınmadan alışverişi finanse etme yoludur. Maliyet ve ödeme planı önceden bilinir ve şeffafça anlaşılır.',
      },
      {
        q: 'Gizli ücret var mı?',
        a: 'Hayır. Hesaplayıcı alış bedelini, peşinatı, vade ve aylık ödemeyi gösterir. Toplam, yöneticinin belirlediği yüzdeye bağlıdır.',
      },
      {
        q: 'Başvuru ne kadar sürede incelenir?',
        a: 'Genellikle başvurudan sonraki iş günü içinde detayları netleştirmek ve kararı bildirmek için sizinle iletişime geçeriz.',
      },
      {
        q: 'Hangi alışverişler finanse edilir?',
        a: 'Elektronik, mobilya, hizmetler ve limitler dahilindeki diğer yasal alışverişler. Kesin koşullar başvurudan sonra onaylanır.',
      },
    ],
  },
  footer: {
    about: 'İslami finans ilkelerine uygun şeffaf alışveriş finansmanı.',
    nav: 'Gezinme',
    contacts: 'İletişim',
    hours: 'Her gün, 9:00–21:00',
    calculate: 'Hesapla',
    rights: '© 2026. Tüm hakları saklıdır.',
    partners: 'İş ortakları için',
  },
}

export const dictionaries: Record<Locale, Dictionary> = { ru, en, ar, tr }
