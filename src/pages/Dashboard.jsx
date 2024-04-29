import React, {useEffect, useState} from 'react';// Подставьте свой API-метод для получения отчетов

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [aviaReport, setAviaReport] = useState(null);
  const [tourOperatorReport, setTourOperatorReport] = useState(null);

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleGenerateReport = async () => {
    try {
      const aviaResponse = await fetch(`http://localhost:8080/fin-report-avia?year=${year}`)

      const tourOperatorResponse = await fetch(`http://localhost:8080/fin-report-touroperator?year=${year}`)

      if (!aviaResponse.ok || !tourOperatorResponse.ok) {
        throw new Error('Failed to fetch financial reports');
      }

      const aviaReportData = await aviaResponse.json();
      const tourOperatorReportData = await tourOperatorResponse.json();

      setAviaReport(aviaReportData);
      setTourOperatorReport(tourOperatorReportData);
      console.log(tourOperatorReport)
    } catch (error) {
      console.error('Error generating financial report:', error.message);
      // Обработка ошибок
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h2>Финансовый отчет за год</h2>
      <div>
        <label>
          Выберите год:
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
          />
        </label>
        <button onClick={handleGenerateReport}>Сформировать отчет</button>
      </div>
      {aviaReport && (
        <div>
          <h3>Отчет для авиакомпании</h3>
          <table>
            <thead>
            <tr>
              <th>Авиакомпания</th>
              <th>Доход (в руб.)</th>
            </tr>
            </thead>
            <tbody>
            {aviaReport.map((airline, index) => (
              <tr key={index}>
                <td className="font-bold">{airline.name}</td>
                <td className="font-bold">{airline.airline_profit}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
      {tourOperatorReport && (
        <div>
          <h3>Отчет для туроператора</h3>
          <p className="font-bold">Доход: {tourOperatorReport[0].tour_operator_profit}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;