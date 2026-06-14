import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ConfirmProvider } from './context/ConfirmContext'
import { ErrorProvider } from './context/ErrorContext'
import { NotificationProvider } from './context/NotificationContext'
import BottomNav from './components/BottomNav'
import PositionsListScreen from './screens/PositionsListScreen'
import AttackLogListScreen from './screens/AttackLogListScreen'
import CalculatorScreen from './screens/CalculatorScreen'
import HitPenetrationCalculatorScreen from './screens/HitPenetrationCalculatorScreen'
import UnitConversionCalculatorScreen from './screens/UnitConversionCalculatorScreen'
import MovingTargetCalculatorScreen from './screens/MovingTargetCalculatorScreen'
import DeflectionAngleCalculatorScreen from './screens/DeflectionAngleCalculatorScreen'
import DirectionalShootingDistanceScreen from './screens/DirectionalShootingDistanceScreen'
import CurrentPositionScreen from './screens/CurrentPositionScreen'
import HomeScreen from './screens/HomeScreen'
import MaagarimScreen from './screens/MaagarimScreen'
import IndicatorsListScreen from './screens/IndicatorsListScreen'
import NadbarimScreen from './screens/NadbarimScreen'
import NadbarNewScreen from './screens/NadbarNewScreen'
import NadbarEditScreen from './screens/NadbarEditScreen'
import SadapScreen from './screens/SadapScreen'
import SadapParisatEshkolScreen from './screens/SadapParisatEshkolScreen'
import SadapKipulEshkolScreen from './screens/SadapKipulEshkolScreen'
import SadapParisatDugScreen from './screens/SadapParisatDugScreen'
import SadapKipulDugScreen from './screens/SadapKipulDugScreen'
import TargetListScreen from './screens/TargetListScreen'
import OthersScreen from './screens/OthersScreen'
import BachListScreen from './screens/BachListScreen'
import BachScreen from './screens/BachScreen'
import BachEditScreen from './screens/BachEditScreen'
import MissChecklistListScreen from './screens/MissChecklistListScreen'
import MissChecklistScreen from './screens/MissChecklistScreen'
import MissChecklistEditScreen from './screens/MissChecklistEditScreen'
import TargetAidListScreen from './screens/TargetAidListScreen'
import TargetAidScreen from './screens/TargetAidScreen'
import TargetAidEditScreen from './screens/TargetAidEditScreen'
import RshatazimScreen from './screens/RshatazimScreen'
import RshamatzRehevScreen from './screens/RshamatzRehevScreen'
import RshamatzEshkolScreen from './screens/RshamatzEshkolScreen'
import NotesScreen from './screens/NotesScreen'
import FireFeasibilityFlowScreen from './screens/FireFeasibilityFlowScreen'
import FireFeasibilityListScreen from './screens/FireFeasibilityListScreen'
import FireFeasibilitySavedDetailScreen from './screens/FireFeasibilitySavedDetailScreen'
import SettingsScreen from './screens/SettingsScreen'

function AppRoutes() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-svh bg-neutral-50">
      <main className="flex min-h-0 flex-1 flex-col" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}>
        <Routes key={location.key}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/sadap" element={<SadapScreen />} />
            <Route path="/sadap/parisat-eshkol" element={<SadapParisatEshkolScreen />} />
            <Route path="/sadap/kipul-eshkol" element={<SadapKipulEshkolScreen />} />
            <Route path="/sadap/parisat-dug" element={<SadapParisatDugScreen />} />
            <Route path="/sadap/kipul-dug" element={<SadapKipulDugScreen />} />
            <Route path="/nadbarim" element={<NadbarimScreen />} />
            <Route path="/nadbarim/new/:type" element={<NadbarNewScreen />} />
            <Route path="/nadbarim/:id/edit" element={<NadbarEditScreen />} />
            <Route path="/notes" element={<NotesScreen />} />
            <Route path="/current-position" element={<CurrentPositionScreen />} />
            <Route path="/fire-feasibility" element={<FireFeasibilityListScreen />} />
            <Route path="/fire-feasibility/new" element={<FireFeasibilityFlowScreen />} />
            <Route path="/fire-feasibility/saved/:id/edit" element={<FireFeasibilityFlowScreen />} />
            <Route path="/fire-feasibility/saved/:id" element={<FireFeasibilitySavedDetailScreen />} />
            <Route path="/calculator" element={<CalculatorScreen />} />
            <Route path="/calculator/hit-penetration" element={<HitPenetrationCalculatorScreen />} />
            <Route path="/calculator/unit-conversion" element={<UnitConversionCalculatorScreen />} />
            <Route path="/calculator/moving-target" element={<MovingTargetCalculatorScreen />} />
            <Route path="/calculator/deflection-angle" element={<DeflectionAngleCalculatorScreen />} />
            <Route path="/calculator/directional-distance" element={<DirectionalShootingDistanceScreen />} />
            <Route path="/attack-log" element={<AttackLogListScreen />} />
            <Route path="/target-bank" element={<TargetListScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/maagarim" element={<MaagarimScreen />} />
            <Route path="/maagarim/positions" element={<PositionsListScreen />} />
            <Route path="/maagarim/indicators" element={<IndicatorsListScreen />} />
            <Route path="/maagarim/targets" element={<TargetListScreen />} />
            <Route path="/others" element={<OthersScreen />} />
            <Route path="/others/bach" element={<BachListScreen />} />
            <Route path="/others/bach/new" element={<BachScreen />} />
            <Route path="/others/bach/:id/edit" element={<BachEditScreen />} />
            <Route path="/others/miss-checklist" element={<MissChecklistListScreen />} />
            <Route path="/others/miss-checklist/new" element={<MissChecklistScreen />} />
            <Route path="/others/miss-checklist/:id/edit" element={<MissChecklistEditScreen />} />
            <Route path="/others/target-aid" element={<TargetAidListScreen />} />
            <Route path="/others/target-aid/new" element={<TargetAidScreen />} />
            <Route path="/others/target-aid/:id/edit" element={<TargetAidEditScreen />} />
            <Route path="/others/rshatazim" element={<RshatazimScreen />} />
            <Route path="/others/rshatazim/rehev" element={<RshamatzRehevScreen />} />
            <Route path="/others/rshatazim/eshkol" element={<RshamatzEshkolScreen />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

function App() {
  return (
    <ErrorProvider>
    <NotificationProvider>
    <ConfirmProvider>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
    </ConfirmProvider>
    </NotificationProvider>
    </ErrorProvider>
  )
}

export default App
