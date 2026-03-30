// 박세준 프로필 데이터

const PROFILE = {
  name: "박세준",
  nameEn: "PARK SEJUN",
  birth: "2002.01.15",

  oneLiner: "모르는 분야도 구조를 파악하여 실제 결과물로 끝내왔습니다",
  intro: "전자공학·창업·AI 자동화를 거치며 그 실행 방식을 직접 증명해왔습니다.",

  contacts: [
    { label: "Email",  value: "mnunu1234@naver.com",  href: "mailto:mnunu1234@naver.com" },
    { label: "Phone",  value: "010-4566-9665",         href: "tel:010-4566-9665" },
    { label: "GitHub", value: "github.com/mnunu123",   href: "https://github.com/mnunu123" }
  ],

  education: [
    {
      school: "경북대학교",
      major: "전자공학부 (주전공)",
      majorSub: "지식재산융합전공 (복수전공)",
      period: "2021 — 현재",
      note: "재학 중"
    }
  ],

  experience: [
    {
      org: "예비창업패키지 선정 — 빗물받이 쓰리봇",
      role: "기술개발 · 운영 · 회계 · IR 전담 (1인)",
      type: "창업",
      period: "창업 활동"
    },
    {
      org: "AI 자동화 6개 프로젝트",
      role: "반복 업무 구조화 시스템 설계 · Claude Code 기반 멀티에이전트",
      type: "프로젝트",
      period: "2025 — 현재"
    }
  ],

  skills: [
    { category: "하드웨어",  items: ["MCU(ESP32)", "회로 설계", "임베디드 개발", "IoT 센서"] },
    { category: "소프트웨어", items: ["Python", "FastAPI", "React+TypeScript", "Flutter"] },
    { category: "AI·자동화", items: ["YOLOv8", "Claude API", "멀티에이전트 파이프라인"] },
    { category: "인프라",    items: ["Docker Compose", "마이크로서비스", "MQTT"] },
    { category: "운영·문서", items: ["사업계획서", "IR 피칭", "공공기관 보고서", "예산 정산"] }
  ]
};
