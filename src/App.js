import React from "react"
import { Sun, CloudRain, Moon } from "react-feather"
import styled, { keyframes } from "styled-components"
import "./styles.css"

export default function App() {
	return (
		<div className="App">
			<RotatingIconButton>
				<Sun />
				<CloudRain />
				<Moon />
			</RotatingIconButton>
		</div>
	)
}

function RotatingIconButton({ children }) {
	const icons = React.Children.toArray(children)

	const [current, setCurrent] = React.useState(0)

	function cycleState() {
		setCurrent(current === icons.length - 1 ? 0 : current + 1)
	}

	const isInitial = React.useRef(true)

	React.useEffect(() => {
		isInitial.current = false
	}, [])

	return (
		<IconButton onClick={cycleState}>
			{icons.map((icon, i) => {
				const isCurrent = i === current
				return (
					<Icon key={i} isInitial={isInitial.current} isCurrent={isCurrent}>
						{icon}
					</Icon>
				)
			})}
		</IconButton>
	)
}

const IconButton = styled.button`
	height: 48px;
	width: 48px;
	position: relative;
	padding: 0px;
	overflow: hidden;
	cursor: pointer;
	outline: none;
	border-radius: 4px;
	background: transparent;
	border: none;

	&:hover {
		background: rgba(144, 144, 144, 0.1);
	}
`

const Icon = styled.div`
	position: absolute;
	top: 0px;
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	animation-fill-mode: forwards;
	animation-duration: ${(props) => (props.isInitial ? 0 : 400)}ms;
	animation-name: ${(props) => (props.isCurrent ? riseIn : riseOut)};
`

const riseIn = keyframes`
	from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`

const riseOut = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-100%);
  }
`
