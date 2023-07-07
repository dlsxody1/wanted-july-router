export const useRouter = () => {
  const push = (path: string): void => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  return { push };
};
