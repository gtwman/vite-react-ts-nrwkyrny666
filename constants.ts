import { DayPlan, ActivityType, Restaurant } from './types';

// NOTE: Penghu in late November is windy (Northeast Monsoon).
// Flight: 11/28 17:50 -> 12/01 09:40
// Hotel: 勝國大飯店
// Transport: Car Rental

export const ITINERARY_DATA: DayPlan[] = [
  {
    date: '2025-11-28',
    dayLabel: 'Day 1: 抵達與取車',
    weatherForecast: {
      temp: '20°C - 23°C',
      condition: '多雲強風',
      windScale: '6-7級 (陣風9級)',
      icon: 'windy'
    },
    items: [
      {
        id: 'd1-1',
        time: '17:50',
        title: '搭乘立榮航空 9151 次班機',
        description: '台中清泉崗機場起飛。',
        type: ActivityType.TRANSPORT,
        tips: '記得攜帶駕照（租車用）及身分證件。'
      },
      {
        id: 'd1-2',
        time: '18:35',
        title: '抵達澎湖 & 機場取車',
        description: '於機場櫃檯或接送點辦理租車手續。',
        type: ActivityType.TRANSPORT,
        tips: '【重要】開關車門請務必抓緊，避免被強風吹反折受損。'
      },
      {
        id: 'd1-3',
        time: '19:30',
        title: '入住：勝國大飯店',
        description: '開車前往飯店（周邊有停車格）。',
        type: ActivityType.REST,
        tips: '領取每人$500消費券（需保留入境登機證正本）。',
        location: { name: '勝國大飯店', address: '馬公市水源路2-12號' }
      },
      {
        id: 'd1-4',
        time: '20:00',
        title: '晚餐：三哥酒釀雞排 / 市區覓食',
        description: '開車去買很方便，買回飯店吃最舒服。',
        type: ActivityType.FOOD,
        location: { name: '三哥酒釀雞排' }
      }
    ]
  },
  {
    date: '2025-11-29',
    dayLabel: 'Day 2: 北環自駕 (舒適遊)',
    weatherForecast: {
      temp: '20°C - 23°C',
      condition: '強風',
      windScale: '7-8級 (陣風10級)',
      icon: 'windy'
    },
    items: [
      {
        id: 'd2-1',
        time: '09:00',
        title: '出發北環島',
        description: '汽車自駕優勢：不用吹風！前往白沙鄉。',
        type: ActivityType.TRANSPORT
      },
      {
        id: 'd2-2',
        time: '10:00',
        title: '澎湖水族館',
        description: '非常適合親子的室內景點，完全避風。',
        location: { name: '澎湖水族館' },
        ticketInfo: '全票$300，停車方便',
        type: ActivityType.ACTIVITY
      },
      {
        id: 'd2-3',
        time: '12:30',
        title: '午餐：美東芳牛肉麵',
        description: '澎湖知名牛肉麵，路邊好停車。',
        type: ActivityType.FOOD,
        location: { name: '美東芳牛肉麵' }
      },
      {
        id: 'd2-4',
        time: '14:00',
        title: '跨海大橋 & 易家仙人掌冰',
        description: '下車拍個照，吃冰，風大拍完趕快上車。',
        type: ActivityType.SIGHTSEEING,
        location: { name: '跨海大橋' }
      },
      {
        id: 'd2-5',
        time: '15:00',
        title: '二崁聚落保存區',
        description: '古厝巷弄有擋風效果。必喝二崁杏仁茶。',
        type: ActivityType.SIGHTSEEING
      },
      {
        id: 'd2-6',
        time: '16:30',
        title: '池東大菓葉玄武岩',
        description: '就在馬路邊，不用走遠，適合帶小孩與長輩觀賞。',
        type: ActivityType.SIGHTSEEING
      },
      {
        id: 'd2-7',
        time: '18:30',
        title: '晚餐：雛菊餐桌 (CHUJU)',
        description: '義式料理，環境美氣氛佳。',
        type: ActivityType.FOOD,
        location: { name: '雛菊餐桌' },
        tips: '建議先將車停在縣政府附近停車格再步行前往。'
      }
    ]
  },
  {
    date: '2025-11-30',
    dayLabel: 'Day 3: 東環湖西 & 購物',
    weatherForecast: {
      temp: '21°C - 24°C',
      condition: '多雲時晴',
      windScale: '5-6級',
      icon: 'cloudy'
    },
    items: [
      {
        id: 'd3-1',
        time: '09:30',
        title: '南寮古厝 / 奎壁山摩西分海',
        description: '開車前往湖西鄉。若配合潮汐可看摩西分海，或去南寮看浮球秘境。',
        type: ActivityType.SIGHTSEEING
      },
      {
        id: 'd3-2',
        time: '11:30',
        title: '林投公園 & 及林春咖啡',
        description: '澎湖唯一的森林公園，樹林擋風，有溜滑梯適合小孩放電。',
        type: ActivityType.REST,
        tips: '大人喝咖啡，小孩玩沙。'
      },
      {
        id: 'd3-3',
        time: '13:00',
        title: '午餐：白灣景觀餐廳',
        description: '就在林投公園旁，好停車，義大利麵與燉飯。',
        type: ActivityType.FOOD,
        location: { name: '白灣景觀餐廳' }
      },
      {
        id: 'd3-4',
        time: '15:00',
        title: 'Pier 3 三號港免稅店',
        description: '開車回市區，停車場很大。逛街、Go Star 極限運動場。',
        type: ActivityType.ACTIVITY,
        tips: '使用消費券採買伴手禮。'
      },
      {
        id: 'd3-5',
        time: '17:30',
        title: '馬公老街隨意逛',
        description: '天后宮、四眼井。',
        type: ActivityType.SIGHTSEEING
      },
      {
        id: 'd3-6',
        time: '19:00',
        title: '晚餐：一品無煙燒烤',
        description: '享受澎湖鮮蚵吃到飽。',
        type: ActivityType.FOOD
      }
    ]
  },
  {
    date: '2025-12-01',
    dayLabel: 'Day 4: 早餐與還車',
    weatherForecast: {
      temp: '20°C - 22°C',
      condition: '晴時多雲',
      windScale: '4-5級',
      icon: 'sunny'
    },
    items: [
      {
        id: 'd4-1',
        time: '07:30',
        title: '文康商圈早餐',
        description: '開車停在外圍，步行進去買燒餅、牛雜湯。',
        type: ActivityType.FOOD
      },
      {
        id: 'd4-2',
        time: '08:30',
        title: '前往機場還車',
        description: '預留驗車時間。',
        type: ActivityType.TRANSPORT,
        tips: '記得加滿油。'
      },
      {
        id: 'd4-3',
        time: '09:40',
        title: '搭機返程',
        description: '立榮航空 8636 次班機。',
        type: ActivityType.TRANSPORT
      }
    ]
  }
];

export const RESTAURANT_LIST: Restaurant[] = [
  {
    id: 'r1',
    name: '白灣景觀餐廳',
    tags: ['景觀', '義式', '好停車'],
    description: '位於林投金沙灘旁，有戶外座位與兒童餐，停車非常方便。',
    priceLevel: '$$',
    mustOrder: ['海鮮燉飯', '炸物拼盤'],
    kidFriendly: true
  },
  {
    id: 'r2',
    name: '雛菊餐桌 (CHUJU)',
    tags: ['義式', '網美店', '甜點'],
    description: '森林系裝潢，餐點精緻，披薩與甜點很受小朋友歡迎。',
    priceLevel: '$$',
    mustOrder: ['青醬鮮蝦披薩', '可愛造型棉花糖飲品'],
    kidFriendly: true
  },
  {
    id: 'r3',
    name: '及林春咖啡館',
    tags: ['咖啡', '林投公園', '下午茶'],
    description: '藏在森林裡的玻璃屋咖啡廳，旁邊就是溜滑梯。',
    priceLevel: '$',
    mustOrder: ['手沖咖啡', '檸檬塔'],
    kidFriendly: true
  },
  {
    id: 'r4',
    name: '美東芳牛肉麵',
    tags: ['牛肉麵', '北環', '路邊好停'],
    description: '湯頭濃郁，花干與滷味是必點。',
    priceLevel: '$',
    mustOrder: ['牛肉麵', '綜合滷味'],
    kidFriendly: true
  },
  {
    id: 'r5',
    name: '一品無煙燒烤',
    tags: ['燒烤', '吃到飽', '晚餐'],
    description: '適合大家庭聚餐，享受澎湖海鮮。',
    priceLevel: '$$',
    mustOrder: ['烤鮮蚵', '小管'],
    kidFriendly: true
  }
];