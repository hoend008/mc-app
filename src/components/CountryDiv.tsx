import useData from '../hooks/useData';

const CountryDiv = () => {
  const { country } = useData();

  return (
    <div>{country}</div>
  )
}

export default CountryDiv