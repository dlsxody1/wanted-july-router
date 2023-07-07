import { useRouter } from "../hooks/useRouter";

const About = () => {
  const { push } = useRouter();

  return (
    <div>
      <div>about</div>
      <button onClick={() => push("/")}>go root</button>
    </div>
  );
};

export default About;
