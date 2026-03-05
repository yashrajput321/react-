import Header from './Components/Header'
import Leaderboard from './Components/Leaderboard'

import {
  GlobalStyle,
  MainContainer,
  Title,
  Description,
} from './styledComponents'

const App = () => (
  <>
    <GlobalStyle />
    <MainContainer>
      <Header />
      <Title>Think &lt;Code&gt; Innovate</Title>
      <Description>Make it work, Make it right, Make it fast</Description>
      <Leaderboard />
    </MainContainer>
  </>
)

export default App
