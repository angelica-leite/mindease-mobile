# MindEase Mobile

Aplicativo mobile (Expo + React Native) para produtividade com foco em:

- gerenciamento de tarefas em colunas (`todo`, `in-progress`, `done`)
- timer de foco estilo Pomodoro
- configurações de acessibilidade com persistência local

## Stack

- `expo` 54
- `react` 19 / `react-native` 0.81
- `expo-router` (roteamento por arquivos)
- `@react-native-async-storage/async-storage` (persistência)
- `lucide-react-native` + `@expo/vector-icons` (ícones)
- `typescript` (strict)
- `jest` + `jest-expo` + `@testing-library/react-native` (testes)

## Requisitos

- Node.js 20+ recomendado
- npm 10+ recomendado
- Expo Go no dispositivo (ou emulador Android/iOS)

## Setup

1. Instalar dependências

```bash
npm install --legacy-peer-deps
```

2. Rodar o app

```bash
npm run start
```

Atalhos:

- Android: `npm run android`
- iOS: `npm run ios`
- Web: `npm run web`

## Scripts

- `npm run start`: inicia dev server Expo
- `npm run android`: abre no Android
- `npm run ios`: abre no iOS
- `npm run web`: abre no web
- `npm run lint`: lint com configuração Expo
- `npm run lint:fix`: tenta corrigir lint automaticamente
- `npm run format`: formata codigo com Prettier
- `npm run format:check`: valida formatação
- `npm test`: executa testes Jest
- `npm run test:watch`: testes em watch mode

## Arquitetura

O projeto segue separação em camadas:

### 1) `domain/`

Regra de negócio pura e contratos:

- entidades (`Task`, `TaskStatus`, etc.)
- repositórios (interfaces)
- use-cases (`list`, `move`, `toggle-checklist`)

### 2) `application/`

Orquestração de caso de uso com detalhes de app:

- `AddTask` (criação com `id` e `createdAt`)

### 3) `infrastructure/`

Implementações concretas:

- repositório em `AsyncStorage`
- composição de dependências em `infrastructure/di/tasks.ts`

### 4) `presentation/`

UI, hooks e estado de tela:

- componentes (`ui/`, `tasks/`)
- hooks de view model (`use-*.ts`)
- estilos por tela/componente (`*.styles.ts`)
- contexto de acessibilidade

### 5) `app/`

Entradas de rota (`expo-router`):

- `app/_layout.tsx`
- `app/(tabs)/*` (dashboard, tasks, pomodoro, profile, settings)

## Decisões técnicas

### Persistência

- `AsyncStorage` para:
  - tarefas: chave `mindease:tasks`
  - acessibilidade: chave `mindease:accessibility`

### Estado e lógica de tela

- lógica concentrada em hooks (`use-tasks`, `use-pomodoro`, `use-settings-view-model`, etc.)
- componentes focam em renderização e callbacks

### Estilização

- React Native `StyleSheet` em arquivos dedicados `*.styles.ts`
- tema centralizado em `presentation/theme/mindease-theme.ts`

### Acessibilidade

- contexto global com persistência (`presentation/contexts/accessibility-context.tsx`)
- hook derivado `use-accessibility-ui` converte settings em escala de fonte/espaçamento/contraste

### Testes

- `jest-expo` como preset
- `@testing-library/react-native` para hooks/componentes
- foco atual em regras de negócio e hooks principais

## Estrutura de pastas (resumo)

```
app/
  _layout.tsx
  index.tsx
  (tabs)/
    _layout.tsx
    dashboard.tsx
    tasks.tsx
    pomodoro.tsx
    profile.tsx
    settings.tsx

src/
  application/
  domain/
  infrastructure/
  presentation/
```
