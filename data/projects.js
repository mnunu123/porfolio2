// 박세준 프로젝트 데이터

const PROJECTS = [
  {
    id: "project-1",
    variant: "A",
    accent: "red",
    num: "01",
    category: "실전 프로젝트 · 예비창업패키지 선정",
    title: "빗물받이 쓰리봇 + 웹 관제 플랫폼",
    subtitle: "도심 집수 예방을 위한 IoT 센서 로봇 + 실시간 관제 대시보드",
    stack: {
      하드웨어: "MCU(ESP32) · 수위센서 · 초음파센서 · MQTT 통신",
      백엔드:   "Python · FastAPI · 데이터 수집 파이프라인",
      프론트엔드: "React+TypeScript · Leaflet 지도 · 실시간 폴링",
      인프라:   "Docker Compose · 마이크로서비스 구조"
    },
    keywords: ["IoT 센서", "임베디드", "웹 플랫폼"],
    summary: "도심 집중호우 시 빗물받이 막힘이 침수의 주요 원인이지만, 현행 방식은 담당자 수동 순찰 + 민원 접수로 사후 대응만 가능했습니다.",
    thinking: "코드를 작성하면서 동시에 '이 사업을 어떻게 운영할 것인가'를 고민하며 실행했고, 그 경험 모두를 총무 직무에서 활용하겠습니다.",
    results: [
      { label: "최종 결과", text: "예비창업패키지 선정 — 정부 사업화 검증 통과" },
      { label: "현장 반영", text: "지자체 담당자 인터뷰 기반 3회 이상 기능 반복 개선" },
      { label: "직무 연결", text: "공공기관 서류, 사업계획서, 예산 집행·정산 전 과정 직접 수행" }
    ],
    contributions: [
      { label: "기획",     width: "100%" },
      { label: "하드웨어", width: "100%" },
      { label: "소프트웨어", width: "100%" },
      { label: "사업운영", width: "100%" }
    ]
  },
  {
    id: "project-2",
    variant: "B",
    accent: "red",
    num: "02",
    category: "실전 프로젝트 · 컴퓨터비전 + 임베디드",
    title: "안전보호구 착용 감지 시스템",
    subtitle: "작업장 PPE 미착용을 카메라로 실시간 감지하고 알리는 시스템",
    keywords: ["YOLOv8", "컴퓨터비전", "엣지 컴퓨팅"],
    summary: "산업 안전은 처음 접하는 도메인이었지만, 현장 인터뷰와 규정 조사로 요구사항을 직접 정의하고 기술로 해결했습니다.",
    thinking: "낯선 분야에서도 구조를 먼저 파악한 뒤 실행에 옮기는 방식을 이 프로젝트에서 다시 한번 적용했습니다.",
    proofCards: [
      { platform: "처리 속도",  text: "카메라 입력에서 알림까지 1초 이내 실시간 처리",     metric: "Raspberry Pi 엣지 추론" },
      { platform: "현장 피드백", text: '"순회 없이 실시간으로 파악할 수 있다"',             metric: "지자체 현장 담당자" },
      { platform: "자동 보고서", text: "감지 이력 로그 기반 주간 안전 보고서 자동 생성",    metric: "총무 정례 보고 자동화 직접 활용 가능" }
    ],
    contributions: [
      { label: "비전 AI",    width: "100%" },
      { label: "하드웨어",   width: "100%" },
      { label: "보고 자동화", width: "100%" }
    ]
  },
  {
    id: "project-3",
    variant: "C",
    accent: "red",
    num: "03",
    category: "실전 프로젝트 · IoT · 임베디드 + 앱 연동",
    title: "스마트 무드등 — 환경 감응형 조명 시스템",
    subtitle: "센서 데이터와 사용자 상태를 기반으로 조명을 자동 조절하는 IoT 시스템",
    keywords: ["ESP32", "FreeRTOS", "BLE / Wi-Fi", "Flutter 앱"],
    summary: "임베디드 하드웨어부터 모바일 앱 연동까지 전 구간을 혼자 설계하고 구현했습니다.",
    thinking: "하드웨어·펌웨어·통신·앱 4개 레이어를 혼자 설계하고 통합했습니다. 이 방식은 총무가 부서 간 업무를 조율하는 구조와 동일합니다.",
    metrics: [
      { num: "100", unit: "ms", label: "센서 → 조명 변화 지연" },
      { num: "60",  unit: "%↓", label: "자동 모드 후 수동 개입 감소" },
      { num: "40",  unit: "%↓", label: "기존 대비 전력 절감" }
    ],
    contributions: [
      { label: "하드웨어", width: "100%" },
      { label: "펌웨어",   width: "100%" },
      { label: "앱 개발",  width: "85%" }
    ]
  }
];

const AI_PROJECTS = [
  { id: "AI-01", title: "랜딩페이지 자동 생성기",          problem: "제작 시간·비용 과다",    result: "제작 시간 90% 단축",        tech: "멀티에이전트 · Claude Haiku/Sonnet + Gemini" },
  { id: "AI-02", title: "상세페이지 A/B 테스트 자동화",    problem: "수동 A/B 운영 비효율",   result: "분석 사이클 완전 자동화",     tech: "5-에이전트 협업 · GA4 연동" },
  { id: "AI-03", title: "PPT 자동 생성 에이전트",          problem: "발표자료 품질 편차",      result: "설득 규칙 기반 표준화",       tech: "설득 규칙 명문화 · 자동 검수" },
  { id: "AI-04", title: "산불 CCTV 협업 감지 시스템",      problem: "수동 CCTV 모니터링",     result: "5서비스 MSA 자동 감지",       tech: "MSA 5서비스 · Python · React+TS · Docker" },
  { id: "AI-05", title: "Douyin 영상 자동 수집기",         problem: "수동 수집 30분/회",       result: "완전 자동화 파이프라인",       tech: "Playwright · Python · 자동화 파이프라인" },
  { id: "AI-06", title: "DP로봇 랜딩페이지 + Remotion 영상", problem: "영상+웹 복합 제작",    result: "Remotion 영상+Next.js 통합", tech: "Remotion · Next.js · 복합 결과물" }
];
