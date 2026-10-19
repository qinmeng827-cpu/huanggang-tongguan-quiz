/**
 * 黄冈通关考　答对就出发！
 * Pure static quiz — no backend
 */
(function () {
  "use strict";

  const STORAGE = {
    DONE: "hg_tongguan_done_v1",
    VOUCHER: "hg_tongguan_voucher_v1",
    PHONE: "hg_tongguan_phone_v1",
  };

  /* ========== Question bank (exact from activity doc) ========== */
  const WARMUP = {
    id: "warmup",
    gate: "热身题",
    gateFull: "热身题 · 黄冈有多近",
    q: "从武汉乘坐高铁（城际）出发，大约多长时间可以抵达黄冈？",
    options: ["约30分钟", "约1小时", "约2小时"],
    answer: 0,
    explain:
      "武汉到黄冈已实现「公交化」出行——从武汉东站乘坐「新城快线」，20多分钟直达黄冈西站，班次密集、可刷武汉通进站，像坐地铁一样方便；从武汉站乘城际列车，约25分钟到黄冈西、约35分钟到黄冈东，是「武汉1小时度假圈」。不止黄冈主城。2022年黄黄高铁通车后，黄冈沿线全面迈入高铁时代：红安西约22分钟、麻城北约32分钟、浠水南约50分钟、蕲春南约1小时、武穴北约1小时20分钟、黄梅东约1小时30分钟——黄冈十个县市区中，七个可以坐高铁从武汉1小时左右直达。",
  };

  const LEVELS = [
    {
      gate: "东坡关",
      place: "黄州",
      bank: [
        {
          q: "苏东坡谪居黄州期间写下750余篇作品。下列哪一部是苏东坡在黄州期间的作品？",
          options: ["《江城子·密州出猎》", "《赤壁赋》", "《水调歌头·明月几时有》"],
          answer: 1,
          explain:
            "公元1082年，被贬黄州的苏东坡泛舟赤壁，写下《前赤壁赋》《后赤壁赋》与《念奴娇·赤壁怀古》。黄州是苏东坡文学创作的高峰之地，四年零四个月间留下七百余篇作品。今天的黄冈东坡赤壁景区，正是当年「大江东去」的诞生地。",
        },
        {
          q: "苏东坡贬谪黄州期间在东坡开荒筑室，并自号什么？",
          options: ["青莲居士", "六一居士", "东坡居士"],
          answer: 2,
          explain:
            "苏东坡贬谪黄州期间，在城东荒坡开荒种地、筑「雪堂」定居，并自号「东坡居士」。黄州成就了苏东坡，也因他留下延续千年的文脉，今黄冈东坡赤壁、遗爱湖等地仍留有他的足迹。",
        },
        {
          q: "「大江东去，浪淘尽，千古风流人物」出自苏东坡哪首词？",
          options: ["《念奴娇·赤壁怀古》", "《水调歌头》", "《江城子》"],
          answer: 0,
          explain:
            "这首词写于黄州赤壁，被誉为「千古绝唱」，也让黄州赤壁成为与三国赤壁齐名的文化地标。今黄冈东坡赤壁景区即因此得名，是黄州最核心的文化打卡地。",
        },
      ],
    },
    {
      gate: "崎山关",
      place: "团风",
      bank: [
        {
          q: "团风县牛车河环库路获评了哪项全国性荣誉？",
          options: ["2024年全国十条最美自驾路", "全国最美乡村公路", "国家风景道"],
          answer: 0,
          explain:
            "团风牛车河环库公路于2024年入选全国十条最美自驾路，沿湖蜿蜒、串起岛屿与村落，是华中地区新兴的自驾与骑行目的地，一年四季皆有风景。",
        },
        {
          q: "团风县牛车河素有什么美誉？",
          options: ["鄂东小三峡", "鄂东千岛湖", "鄂东第一湖"],
          answer: 1,
          explain:
            "牛车河水库水域辽阔，库汊纵横、岛屿星罗棋布，素有「鄂东千岛湖」之称。环湖生态良好，四季景色各异，是团风文旅的核心资源。",
        },
        {
          q: "团风县大崎山森林公园主峰海拔约为多少？",
          options: ["1040米", "500米", "2000米"],
          answer: 0,
          explain:
            "大崎山主峰海拔约1040米，山中龙王顶、狮子包等景点密布，森林茂密、云雾常绕，夏季凉爽宜人，是团风登山避暑的好去处。",
        },
      ],
    },
    {
      gate: "将军关",
      place: "红安",
      bank: [
        {
          q: "红安县是全国闻名的「将军县」，它因何得名？",
          options: ["驻军数量最多", "古代名将故乡", "走出两百多位将军"],
          answer: 2,
          explain:
            "红安是「中国第一将军县」，从这里走出了两百多位共和国将军，被誉为「将军的摇篮」。境内七里坪长胜街、黄麻起义和鄂豫皖苏区革命烈士陵园等红色遗迹保存完好，是全国红色旅游经典景区。",
        },
        {
          q: "红安县七里坪镇有一条被誉为「中国革命第一街」的老街，名叫？",
          options: ["长胜街", "胜利街", "红军街"],
          answer: 0,
          explain:
            "七里坪长胜街始建于明代，全长约六百米，青石板路、徽派老屋保存完好，曾是鄂豫皖革命根据地的中心，被誉为「中国革命第一街」，为全国重点文物保护单位。",
        },
        {
          q: "红安「黄安古城·红安影视幻城」首创的观演模式是什么？",
          options: ["室内剧场演出", "固定座位驻场演出", "行浸式实景演艺，全景区即舞台、边走边看"],
          answer: 2,
          explain:
            "影视幻城由原影视拍摄基地拓展为占地278亩的文旅度假区，1:1复原大革命时期古黄安县城。核心演艺《红安·红安》首创「行浸式」观演模式，观众随演员移步换景，从历史的「旁观者」变为革命烽火的「亲历者」。景区已列入国家4A级旅游景区创建名单。",
        },
      ],
    },
    {
      gate: "杜鹃关",
      place: "麻城",
      bank: [
        {
          q: "鄂东地区首个国家5A级旅游景区是哪一个？",
          options: ["李时珍文化和旅游区", "东坡赤壁景区", "龟峰山景区"],
          answer: 2,
          explain:
            "龟峰山成功创建国家5A级旅游景区，是鄂东地区首个5A级景区，也是麻城旅游的龙头名片。景区集杜鹃花海、地质奇观、红色遗迹于一体，四季皆可游。",
        },
        {
          q: "麻城龟峰山以什么景观最为著名？",
          options: ["古杜鹃群落", "云海日出", "瀑布群"],
          answer: 0,
          explain:
            "龟峰山拥有中国面积最大的原生态古杜鹃群落，连片面积达10万亩，树龄多在百年以上，被专家称为「世界罕见的杜鹃花海」。「人间四月天，麻城看杜鹃」已成为享誉全国的赏花品牌。",
        },
        {
          q: "麻城古杜鹃花海的最佳观赏期是哪个季节？",
          options: ["春季（4月至5月）", "夏季", "秋季"],
          answer: 0,
          explain:
            "每年4月下旬至5月上旬，龟峰山万亩古杜鹃次第绽放、漫山红遍，是华中地区规模最大的春季赏花盛事。除春季杜鹃外，麻城秋季菊花同样成景，菊香人家的菊花展与菊花茶远近闻名，四季皆有花事。",
        },
      ],
    },
    {
      gate: "红叶关",
      place: "罗田",
      bank: [
        {
          q: "罗田县入选中国气象局《全国赏秋指南》，全国仅25个市县上榜。摄影界素有「北香山、南罗田」之说，罗田红叶以哪种树为主？",
          options: ["枫树", "乌桕树", "银杏树"],
          answer: 1,
          explain:
            "罗田是「中国乌桕之乡」，全县乌桕树逾百万株。秋日乌桕叶由绿转黄、由黄变红，一树五色、层林尽染。罗田县入选中国气象局《全国赏秋指南》，是全国25个上榜市县之一，湖北仅有两地入席。",
        },
        {
          q: "罗田县境内的大别山主峰、海拔1729米的山峰是？",
          options: ["薄刀峰", "龟峰山", "天堂寨"],
          answer: 2,
          explain:
            "天堂寨为大别山主峰，海拔1729米，号称「中原第一峰」。景区集奇峰、怪石、瀑布、云海于一体，森林覆盖率高达96%，是名副其实的「天然氧吧」，也是罗田山色关的核心打卡地。",
        },
        {
          q: "罗田县九资河一带以什么季节景观最为著名？",
          options: ["春季花海", "秋季红叶", "冬季雪景"],
          answer: 1,
          explain:
            "九资河是罗田红叶的最佳观赏地，每年10月下旬至11月下旬，乌桕红叶沿山脊、峡谷、田园次第变色，红叶与徽派古村、梯田云雾相映成画，是华中地区层次最丰富的秋色。",
        },
      ],
    },
    {
      gate: "活字关",
      place: "英山",
      bank: [
        {
          q: "英山云雾茶因何而得名？",
          options: ["产于海拔八百米以上云雾缭绕的高山茶园", "茶汤颜色如云雾", "茶树品种的名称"],
          answer: 0,
          explain:
            "产于大别山南麓海拔800米以上高山茶园，常年云雾笼罩、昼夜温差大，条索紧细、汤色明亮、香气持久，是国家地理标志保护产品。英山是「中国茶叶之乡」，到大别山茶叶谷采茶品茗是英山康养游的经典体验，云雾茶也是英山康养旅游最具代表性的伴手礼。",
        },
        {
          q: "冬季到英山旅游，「一滑一泡」指的是哪两种体验的组合？",
          options: ["滑雪与品茶", "滑冰与泡温泉", "滑雪与泡温泉"],
          answer: 2,
          explain:
            "英山是湖北「温泉+滑雪」组合最集中、交通最便捷的特色旅游区。桃花冲国际滑雪场拥有7条专业雪道、20万平方米超大雪场，并率先在全省开放超4万平方米滑雪夜场；大别山南武当滑雪场海拔1700米，可赏林海雪景。滑完雪再泡洪广毕昇温泉或四季花海花乐汤温泉（68个森林泡池），「白天滑雪、夜泡温泉」已成华中冬季旅游的经典组合。",
        },
        {
          q: "英山县是毕昇故里，毕昇发明了什么？",
          options: ["活字印刷术", "造纸术", "指南针"],
          answer: 0,
          explain:
            "英山是北宋发明家毕昇的故里，毕昇在此发明活字印刷术，位列中国古代四大发明之一。英山建有毕昇纪念园，国家4A级旅游景区，是探寻古代科技文明的重要一站。",
        },
      ],
    },
    {
      gate: "杂技关",
      place: "浠水",
      bank: [
        {
          q: "爱国诗人闻一多曾赞誉故乡的哪种特产「心较比干多一窍，貌若西子胜三分」？",
          options: ["浠水绿茶", "茅山螃蟹", "巴河莲藕"],
          answer: 2,
          explain:
            "闻一多先生是浠水人，曾以此联赞誉家乡的巴河莲藕。巴河九孔藕藕身粗壮、孔洞匀称、粉糯甘甜，是浠水最具文化辨识度的特产。",
        },
        {
          q: "浠水县是湖北杂技之乡，浠水县杂技馆有何特别之处？",
          options: ["全国唯一的县级单体杂技馆", "亚洲规模最大", "省级标准杂技馆"],
          answer: 0,
          explain:
            "浠水县杂技馆是全国唯一的县级单体杂技馆，常年上演高水准杂技节目，是浠水文旅的一张特色名片，尤其适合亲子观赏。",
        },
        {
          q: "苏东坡在浠水留下「谁道人生无再少？门前流水尚能西」的名句，这句词描写的是哪条河自东向西流的奇观？",
          options: ["长江", "浠水河", "巴河"],
          answer: 1,
          explain:
            "中国大多数河流自西向东流，浠水河却自东向西流，这一「流水西流」的奇观全国罕见。苏东坡游浠水清泉寺时写下此句，也让浠水有了独一份的文化符号。",
        },
      ],
    },
    {
      gate: "本草关",
      place: "蕲春",
      bank: [
        {
          q: "蕲春县是李时珍故里，其所著药物学巨典是下列哪一部？",
          options: ["《本草纲目》", "《黄帝内经》", "《伤寒杂病论》"],
          answer: 0,
          explain:
            "《本草纲目》是明代医药学家李时珍历时二十七年编成的药物学巨典，被达尔文称为「中国古代的百科全书」。李时珍是蕲春人，蕲春也因他成为享誉海内外的「医圣故里」。",
        },
        {
          q: "李时珍被后世尊称为什么？",
          options: ["医圣", "药圣", "药王"],
          answer: 1,
          explain:
            "李时珍被后世尊为「药圣」，与「医圣」张仲景、「药王」孙思邈并称。蕲春建有李时珍纪念馆、李时珍文化旅游区，是寻访中医药文化、体验蕲艾养生的重要目的地。",
        },
        {
          q: "蕲春道地药材「蕲艾」因何闻名？",
          options: ["《本草纲目》称「以蕲州者为胜」，品质公认最佳", "产量全国最大", "价格最高"],
          answer: 0,
          explain:
            "《本草纲目》载：「艾叶自成化以来，则以蕲州者为胜，用充方物，天下重之，谓之蕲艾。」蕲艾叶片宽大、艾绒丰富、挥发油含量高，是公认的道地药材。如今蕲春已形成集种植、加工、艾灸养生于一体的大健康产业，蕲艾品牌价值逾百亿元，居全国中药材地理标志前列。",
        },
      ],
    },
    {
      gate: "西游关",
      place: "武穴",
      bank: [
        {
          q: "位于武穴市余川镇的湖北大话嘻游旅游度假区，是国内首创的什么主题乐园？",
          options: ["西游文化动物伴游主题乐园", "恐龙主题乐园", "海洋主题乐园"],
          answer: 0,
          explain:
            "大话嘻游占地1169亩，是国内首家西游文化动物伴游主题乐园，创新打造伴宿、伴食、伴游、伴察、伴乐、夜伴六种动物伴游模式，游客可与羊驼散步、与水豚漂浮、与长颈鹿共同进餐。园区实景复刻火焰山、盘丝洞、水帘洞、南天门等40余处西游经典场景，并建有鄂东首个西游主题球幕影院。",
        },
        {
          q: "武穴佛手山药是国家农产品地理标志产品，因什么特征而得名？",
          options: ["块茎外形酷似张开的佛掌", "形状弯如新月", "外形似竹笋"],
          answer: 0,
          explain:
            "武穴佛手山药种植历史一千三百多年，因块茎形似张开的佛掌而得名。其肉质细腻、粉糯香甜，是秋冬进补的地道山珍，也是武穴最具代表性的伴手礼。",
        },
        {
          q: "下列哪一座城市被称为「中国西游文化重要起源地」和《西游记》成书背景地？",
          options: ["江苏连云港", "黄冈武穴", "河南洛阳"],
          answer: 1,
          explain:
            "武穴是《西游记》成书背景地、中国西游文化重要起源地，境内匡山为吴承恩创作的重要采风地，山中留存花果山、水帘洞等近百处与原著高度吻合的自然与人文遗迹。依托这一文化根脉，武穴建成湖北大话嘻游旅游度假区，实景复刻火焰山、盘丝洞、水帘洞等40余处经典场景，让西游文化从典籍中走来、在山水间活化。",
        },
      ],
    },
    {
      gate: "黄梅关",
      place: "黄梅",
      bank: [
        {
          q: "东山问梅村以唐风宋韵建筑闻名，汇集黄梅戏、黄梅挑花、岳家拳三项国家级非物质文化遗产。其中被誉为「以针作画」的是哪一项？",
          options: ["黄梅挑花", "岳家拳", "黄梅戏"],
          answer: 0,
          explain:
            "黄梅挑花以针为笔、以线为墨，在方寸布面上挑出万千图案，被誉为「以针作画」。东山问梅村将三大非遗融于一域，游客可在挑花传习馆亲手体验，把独一份的黄梅记忆带回家。",
        },
        {
          q: "在黄梅东山问梅村，黄梅戏的演出方式与传统剧场有何不同？",
          options: [
            "演员走下舞台，在青石板街巷中与游客零距离互动对唱",
            "只能在室内剧场观看完整大戏",
            "由游客自行点唱、演员代唱",
          ],
          answer: 0,
          explain:
            "东山问梅村把整座景区变成了戏台——黄梅戏剧团常驻演出，先后创排《戏梦东山》《白蛇传·问情》等新剧，盛装演员游走在青石板街上，与游客零距离互动、即兴对唱，形成「戏在街巷、人在画中」的独特体验，让黄梅戏从舞台艺术变成可亲可近的沉浸式演艺。入夜后还有《风从东山来》光影秀与无人机焰火秀，是湖北十大夜游目的地之一。",
        },
        {
          q: "在黄梅佑见长江文旅度假区，游客可以通过哪种独特方式欣赏黄梅戏？",
          options: ["乘画舫夜游长江，沿途观看实景演艺", "在室内剧场观看折子戏", "通过露天电影银幕观看"],
          answer: 0,
          explain:
            "佑见长江文旅度假区地处鄂赣皖三省交界、与江西九江隔江相望，以「佑见长江·黄梅戏梦」为主题，首创水陆双线、日夜双景的观演模式。游客乘画舫沿江而行，沿途十余个演艺点位依次上演实景光影秀与《天仙配》等黄梅戏经典桥段，威亚、杂技与「天女散花」交织呈现，真正实现「船在水中游，人在戏中坐」。游客还可参与大型户外剧本杀，从「看戏人」变为「戏中人」。",
        },
      ],
    },
  ];

  /* ========== 十县市区礼品（演示占位，具体以核销点备案为准） ========== */
  const GIFTS = [
    { id: "hz", place: "黄州", name: "门票／地标优品（以核销点备案为准）" },
    { id: "tf", place: "团风", name: "门票／地标优品（以核销点备案为准）" },
    { id: "ha", place: "红安", name: "门票／地标优品（以核销点备案为准）" },
    { id: "mc", place: "麻城", name: "门票／地标优品（以核销点备案为准）" },
    { id: "lt", place: "罗田", name: "门票／地标优品（以核销点备案为准）" },
    { id: "ys", place: "英山", name: "门票／地标优品（以核销点备案为准）" },
    { id: "xs", place: "浠水", name: "门票／地标优品（以核销点备案为准）" },
    { id: "qc", place: "蕲春", name: "门票／地标优品（以核销点备案为准）" },
    { id: "wk", place: "武穴", name: "门票／地标优品（以核销点备案为准）" },
    { id: "hm", place: "黄梅", name: "门票／地标优品（以核销点备案为准）" },
  ];

  const CLAIM_DEADLINE = "2026年12月30日24:00";

  /* ========== State ========== */
  let state = {
    phone: "",
    deck: [], // 11 questions drawn for this attempt
    index: 0,
    answers: [], // { correct, chosen, qId }
    phase: "home", // home | quiz | explain | gifts | claim | result
    giftSelected: [], // gift ids currently checked on gifts screen
  };

  /* ========== Helpers ========== */
  function $(sel) {
    return document.querySelector(sel);
  }
  function show(id) {
    document.querySelectorAll(".screen").forEach((el) => el.classList.remove("active"));
    const s = document.getElementById(id);
    if (s) s.classList.add("active");
  }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove("show"), 2000);
  }
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function nowStr() {
    const d = new Date();
    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes())
    );
  }
  function genCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "HG";
    for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
  }
  function giftTier(correct) {
    if (correct >= 11) return { n: 3, label: "全对 · 可领 3 份礼品", cls: "tier-3" };
    if (correct >= 9) return { n: 2, label: "答对 9 题及以上 · 可领 2 份礼品", cls: "tier-2" };
    if (correct >= 7) return { n: 1, label: "答对 7 题及以上 · 可领 1 份礼品", cls: "tier-1" };
    return { n: 0, label: "未达 7 题 · 暂无礼品兑换资格", cls: "tier-0" };
  }


  function shuffleQuestion(q) {
    const marked = q.options.map(function (text, i) {
      return { text: text, correct: i === q.answer };
    });
    for (let i = marked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = marked[i];
      marked[i] = marked[j];
      marked[j] = tmp;
    }
    return Object.assign({}, q, {
      options: marked.map(function (o) { return o.text; }),
      answer: marked.findIndex(function (o) { return o.correct; }),
    });
  }

  function buildDeck() {
    const deck = [
      shuffleQuestion({
        id: "warmup",
        gate: WARMUP.gate,
        gateFull: WARMUP.gateFull,
        place: "",
        q: WARMUP.q,
        options: WARMUP.options.slice(),
        answer: WARMUP.answer,
        explain: WARMUP.explain,
      }),
    ];
    LEVELS.forEach((lv, i) => {
      const item = pickRandom(lv.bank);
      deck.push(
        shuffleQuestion({
          id: "L" + (i + 1),
          gate: lv.gate,
          gateFull: lv.gate + "（" + lv.place + "）",
          place: lv.place,
          q: item.q,
          options: item.options.slice(),
          answer: item.answer,
          explain: item.explain,
        })
      );
    });
    return deck;
  }

  function isDone() {
    return localStorage.getItem(STORAGE.DONE) === "1";
  }

  function saveVoucher(v) {
    localStorage.setItem(STORAGE.DONE, "1");
    localStorage.setItem(STORAGE.VOUCHER, JSON.stringify(v));
    if (v.phone) localStorage.setItem(STORAGE.PHONE, v.phone);
  }

  function loadVoucher() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE.VOUCHER) || "null");
    } catch (e) {
      return null;
    }
  }

  /* ========== Screens ========== */
  function renderHome() {
    show("screen-home");
    const locked = isDone();
    const startBtn = $("#btn-start");
    const lockedNote = $("#locked-note");
    const phoneInput = $("#phone");

    if (locked) {
      startBtn.disabled = true;
      startBtn.textContent = "本设备已通关（仅一次）";
      lockedNote.style.display = "block";
      const v = loadVoucher();
      if (v) {
        const giftNote =
          v.giftN > 0
            ? v.gifts && v.gifts.length
              ? "已选礼品：" +
                v.gifts.map((g) => g.place).join("、") +
                "。请于" +
                CLAIM_DEADLINE +
                "前到对应县市区指定游客中心／核销点现场领取，不邮寄。"
              : "有 " + v.giftN + " 份兑礼资格，尚未选礼。"
            : "未达兑礼门槛。";
        lockedNote.innerHTML =
          "本设备已完成答题。凭证码 <strong>" +
          v.code +
          "</strong>，得分 " +
          v.correct +
          "/11。" +
          giftNote +
          '<br><button type="button" class="btn btn-ghost" id="btn-view-voucher" style="margin-top:8px">查看通关凭证</button>' +
          (v.giftN > 0 && v.gifts && v.gifts.length
            ? '<button type="button" class="btn btn-ghost" id="btn-view-claim" style="margin-top:8px">查看领取须知</button>'
            : v.giftN > 0
              ? '<button type="button" class="btn btn-primary" id="btn-resume-gifts" style="margin-top:8px">去选择礼品</button>'
              : "");
        const vb = $("#btn-view-voucher");
        if (vb) vb.onclick = () => renderResult(v, true);
        const vc = $("#btn-view-claim");
        if (vc) vc.onclick = () => renderClaim(v);
        const rg = $("#btn-resume-gifts");
        if (rg) {
          rg.onclick = () => {
            state.giftSelected = [];
            renderGifts(v);
          };
        }
      }
    } else {
      startBtn.disabled = false;
      startBtn.textContent = "开始答题";
      lockedNote.style.display = "none";
    }

    const savedPhone = localStorage.getItem(STORAGE.PHONE);
    if (savedPhone && phoneInput) phoneInput.value = savedPhone;
  }

  function startQuiz() {
    if (isDone()) {
      toast("本设备已答过，不可重复");
      return;
    }
    const phone = ($("#phone").value || "").trim();
    if (phone && !/^1\d{10}$/.test(phone)) {
      toast("请输入正确的11位手机号，或留空");
      return;
    }
    state.phone = phone;
    state.deck = buildDeck();
    state.index = 0;
    state.answers = [];
    state.phase = "quiz";
    renderQuestion();
  }

  function renderQuestion() {
    show("screen-quiz");
    const item = state.deck[state.index];
    const total = state.deck.length;
    const step = state.index + 1;

    $("#progress-fill").style.width = (step / total) * 100 + "%";
    $("#gate-tag").textContent = item.gateFull;
    $("#step-num").textContent = step + " / " + total;
    $("#q-text").textContent = item.q;

    const box = $("#options");
    box.innerHTML = "";
    const letters = ["A", "B", "C"];
    item.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      btn.innerHTML =
        '<span class="letter">' + letters[i] + "</span><span>" + opt + "</span>";
      btn.onclick = () => onChoose(i);
      box.appendChild(btn);
    });

    const exp = $("#explain");
    exp.className = "explain";
    exp.innerHTML = "";
    $("#quiz-actions").innerHTML = "";
  }

  function onChoose(chosen) {
    const item = state.deck[state.index];
    const correct = chosen === item.answer;
    state.answers.push({
      gate: item.gateFull,
      correct,
      chosen,
      answer: item.answer,
    });

    const opts = document.querySelectorAll("#options .opt");
    opts.forEach((el, i) => {
      el.disabled = true;
      if (i === item.answer) el.classList.add("correct");
      else if (i === chosen) el.classList.add("wrong");
      else el.classList.add("dim");
      if (i === chosen) el.classList.add("selected");
    });

    const exp = $("#explain");
    exp.className = "explain show " + (correct ? "ok" : "bad");
    exp.innerHTML =
      '<div class="title">' +
      (correct ? "✓ 回答正确" : "✗ 回答错误") +
      "</div>" +
      '<div class="body">' +
      (correct ? "" : "正确答案：" + ["A", "B", "C"][item.answer] + "　") +
      item.explain +
      "</div>";

    const actions = $("#quiz-actions");
    const isLast = state.index >= state.deck.length - 1;
    actions.innerHTML =
      '<button type="button" class="btn btn-primary" id="btn-next">' +
      (isLast ? "查看通关结果" : "下一关") +
      "</button>";
    $("#btn-next").onclick = () => {
      if (isLast) finishQuiz();
      else {
        state.index++;
        renderQuestion();
      }
    };
  }

  function finishQuiz() {
    const correct = state.answers.filter((a) => a.correct).length;
    const tier = giftTier(correct);
    const voucher = {
      code: genCode(),
      correct,
      total: 11,
      giftN: tier.n,
      giftLabel: tier.label,
      tierCls: tier.cls,
      phone: state.phone || "未填写",
      date: nowStr(),
      topic: "#黄冈通关考答对就出发#大美黄冈此心安处",
      detail: state.answers.map((a) => ({
        gate: a.gate,
        ok: a.correct,
      })),
      gifts: [],
    };
    saveVoucher(voucher);
    state.giftSelected = [];
    if (tier.n > 0) {
      renderGifts(voucher);
    } else {
      renderClaim(voucher);
    }
  }

  function giftById(id) {
    return GIFTS.find((g) => g.id === id);
  }

  function formatGiftLabel(g) {
    return g.place + " · " + g.name;
  }

  function renderGifts(v) {
    show("screen-gifts");
    state.phase = "gifts";
    const max = v.giftN || 0;
    $("#gift-quota").textContent = String(max);
    $("#gift-max").textContent = String(max);

    // restore selection from voucher if re-entering
    if (!state.giftSelected.length && v.gifts && v.gifts.length) {
      state.giftSelected = v.gifts.map((g) => g.id);
    }

    const grid = $("#gift-grid");
    grid.innerHTML = "";
    GIFTS.forEach((g) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gift-opt";
      btn.dataset.id = g.id;
      btn.innerHTML =
        '<span class="place">' +
        g.place +
        '</span><span class="desc">' +
        g.name +
        "</span>";
      btn.onclick = () => toggleGift(g.id, max);
      grid.appendChild(btn);
    });

    const skip = $("#btn-gift-skip");
    if (skip) {
      // 通关后主流程不鼓励跳过；从凭证卡回看时可返回
      skip.style.display = v.gifts && v.gifts.length ? "block" : "none";
    }

    syncGiftUI(max);
  }

  function toggleGift(id, max) {
    const idx = state.giftSelected.indexOf(id);
    if (idx >= 0) {
      state.giftSelected.splice(idx, 1);
    } else {
      if (state.giftSelected.length >= max) {
        toast("最多选 " + max + " 份，请先取消一项");
        return;
      }
      state.giftSelected.push(id);
    }
    syncGiftUI(max);
  }

  function syncGiftUI(max) {
    const picked = state.giftSelected.length;
    const remain = Math.max(0, max - picked);
    $("#gift-picked").textContent = String(picked);
    const remainEl = $("#gift-remain");
    if (remainEl) remainEl.textContent = String(remain);

    document.querySelectorAll("#gift-grid .gift-opt").forEach((el) => {
      const id = el.dataset.id;
      const on = state.giftSelected.indexOf(id) >= 0;
      el.classList.toggle("selected", on);
      // 达上限时未选项不可再点（已选可取消）
      el.disabled = !on && picked >= max;
    });

    const confirm = $("#btn-gift-confirm");
    if (confirm) {
      confirm.disabled = picked !== max;
      confirm.textContent =
        picked === max ? "确认选择（" + max + " 份）" : "请选满 " + max + " 份";
    }
  }

  function confirmGifts() {
    const v = loadVoucher();
    if (!v || !v.giftN) {
      toast("暂无兑礼资格");
      return;
    }
    if (state.giftSelected.length !== v.giftN) {
      toast("请正好选择 " + v.giftN + " 份礼品");
      return;
    }
    v.gifts = state.giftSelected.map((id) => {
      const g = giftById(id);
      return { id: g.id, place: g.place, name: g.name };
    });
    saveVoucher(v);
    renderClaim(v);
  }

  function renderClaim(v) {
    show("screen-claim");
    state.phase = "claim";

    const hasGifts = v.gifts && v.gifts.length > 0;
    const emoji =
      v.giftN >= 3 ? "🏆" : v.giftN >= 2 ? "🎖️" : v.giftN >= 1 ? "🎁" : "📜";
    const emojiEl = $("#claim-emoji");
    if (emojiEl) emojiEl.textContent = emoji;

    const title = $("#claim-title");
    if (title) {
      title.textContent =
        v.giftN > 0 ? "恭喜通过" : "答题完成";
    }

    const scoreLine = $("#claim-score-line");
    if (scoreLine) {
      scoreLine.innerHTML = v.correct + ' <span>/ 11 题正确</span>';
    }
    const badge = $("#claim-tier-badge");
    if (badge) {
      badge.className = "tier-badge " + (v.tierCls || giftTier(v.correct).cls);
      badge.textContent = v.giftLabel || giftTier(v.correct).label;
    }

    const deadline = $("#claim-deadline");
    if (deadline) deadline.textContent = CLAIM_DEADLINE;

    const body = $("#claim-body");
    const places = $("#claim-places");
    const picksBox = $("#claim-picks-box");
    const pickList = $("#claim-pick-list");
    const warn = $("#claim-warn");

    if (v.giftN <= 0) {
      if (body) {
        body.innerHTML =
          "本次答题得分未达兑礼门槛（需答对 ≥7 题）。感谢参与「黄冈通关考　答对就出发！」活动，欢迎转发话题打卡大美黄冈。" +
          '<p class="place-line" id="claim-places"></p>';
      }
      if (picksBox) picksBox.style.display = "none";
      if (warn) {
        warn.textContent =
          "无礼品兑换名额。通关凭证与话题仍可保存、转发。正式活动规则以主办方发布为准。";
      }
    } else if (hasGifts) {
      if (body) {
        body.innerHTML =
          "恭喜通关！请于 <span class=\"deadline\" id=\"claim-deadline\">" +
          CLAIM_DEADLINE +
          "</span> 前，本人前往所选礼品对应县市区的<strong>指定游客中心／核销点</strong>现场领取。" +
          '<p class="place-line" id="claim-places"></p>';
      }
      const placeLine = $("#claim-places");
      if (placeLine) {
        placeLine.textContent =
          "领取地：" +
          v.gifts.map((g) => g.place + "（" + g.name + "）").join("；");
      }
      if (picksBox) picksBox.style.display = "block";
      if (pickList) {
        pickList.innerHTML = v.gifts
          .map((g) => "<li>" + formatGiftLabel(g) + "</li>")
          .join("");
      }
      if (warn) {
        warn.textContent =
          "逾期未到场领取的，名额自动失效，不予补发、不予折现。礼品仅限本人现场自取，不邮寄。领取须出示通关凭证、转发凭证并核验手机号。";
      }
    } else {
      // giftN>0 but no gifts recorded (历史旧凭证)
      if (body) {
        body.innerHTML =
          "您有 <strong>" +
          v.giftN +
          "</strong> 份兑礼资格。历史凭证无选礼记录，请返回选择礼品后再查看领取须知。" +
          '<p class="place-line" id="claim-places"></p>';
      }
      if (picksBox) picksBox.style.display = "none";
      if (warn) {
        warn.textContent =
          "请先完成礼品选择。逾期未到场领取的，名额自动失效，不予补发、不予折现。";
      }
    }

    $("#c-code").textContent = v.code;
    $("#c-score").textContent = v.correct + " / " + (v.total || 11);
    $("#c-gift").textContent =
      v.giftN > 0 ? v.giftN + " 份礼品兑换资格" : "无礼品资格";
    $("#c-phone").textContent = v.phone || "未填写";
    $("#c-date").textContent = v.date;

    const detail = $("#claim-detail-list");
    if (detail) {
      if (v.detail && v.detail.length) {
        detail.style.display = "block";
        detail.innerHTML = v.detail
          .map(
            (d) =>
              '<div class="d-row"><span>' +
              d.gate +
              '</span><span class="' +
              (d.ok ? "ok" : "bad") +
              '">' +
              (d.ok ? "正确" : "错误") +
              "</span></div>"
          )
          .join("");
      } else {
        detail.style.display = "none";
      }
    }

    const tag = $("#claim-hashtag");
    if (tag) {
      tag.textContent = v.topic || "#黄冈通关考答对就出发#大美黄冈此心安处";
    }
  }

  function renderResult(v, fromHistory) {
    show("screen-result");
    state.phase = "result";
    const emoji =
      v.giftN >= 3 ? "🏆" : v.giftN >= 2 ? "🎖️" : v.giftN >= 1 ? "🎁" : "📜";
    $("#result-emoji").textContent = emoji;
    $("#result-title").textContent = fromHistory
      ? "通关凭证（已存档）"
      : v.giftN > 0
        ? "恭喜通关！"
        : "答题完成";
    $("#score-line").innerHTML =
      v.correct + ' <span>/ 11 题正确</span>';

    const badge = $("#tier-badge");
    badge.className = "tier-badge " + (v.tierCls || giftTier(v.correct).cls);
    badge.textContent = v.giftLabel || giftTier(v.correct).label;

    $("#v-code").textContent = v.code;
    $("#v-score").textContent = v.correct + " / " + (v.total || 11);
    $("#v-gift").textContent =
      v.giftN > 0 ? v.giftN + " 份礼品兑换资格" : "无礼品资格";
    $("#v-phone").textContent = v.phone || "未填写";
    $("#v-date").textContent = v.date;

    const giftsRow = $("#v-gifts-row");
    const giftsVal = $("#v-gifts");
    const tip = $("#gift-history-tip");
    const pickBtn = $("#btn-pick-gifts");
    const hasGifts = v.gifts && v.gifts.length > 0;

    if (hasGifts) {
      if (giftsRow) giftsRow.style.display = "flex";
      if (giftsVal) {
        giftsVal.textContent = v.gifts.map(formatGiftLabel).join("；");
      }
      if (tip) tip.style.display = "none";
      if (pickBtn) { pickBtn.hidden = true; pickBtn.style.display = "none"; }
    } else if (v.giftN > 0) {
      if (giftsRow) giftsRow.style.display = "none";
      if (tip) {
        tip.style.display = "block";
        tip.textContent = "历史凭证无选礼记录，请点击下方完成选礼。";
      }
      if (pickBtn) { pickBtn.hidden = false; pickBtn.style.display = ""; }
    } else {
      if (giftsRow) giftsRow.style.display = "none";
      if (tip) tip.style.display = "none";
      if (pickBtn) { pickBtn.hidden = true; pickBtn.style.display = "none"; }
    }

    const detail = $("#detail-list");
    if (v.detail && v.detail.length) {
      detail.style.display = "block";
      detail.innerHTML = v.detail
        .map(
          (d) =>
            '<div class="d-row"><span>' +
            d.gate +
            '</span><span class="' +
            (d.ok ? "ok" : "bad") +
            '">' +
            (d.ok ? "正确" : "错误") +
            "</span></div>"
        )
        .join("");
    } else {
      detail.style.display = "none";
    }

    $("#hashtag-text").textContent = v.topic || "#黄冈通关考答对就出发#大美黄冈此心安处";
  }

  function copyText(text, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => toast(okMsg || "已复制"),
        () => fallbackCopy(text, okMsg)
      );
    } else {
      fallbackCopy(text, okMsg);
    }
  }
  function fallbackCopy(text, okMsg) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      toast(okMsg || "已复制");
    } catch (e) {
      toast("复制失败，请手动长按选择");
    }
    document.body.removeChild(ta);
  }

  function copyHashtag() {
    copyText(
      "#黄冈通关考答对就出发#大美黄冈此心安处",
      "话题已复制，去朋友圈粘贴吧"
    );
  }

  function copyVoucher() {
    const v = loadVoucher();
    if (!v) {
      toast("暂无凭证");
      return;
    }
    const giftLine =
      v.gifts && v.gifts.length
        ? v.gifts.map((g) => g.place + "·" + g.name).join("；")
        : v.giftN > 0
          ? "尚未选择"
          : "无";
    const text =
      "【黄冈通关考　答对就出发！】通关凭证\n" +
      "凭证码：" +
      v.code +
      "\n得分：" +
      v.correct +
      "/11\n兑礼：" +
      (v.giftN > 0 ? v.giftN + "份资格" : "无") +
      "\n已选礼品：" +
      giftLine +
      "\n时间：" +
      v.date +
      "\n手机：" +
      (v.phone || "未填") +
      "\n领取须知：请于" +
      CLAIM_DEADLINE +
      "前本人到所选礼品对应县市区指定游客中心／核销点现场领取；逾期未到场名额自动失效，不予补发、不予折现。不邮寄。\n话题：#黄冈通关考答对就出发#大美黄冈此心安处";
    copyText(text, "凭证全文已复制");
  }

  function copyClaimNotice() {
    const v = loadVoucher();
    if (!v) {
      toast("暂无凭证");
      return;
    }
    let body;
    if (v.giftN <= 0) {
      body =
        "答题完成，未达兑礼门槛（需≥7题）。凭证码：" +
        v.code +
        "，得分：" +
        v.correct +
        "/11。";
    } else if (v.gifts && v.gifts.length) {
      body =
        "恭喜通过！请于" +
        CLAIM_DEADLINE +
        "前，本人前往所选礼品对应县市区指定游客中心／核销点现场领取。\n已选：" +
        v.gifts.map((g) => g.place + "·" + g.name).join("；") +
        "\n逾期未到场领取的，名额自动失效，不予补发、不予折现。礼品现场自取，不邮寄。\n凭证码：" +
        v.code;
    } else {
      body = "您有" + v.giftN + "份兑礼资格，但尚未选择礼品。凭证码：" + v.code;
    }
    copyText(body, "领取须知已复制");
  }

  function demoReset() {
    if (
      !confirm(
        "【演示重置】将清除本机通关记录、凭证与已填手机号，仅供演示/测试。确定重置？"
      )
    )
      return;
    localStorage.removeItem(STORAGE.DONE);
    localStorage.removeItem(STORAGE.VOUCHER);
    localStorage.removeItem(STORAGE.PHONE);
    const phoneInput = $("#phone");
    if (phoneInput) phoneInput.value = "";
    toast("已重置，可重新答题");
    renderHome();
  }

  /* ========== Bind ========== */
  function init() {
    $("#btn-start").onclick = startQuiz;
    $("#btn-copy-tag").onclick = copyHashtag;
    $("#btn-copy-voucher").onclick = copyVoucher;
    const demoBtn = $("#btn-demo-reset");
    if (demoBtn) {
      const host = (location.hostname || "").toLowerCase();
      const isPublicHost =
        host.endsWith("github.io") ||
        host.endsWith("githubusercontent.com");
      if (isPublicHost) {
        demoBtn.hidden = true;
        demoBtn.style.display = "none";
      } else {
        demoBtn.onclick = demoReset;
      }
    }
    $("#btn-back-home").onclick = renderHome;

    const pickBtn = $("#btn-pick-gifts");
    if (pickBtn) {
      pickBtn.onclick = () => {
        const v = loadVoucher();
        if (!v || !v.giftN) {
          toast("暂无兑礼资格");
          return;
        }
        state.giftSelected = (v.gifts || []).map((g) => g.id);
        renderGifts(v);
      };
    }
    const giftConfirm = $("#btn-gift-confirm");
    if (giftConfirm) giftConfirm.onclick = confirmGifts;
    const giftSkip = $("#btn-gift-skip");
    if (giftSkip) {
      giftSkip.onclick = () => {
        const v = loadVoucher();
        if (v) renderResult(v, true);
        else renderHome();
      };
    }
    const claimCopy = $("#btn-claim-copy");
    if (claimCopy) claimCopy.onclick = copyClaimNotice;
    const claimCopyTag = $("#btn-claim-copy-tag");
    if (claimCopyTag) claimCopyTag.onclick = copyHashtag;
    const claimCopyV = $("#btn-claim-copy-voucher");
    if (claimCopyV) claimCopyV.onclick = copyVoucher;
    const claimVoucher = $("#btn-claim-voucher");
    if (claimVoucher) {
      claimVoucher.onclick = () => {
        const v = loadVoucher();
        if (v) renderResult(v, true);
      };
    }
    const claimHome = $("#btn-claim-home");
    if (claimHome) claimHome.onclick = renderHome;

    renderHome();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
