import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countryName, setCountryName] = useState("");
  const [goldMedal, setGoldMedal] = useState(0);
  const [silverMedal, setSilverMedal] = useState(0);
  const [ropperMedal, setRopperMedal] = useState(0);
  const [inputInfo, setInputInfo] = useState({});

  useEffect(() => {
    console.log(parseInt(goldMedal));
  }, [countryName, goldMedal, silverMedal, ropperMedal, inputInfo]);

  const addOrUpdateCountry = () => {
    if (countryName.length === 0) alert("국가명을 입력해주세요");
    else if (isNaN(parseInt(goldMedal)) || isNaN(parseInt(silverMedal)) || isNaN(parseInt(ropperMedal)))
      alert("메달 수는 숫자로 입력해주세요");
    else if (goldMedal < 0 || silverMedal < 0 || ropperMedal < 0) alert("메달 개수는 자연수로 입력해주세요");
    else {
      setInputInfo({
        ...inputInfo,
        [countryName]: {
          goldMedal: parseInt(goldMedal),
          silverMedal: parseInt(silverMedal),
          ropperMedal: parseInt(ropperMedal),
        },
      });
      setCountryName("");
      setGoldMedal(0);
      setSilverMedal(0);
      setRopperMedal(0);
    }
  };

  const addCountry = () => {
    addOrUpdateCountry();
  };

  const updateCountry = () => {
    if (countryName.includes(Object.keys(inputInfo))) {
      addOrUpdateCountry();
    } else {
      alert("국가가 등록되지 않았습니다");
    }
  };

  const removeCountry = (country) => {
    setInputInfo((previousCountry) => {
      const updatedCountries = { ...previousCountry };
      delete updatedCountries[country];
      return updatedCountries;
    });
  };

  return (
    <>
      <div className="container">
        <h1>2024 파리 올림픽</h1>
        <form>
          <div className="input-group">
            <div className="input-field">
              <label htmlFor="">국가명</label>
              <input
                onChange={(e) => setCountryName(e.target.value)}
                type="text"
                placeholder="국가 입력"
                value={countryName}
              />
            </div>
            <div className="input-field">
              <label>금메달</label>
              <input
                onChange={(e) => setGoldMedal(e.target.value)}
                type="number"
                placeholder="0"
                value={goldMedal}
                min={0}
              />
            </div>
            <div className="input-field">
              <label>은메달</label>
              <input
                onChange={(e) => setSilverMedal(e.target.value)}
                type="number"
                placeholder="0"
                value={silverMedal}
                min={0}
              />
            </div>
            <div className="input-field">
              <label>동메달</label>
              <input
                onChange={(e) => setRopperMedal(e.target.value)}
                type="number"
                placeholder="0"
                value={ropperMedal}
                min={0}
              />
            </div>
            <div className="button-group">
              <button type="button" onClick={addCountry}>
                국가 추가
              </button>
              <button type="button" onClick={updateCountry}>
                업데이트
              </button>
            </div>
          </div>
        </form>
        {Object.keys(inputInfo).length === 0 ? (
          <div>아직 추가된 국가가 없습니다. 메달을 추적하세요!</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>국가명</th>
                <th>금메달</th>
                <th>은메달</th>
                <th>동메달</th>
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inputInfo)
                .sort(([, a], [, b]) => {
                  if (a.goldMedal !== b.goldMedal) return b.goldMedal - a.goldMedal;
                  else {
                    if (a.silverMedal !== b.silverMedal) return b.silverMedal - a.silverMedal;
                    else return b.ropperMedal - a.ropperMedal;
                  }
                })
                .map(([country, medal]) => {
                  return (
                    <tr key={country}>
                      <td>{country}</td>
                      <td>{medal.goldMedal}</td>
                      <td>{medal.silverMedal}</td>
                      <td>{medal.ropperMedal}</td>
                      <td>
                        <button onClick={() => removeCountry(country)}>삭제</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;
