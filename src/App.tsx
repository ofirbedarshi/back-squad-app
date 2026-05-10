import { HashRouter, Route, Routes } from 'react-router-dom'
import { ErrorProvider } from './context/ErrorContext'
import BottomNav from './components/BottomNav'
import PositionsListScreen from './screens/PositionsListScreen'
import AttackLogListScreen from './screens/AttackLogListScreen'
import CalculatorScreen from './screens/CalculatorScreen'
import CurrentPositionScreen from './screens/CurrentPositionScreen'
import HomeScreen from './screens/HomeScreen'
import MaagarimScreen from './screens/MaagarimScreen'
import IndicatorsListScreen from './screens/IndicatorsListScreen'
import NidbarimScreen from './screens/NidbarimScreen'
import SadapScreen from './screens/SadapScreen'
import SadapParisatEshkolScreen from './screens/SadapParisatEshkolScreen'
import SadapKipulEshkolScreen from './screens/SadapKipulEshkolScreen'
import SadapParisatDugScreen from './screens/SadapParisatDugScreen'
import SadapKipulDugScreen from './screens/SadapKipulDugScreen'
import TargetBankScreen from './screens/TargetBankScreen'
import TargetListScreen from './screens/TargetListScreen'

function App() {
  return (
    <ErrorProvider>
    <HashRouter>
      <div className="flex flex-col min-h-svh bg-neutral-50">
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/sadap" element={<SadapScreen />} />
            <Route path="/sadap/parisat-eshkol" element={<SadapParisatEshkolScreen />} />
            <Route path="/sadap/kipul-eshkol" element={<SadapKipulEshkolScreen />} />
            <Route path="/sadap/parisat-dug" element={<SadapParisatDugScreen />} />
            <Route path="/sadap/kipul-dug" element={<SadapKipulDugScreen />} />
            <Route path="/nidbarim" element={<NidbarimScreen />} />
            <Route path="/current-position" element={<CurrentPositionScreen />} />
            <Route path="/calculator" element={<CalculatorScreen />} />
            <Route path="/attack-log" element={<AttackLogListScreen />} />
            <Route path="/target-bank" element={<TargetBankScreen />} />
            <Route path="/maagarim" element={<MaagarimScreen />} />
            <Route path="/maagarim/positions" element={<PositionsListScreen />} />
            <Route path="/maagarim/indicators" element={<IndicatorsListScreen />} />
            <Route path="/maagarim/targets" element={<TargetListScreen />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
    </ErrorProvider>
  )
}

export default App
