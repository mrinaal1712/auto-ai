import { useState } from 'react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export default function App() {
  const [bankData, setBankData] = useState([])
  const [ledgerData, setLedgerData] = useState([])
  const [matched, setMatched] = useState([])
  const [unmatched, setUnmatched] = useState([])

  const handleFileUpload = (e, setter) => {
    const file = e.target.files[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: results => {
        setter(results.data)
      },
    })
  }

  const similarity = (a, b) => {
    if (!a || !b) return 0
    a = a.toLowerCase()
    b = b.toLowerCase()
    const sameWords = a.split(' ').filter(word => b.includes(word))
    return sameWords.length / Math.max(a.split(' ').length, 1)
  }

  const matchTransactions = () => {
    const matched = []
    const unmatched = []

    bankData.forEach(bankRow => {
      const match = ledgerData.find(ledgerRow => {
        const sameAmount = bankRow.Amount === ledgerRow.Amount
        const sameDate = bankRow.Date === ledgerRow.Date
        const descSim = similarity(bankRow.Description, ledgerRow.Description)
        return sameAmount && sameDate && descSim > 0.6
      })

      if (match) {
        matched.push({ ...bankRow })
      } else {
        unmatched.push({ ...bankRow })
      }
    })

    setMatched(matched)
    setUnmatched(unmatched)
  }

  const exportToExcel = (matchedData, unmatchedData, filename) => {
    const wb = XLSX.utils.book_new()

    const matchedSheet = XLSX.utils.json_to_sheet(matchedData)
    XLSX.utils.book_append_sheet(wb, matchedSheet, 'Matched')

    const unmatchedSheet = XLSX.utils.json_to_sheet(unmatchedData)
    XLSX.utils.book_append_sheet(wb, unmatchedSheet, 'Unmatched')

    XLSX.writeFile(wb, filename)
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">🔄 AutoRecon.ai - Match Engine</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-2">📂 Upload Bank File</h2>
          <input type="file" accept=".csv" onChange={e => handleFileUpload(e, setBankData)} />
        </div>
        <div>
          <h2 className="font-semibold mb-2">📂 Upload Ledger File</h2>
          <input type="file" accept=".csv" onChange={e => handleFileUpload(e, setLedgerData)} />
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={matchTransactions}
          disabled={!bankData.length || !ledgerData.length}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition mr-4"
        >
          🔍 Match Transactions
        </button>

        {(matched.length > 0 || unmatched.length > 0) && (
          <button
            onClick={() => exportToExcel(matched, unmatched, 'autorecon-report.xlsx')}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            ⬇️ Download Reconciliation Report
          </button>
        )}
      </div>

      {matched.length > 0 && <DataTable data={matched} title="✅ Matched Transactions" />}
      {unmatched.length > 0 && <DataTable data={unmatched} title="❌ Unmatched Bank Transactions" />}
    </div>
  )
}

function DataTable({ data, title }) {
  const columns = Object.keys(data[0])

  return (
    <div className="bg-white p-4 mb-6 shadow rounded-lg">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <div className="overflow-auto max-h-64">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {columns.map(col => (
                <th key={col} className="p-2 border">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i}>
                {columns.map(col => (
                  <td key={col} className="p-2 border">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
