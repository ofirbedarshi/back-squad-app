import { HashRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import AttackLogScreen from './screens/AttackLogScreen'
import CalculatorScreen from './screens/CalculatorScreen'
import HomeScreen from './screens/HomeScreen'
import TargetBankScreen from './screens/TargetBankScreen'

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-svh bg-neutral-50 dark:bg-neutral-950">
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/calculator" element={<CalculatorScreen />} />
            <Route path="/attack-log" element={<AttackLogScreen />} />
            <Route path="/target-bank" element={<TargetBankScreen />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  )
}

export default App
