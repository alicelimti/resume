# 개발일지 — 임윤서 이력서 웹사이트

**작성일:** 2026-06-04  
**프로젝트:** 개인 이력서 웹사이트  
**배포 URL:** https://alicelimti.github.io/day3/  
**저장소:** https://github.com/alicelimti/day3

---

## 1. 개발 환경 구성

### 1-1. 저장소 클론 및 초기화
- GitHub 저장소 `alicelimti/day3` 클론 (curl 방식 — Xcode 도구 미설치 상태로 git 직접 실행 불가)
- Xcode Command Line Tools 설치 후 git 정상화
- Node.js v24.16.0 / npm 11.13.0 확인

### 1-2. 빌드 도구 설정
- **Vite** 기반 프로젝트 초기화
- `package.json` 스크립트 구성 (`dev`, `build`, `preview`, `og`)
- `.gitignore` 작성 (`node_modules/`, `dist/`)
- GitHub Pages 배포를 위해 `vite.config.js`에 `base: '/day3/'` 설정

### 1-3. GitHub 인증
- `gh` CLI v2.93.0 바이너리 직접 다운로드 (Homebrew 미설치 환경 대응)
- `gh auth login`으로 HTTPS 인증 완료
- `gh auth setup-git`으로 git push 인증 연동

---

## 2. 퍼블리싱 구조 설계

```
day3/
├── index.html          # 메인 이력서 페이지
├── style.css           # 전체 스타일 (컬러 시스템 + 다크모드)
├── main.js             # JavaScript 인터랙션
├── vite.config.js      # Vite 빌드 설정
├── public/
│   ├── photo.jpeg      # 프로필 사진
│   ├── og-image.png    # OG 공유 이미지
│   └── favicon.png     # 파비콘
├── scripts/
│   └── generate-og.mjs # OG 이미지 / 파비콘 자동 생성 스크립트
└── docs/
    ├── dev-log.md      # 개발일지 (본 문서)
    └── evaluation-report.md
```

---

## 3. 이력서 콘텐츠 작성

| 섹션 | 내용 |
|------|------|
| 기본 정보 | 임윤서 / alicelimti@naver.com / GitHub |
| 소개 | 숙명여자대학교 경제학부 졸업 · KB국민은행 경험 기반 소개문 |
| 역량 | 금융업무(여신·수신·외환·자산관리) / 전문지식(거시경제·재무분석·리스크) / Tools(Excel·PPT·Python) |
| 경력 | KB국민은행 디지털 서포터즈 2024.03–2024.07 |
| 학력 | 숙명여자대학교 경제학부 · 세무회계학 연계전공 · 산업기업경제트랙 · GPA 4.03/4.5 · 졸업성적우수생 |
| 수상 | 숙명여자대학교 경제학술제 은상 (2019.11.18) — 거시경제 지표 기반 통화정책 분석 |
| 프로젝트 | 한국유네스코학생회(SNS임원·ESG카드뉴스) / 나이키 캠퍼스 클럽(재무담당 2019–2020) |
| 봉사활동 | 아름다운가게 2023 · 매장관리 |

---

## 4. 디자인 시스템

### 4-1. 컬러 시스템

| 구분 | 라이트모드 | 다크모드 | 용도 |
|------|-----------|---------|------|
| 주컬러 | `#4169E1` (Royal Blue) | `#7b9ff5` | 섹션 제목, 회사명, 링크 |
| 보조컬러 | `rgba(65,105,225,0.5)` | `rgba(123,159,245,0.5)` | 태그 배경, 테두리 |
| 이벤트컬러 | `#f472b6` (Light Pink) | `#f9a8d4` | 수상·카드 호버, 포인트 |
| Hero 배경 | `#0D2D84` 기반 그라데이션 | 동일 (더 어두운 톤) | Hero 섹션 전용 |

### 4-2. 다크모드
- CSS `@media (prefers-color-scheme: dark)` 기반 자동 전환
- 배경(`#0b0c1e`), 카드(`#161829`), 텍스트(`#e8eaf6`) 별도 정의
- WCAG 2.1 AA 기준 충족 — 주요 텍스트 대비비 4.5:1 이상 확보

### 4-3. 타이포그래피
- 본문: Noto Sans KR (Google Fonts)
- 영문 보조: Inter
- 기본 크기: 15px / 행간: 1.7

---

## 5. JavaScript 인터랙션

| 효과 | 구현 방식 |
|------|----------|
| Hero 파티클 배경 | Canvas API — 38개 점 + 90px 이내 선 연결, requestAnimationFrame |
| 순차 페이드인 | 사진→이름→직함→연락처 180ms 간격 CSS transition |
| 타이핑 효과 | 직함 텍스트 60ms 간격 한 글자씩 출력 |
| 사진 호버 틸트 | mousemove 기반 rotate3d + scale(1.05) |
| 스크롤 애니메이션 | IntersectionObserver — 섹션 진입 시 fadeInUp |

---

## 6. 프로필 사진 처리 과정

1. **1차 시도 실패** — 한글 파일명(`증명사진.jpeg`) URL 인코딩 문제로 HTML 페이지 다운로드됨
2. **원인 파악** — `xxd` 명령으로 파일 헤더 확인 → JPEG magic bytes(`FF D8 FF`) 대신 `0a 0a`(빈 줄) 확인
3. **해결** — 영문 파일명(`lyspicture.jpeg`)으로 재업로드 → 정상 JPEG 확인 후 적용
4. **최종 스타일** — 원형(border-radius: 50%), 흰색 테두리, 이중 그림자, 호버 확대 효과

---

## 7. OG 이미지 / 파비콘 자동 생성

- **패키지:** `@napi-rs/canvas` (사전 빌드 바이너리, macOS arm64 지원)
- **폰트:** 시스템 폰트 `Apple SD Gothic Neo` 등록
- **OG 이미지** (1200×630): 로얄블루 그라데이션 배경 + 임윤서/금융전문가 텍스트 + 핑크 포인트 + 하단 컬러바
- **파비콘** (64×64): 로얄블루 원형 + `임` 글자
- **빌드 자동화:** `npm run build` 시 OG 이미지 자동 재생성

---

## 8. 배포 파이프라인

```
main 브랜치 (소스코드)
    ↓  npm run build
dist/ (빌드 산출물)
    ↓  git checkout gh-pages
gh-pages 브랜치 (배포용)
    ↓  GitHub Pages
https://alicelimti.github.io/day3/
```

- `gh-pages` 브랜치에는 `index.html`, `assets/`, `og-image.png`, `favicon.png` 만 포함
- `gh auth setup-git`으로 HTTPS 자동 인증

---

## 9. 주요 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| git clone 실패 | Xcode CLT 미설치 | `xcode-select --install` 실행 |
| git push 인증 실패 | GitHub 자격증명 없음 | `gh` CLI 바이너리 직접 설치 후 `gh auth login` |
| 프로필 사진 깨짐 | 한글 파일명 URL 인코딩 오류 | 영문 파일명으로 재업로드 |
| gh-pages에 node_modules 업로드 | .gitignore 미적용 브랜치 | `git rm -rf node_modules` 후 재커밋 |
| Homebrew 설치 실패 | sudo 권한 부족 | gh CLI 바이너리 직접 다운로드로 우회 |
