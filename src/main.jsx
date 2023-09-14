import React from 'react'
import ReactDOM from 'react-dom/client'
import WebFont from 'webfontloader'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style/index.scss'

import OnBoard from './components/onboard/OnBoard'
import StartAsPlayer from './components/onboard/StartAsPlayer'
import StartAsMj from './components/onboard/StartAsMj'
import Game from './components/game/Game'

WebFont.load({
	google: {
		families: ['Mitr:200,400,500,700']
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter basename="/buzzr">

			<Routes>
				<Route path="/" element={<OnBoard />} />
				<Route path="/player" element={<StartAsPlayer />} />
				<Route path="/mj" element={<StartAsMj />} />
				<Route path="/game/:name/:sessionId" element={<Game />} />
			</Routes>

		</BrowserRouter>		
	</React.StrictMode>,
)
