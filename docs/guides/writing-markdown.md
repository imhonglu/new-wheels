# Markdown 작성 가이드

- Last verified: 2026-08-04
- Verified against: `README.md`, `README_KR.md`, `CONTRIBUTING.md`, `AGENTS.md`, `libs/*/package.json`, `libs/*/README.md`, `libs/*/README_KR.md`, `tools/*/package.json`, `tools/*/README.md`, `tools/*/README_KR.md`, `docs/**/*.md`, `package.json`, `cspell.json`, `biome.json`, `tools/cli-tools/src/check-markdown-links.ts`, `tools/cli-tools/src/check-doc-structure.ts`

이 가이드는 사람이 직접 유지하는 README와 Markdown 문서의 형식, 연결과 검증을 설명합니다. `libs/*/docs`의 생성 Markdown은 직접 수정하지 않고 [API 문서 생성](./generating-api-docs.md)을 따릅니다. ADR과 Plan의 의미와 템플릿은 각각 [기술 결정 기록](../decisions/README.md)과 [실행 계획](../plans/README.md)이 소유합니다.

## README

### 언어 문서 쌍

`pnpm-workspace.yaml#packages`에 포함되는 `libs/*`와 `tools/*`의 각 workspace 패키지는 공개 여부와 관계없이 다음 두 문서를 함께 유지합니다.

- `README.md`: 영문 기본 진입점
- `README_KR.md`: 같은 패키지를 설명하는 한국어 진입점

두 파일은 H1 바로 아래 한 줄에 다음 언어 전환 링크를 함께 둡니다.

| 표시 | 대상 |
| --- | --- |
| English | `./README.md` |
| 한국어 | `./README_KR.md` |

패키지의 역할, 설치·실행 조건, 명령, API 이름, 코드 예제, 링크와 안전 경고의 의미가 두 문서에서 같아야 합니다. 설명 문장과 제목은 번역할 수 있지만 절의 순서와 정보 범위는 대응시킵니다. 명령, 실행 코드, 경로와 공개 식별자는 번역하지 않으며 코드 주석은 같은 의미를 유지하는 범위에서 번역할 수 있습니다.

패키지 사실이 바뀌면 두 문서를 같은 변경에서 검토하고 의미가 달라지는 부분을 함께 갱신합니다. 한 언어의 오탈자나 번역만 고치는 경우에는 다른 파일을 의미 없이 수정하지 않습니다.

### 구성

공개 패키지 README는 다음 순서를 권장합니다.

1. 패키지가 해결하는 문제
2. 설치
3. 대표 사용 예제
4. API 문서 링크

private 도구는 소비자 설치나 공개 API 문서를 억지로 추가하지 않고 역할과 경계, 실행 명령, 검증 방법을 설명합니다.

루트 `README.md`는 프로젝트와 공개 패키지 목록의 영문 진입점이며 `README_KR.md`는 같은 구조와 링크를 유지하는 한국어 진입점입니다.

패키지 README에는 사용자에게 필요한 설치와 사용법만 두고 공통 개발 절차는 Guide로 연결합니다. 설치 방법, 대표 예제와 명령 가까이의 안전 경고는 다른 문서 링크만으로 대체하지 않습니다.

## 구조와 표현

- 제목과 절은 독자가 답을 찾는 순서로 구성합니다.
- 한 문단에는 하나의 중심 사실이나 판단을 둡니다.
- 저장소 내부 문서는 상대 링크로 연결하고 실제 파일명과 같은 대소문자를 사용합니다.
- 링크 문구는 대상 파일명보다 독자가 얻게 될 정보를 설명합니다.
- 명령과 예제에는 언어가 있는 fenced code block을 사용하고 현재 manifest와 도구로 실행 가능한지 확인합니다.

현재 별도의 Markdown formatter는 없으므로 제목 순서, 빈 줄, 표와 코드 블록의 가독성은 수동으로 검토합니다.

## 추가, 이동과 삭제

문서의 생성·통합·삭제 판단은 [문서 작성 원칙의 생명주기](./documentation-principles.md#생명주기)를 따릅니다.

- 새 문서는 가장 가까운 분류 `README.md`에 inline 상대 링크로 등록합니다. 같은 디렉터리의 파일은 `./<file>.md`, 직접 하위 디렉터리는 `./<directory>/README.md` 형식이어야 인덱스 검사에서 인식됩니다.
- `docs/README.md`의 문서 목록에는 하위 분류 인덱스만 등록합니다. 책임이나 탐색 경로를 설명하는 본문에는 필요한 개별 문서 링크를 둘 수 있습니다.
- Markdown 파일을 이동하거나 삭제하면 가장 가까운 인덱스와 들어오는 상대 링크를 같은 변경에서 갱신합니다.
- reference-style link는 인덱스 등록으로 인식되지 않으므로 인덱스에는 inline link를 사용합니다.

## 현재 문서 메타데이터

개별 Architecture, Guide와 Operation 문서에는 다음 형식의 메타데이터를 정확히 한 번 둡니다. 분류 인덱스인 `README.md`에는 추가하지 않습니다.

```md
- Last verified: YYYY-MM-DD
- Verified against: `관련 소스 또는 설정 경로`
```

`Verified against`에는 저장소 루트 기준 경로를 backtick으로 기록합니다. 확인한 파일을 구체적으로 적는 것을 우선하고, 일치하는 전체 범위를 실제로 검토했을 때만 glob을 사용합니다.

문서 내용을 근거 파일과 다시 대조했을 때만 `Last verified`를 갱신합니다. 날짜는 최근 검토 시점을 알려 줄 뿐 최신성을 자동 보장하지 않습니다. 구조 검사는 분류 `README.md`를 제외한 Architecture·Guide·Operation 문서의 lowercase kebab-case 파일명과 비어 있지 않은 `# 제목` 형식의 H1 하나, 두 metadata 필드가 정확히 한 번 있는지, `Last verified`가 유효한 날짜인지, `Verified against`가 비어 있지 않은지 확인합니다. `Verified against`의 backtick, 경로 형식과 내용의 타당성은 수동으로 검토합니다.

현재 문서에는 `Status`를 사용하지 않습니다. ADR과 Plan은 각 인덱스의 별도 형식과 생명주기를 따릅니다.

## 검증

```sh
pnpm run check:docs
pnpm run lint:cspell
git diff --check
```

검사 범위를 결과보다 넓게 해석하지 않습니다.

| 검사 | 확인하는 내용 |
| --- | --- |
| `check:docs` | 대상 내부 링크 파일의 존재와 대소문자, `docs` 인덱스 등록, 현재 문서 파일명·H1·메타데이터, ADR·Plan 형식 |
| CSpell | 저장소 맞춤법 사전과 철자 |
| `git diff --check` | 현재 diff의 whitespace 오류. `check:docs`와 CI에는 포함되지 않는 로컬 확인 |
| 수동 검토 | Markdown 앵커, 외부 URL, 내용의 정확성, 근거 경로의 타당성, 영문·한글 의미 일치, 일반 Markdown 스타일 |
| 검사 없음 | Biome 기반 Markdown 형식 검사 |

루트 `check:docs`의 입력 기준은 `package.json#scripts`입니다. 현재 `AGENTS.md`, `CONTRIBUTING.md`, 루트 README, `docs`, `libs`와 `tools`를 입력으로 사용합니다. 디렉터리 순회는 CLI README에 명시한 경로를 건너뛰므로 예를 들어 `.changeset`, 임의의 다른 루트 Markdown, `src`, `dist`와 생성 `libs/*/docs`는 검사 범위에 포함되지 않습니다. 범위 밖 파일은 별도로 확인합니다.

`check:docs`는 Markdown 앵커와 외부 URL의 가용성을 검사하지 않습니다. 현재 링크 검사는 fenced·inline code 안의 inline Markdown 링크 문법도 대상으로 해석하지만 reference-style과 HTML 링크는 인식하지 않습니다. 구조 검사는 fenced code를 인덱스 등록으로 인정하지 않습니다. 개별 CLI의 정확한 사용법과 제외 경로는 [`@imhonglu/cli-tools`](../../tools/cli-tools/README.md)를 따릅니다.

## 완료 확인

- 가장 가까운 인덱스에서 문서를 찾을 수 있는가?
- 내부 링크의 대상과 대소문자가 정확한가?
- 각 workspace 패키지에 `README.md`와 `README_KR.md`가 있고 언어 전환 링크가 양쪽에 있는가?
- 메타데이터의 날짜와 근거를 실제로 다시 확인했는가?
- 앵커, 외부 URL과 다국어 문서의 의미를 수동으로 비교했는가?
- 생성 Markdown을 직접 수정하지 않았는가?
