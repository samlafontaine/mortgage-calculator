import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MortgageCalculator = () => {
    const [mortgageAmount, setMortgageAmount] = useState('');
    const handleMortgageAmountChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '');
        if (value !== '' && !value.startsWith('$')) {
            value = value + '$';
        }
        setMortgageAmount(value);
    };
    const [interestRate, setInterestRate] = useState('');
    const handleInterestRateChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '');
        if (value !== '' && !value.endsWith('%')) {
            value = value + '%';
        }
        setInterestRate(value);
    };
    const [years, setYears] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [resultList, setResultList] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const calculate = () => {
        const mortgage = parseFloat(mortgageAmount);
        const interestRateDecimal = parseFloat(interestRate) / 100;
        const monthlyInterestRate = interestRateDecimal / 12;
        const periods = years * 12;
        const monthlyPaymentCalc =
            (mortgage * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, periods)) /
            (Math.pow(1 + monthlyInterestRate, periods) - 1);
        setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

        const resultListItems = [];
        let remainingMortgage = mortgage;
        for (let i = 0; i < periods; i++) {
            const interestPayment = remainingMortgage * monthlyInterestRate;
            const principalPayment = monthlyPaymentCalc - interestPayment;
            resultListItems.push({
                month: i + 1,
                principal: principalPayment,
                interest: interestPayment,
                mortgageRemaining: remainingMortgage - principalPayment
            });
            remainingMortgage -= principalPayment;
        }
        setResultList(resultListItems);
        setShowResults(true);
    };

    const reload = () => {
        setMortgageAmount('');
        setInterestRate('');
        setYears('');
        setMonthlyPayment(0);
        setResultList([]);
        setShowResults(false);
    };

    return (
        <div className="container text-center">
            <h1>Mortgage Calculator 🏡</h1>
            <p>See your mortgage payment schedule</p>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Mortgage Amount"
                            value={mortgageAmount}
                            onChange={handleMortgageAmountChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Interest Rate"
                            value={interestRate}
                            onChange={handleInterestRateChange}
                        />
                    </div>
                    <div className="col-sm-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Number of Years"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container text-center">
                <button type="submit" className="btn btn-dark" onClick={calculate}>
                    Calculate
                </button>
                <button type="submit" className="btn btn-light" onClick={reload}>
                    Restart
                </button>
            </div>

            {showResults && (
                <div className="container">
                    <span className="text-center lead mark">Monthly Payment: {monthlyPayment}$</span> <br /><br />
                    <div class="table-responsive-lg">
                        <table className="table table-bordered table-sm table-hover">
                        <thead class="table-light">
                            <tr>
                                <th>Month</th>
                                <th>Capital Paid</th>
                                <th>Interest Paid</th>
                                <th>Mortgage Remaining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultList.map((item, index) => (
                                <tr key={index}>
                                    <td>Month {index + 1}</td>
                                    <td>{item.principal.toFixed(2)}</td>
                                    <td>{item.interest.toFixed(2)}</td>
                                    <td>{item.mortgageRemaining.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MortgageCalculator;
