import { useRouter } from "../hooks/useRouter";

const Root = () => {
  const { push } = useRouter();

  return (
    <div>
      <div>Root</div>
      <button onClick={() => push("/about")}>go about</button>
    </div>
  );
};

export default Root;
