# 원티드 7월 프리온보딩 과제 (1)

## ❗목표

#### React와 History API 사용하여 SPA Router 기능 구현하기

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

<br/>

---

<br/>

## 프로젝트 실행방법

```linux
npm install
npm run dev
```

## 프로젝트 결과

<br/>

![Alt text](%EA%B3%BC%EC%A0%9C.gif)

<br/>

## 프로젝트 설명

### Router

react-router-dom의 Router 컴포넌트는 라우트 구성을 정의하고, 각 경로 (Route)에 대한 컴포넌트를 매핑합니다. 또한 정의된 경로와 일치하는 컴포넌트를 렌더링하고, 사용자가 경로를 변경할 때 해당 경로에 대한 컴포넌트를 렌더링합니다.

```tsx
import React, { useEffect, useState } from "react";
import { RouterProps } from "../types/RouterProps";
import { RouteProps } from "../types/RouterProps";

const Router = ({ children }: RouterProps) => {
  //Router 컴포넌트 안에 들어갈 것들은 React Node들이기 때문에 children을 인자로 받았습니다.
  const [pathname, setPathName] = useState(window.location.pathname);
  //초기값을 현재 URL로 설정하였습니다. 초기 렌더링시에 현재 URL 경로와 동일한 값을 설정해두기 위함입니다.
  const routes = React.Children.toArray(
    children
  ) as React.ReactElement<RouteProps>[];
  //Router 컴포넌트의 자식 컴포넌트들을 반환하기 위함입니다.
  //React Children API는 React에서 prop을 효율적으로 다룰 수 있게 제공하는 API로써 toArray는 children들을 자바스크립트 배열로 사용하기 위함입니다.

  useEffect(() => {
    const handleSetPathName = () => {
      setPathName(window.location.pathname);
    };
    window.addEventListener("popstate", handleSetPathName);
    //컴포넌트가 렌더링 되었을 때 한 번
    return () => {
      window.removeEventListener("popstate", handleSetPathName);
    };
    //컴포넌트가 언마운트 되었을 때 이벤트를 해제
  }, []);
  // window.addEventListener("popstate", handleSetPathName); popstate에 대한 이벤트를 등록하고 해제하는데, 이벤트가 발생 될 때 마다 현재 URL 경로를 가져와서 상태를 업데이트 하기위해서 이 함수를 작성하였습니다.

  return routes.find((route) => route.props.path === pathname);
  //routes 배열에서 찾는다, router가 path로 가지고 있는것과 state가 값이 같은 route만 return을 한다.
};

export default Router;
```

### Route

</br>

```tsx
import { RouteProps } from "../types/RouterProps";

// 현재 경로와 렌더링해줄 컴포넌트를 인자로 받아
// 렌더링 해줍니다.
export const Route = ({ path, component }: RouteProps) => {
  return window.location.pathname === path ? <div>{component}</div> : null;
};
```

<br/>

### useRouter

<br/>

```tsx
export const useRouter = () => {
  const push = (path: string): void => {
    window.history.pushState(null, "", path);
    //눌렀을 때 브라우저의 세션 기록 스택에 항목을 추가하고
    //popstate 이벤트가 발생할 때 해당 상태와 URL 경로를 복원하기 위함입니다.
    window.dispatchEvent(new PopStateEvent("popstate"));
    //pushstate로 메서드 상태를 변경하면 기본적으로 popstate 이벤트가 발생하지 않기 때문에 이벤트를 강제로 발생시키고 상태를 업데이트 하기 위함.
  };
  return { push };
};
```

</br>

### 느낀점

```
과제를 하기 위하여 react-router-dom 라이브러리를 설치해서 어떤 타입으로 되어있는지 어떻게 구성되어 있는지 확인해봤고, 다른 수강생분들의 코드도 참고하고, 블로그도 참고하고, mdn도 참고해 보았습니다. 과제를 완성하고 이해하는데 급급하면서도 스스로 생각하는 시간도 많이 가졌던 것 같습니다. 개발을 하거나 여러 면접을 보면서 원론적인 개념들이 정말 중요하다는 것을 또다시 한 번 느낍니다. SPA를 이해하는데 좋은 도움이 된 것 같습니다.
```
