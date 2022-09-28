export default function useLanguage(props) {
  const { Thai, Eng, Cambodia, Myanmar, Laos, China, language } = props;
  switch (language) {
    case "Thai":
      return Thai;
    case "Eng":
      return Eng;
    case "Cambodia":
      return Cambodia;
    case "Myanmar":
      return Myanmar;
    case "Laos":
      return Laos;
    case "China":
      return China;
    default:
      return null;
  }
}
