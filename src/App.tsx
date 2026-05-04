import { HashRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import AttackLogScreen from './screens/AttackLogScreen'
import CalculatorScreen from './screens/CalculatorScreen'
import CurrentPositionScreen from './screens/CurrentPositionScreen'
import HomeScreen from './screens/HomeScreen'
import NidbarimScreen from './screens/NidbarimScreen'
import SadpamScreen from './screens/SadpamScreen'
import TargetBankScreen from './screens/TargetBankScreen'

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-svh bg-neutral-50">
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/sadpam" element={<SadpamScreen />} />
            <Route path="/nidbarim" element={<NidbarimScreen />} />
            <Route path="/current-position" element={<CurrentPositionScreen />} />
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
