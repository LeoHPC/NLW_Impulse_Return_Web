import { Widget } from "./components/Widget"
import { ColorsProvider } from "./hooks/ColorsContext"

export function App() {
  return (
    <ColorsProvider>
      <Widget />
    </ColorsProvider>
  )
}