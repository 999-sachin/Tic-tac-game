import { useState } from "react"
import JSConfetti from "js-confetti"

function Board() {
    const squaresArr = new Array(9).fill(null)
    const [squares, setSquares] = useState(squaresArr)
    const [isXNext, setXNext] = useState(true)
    
    // Move winner calculation inside component to update with state
    const winner = calculateWinner(squares)
    // Use useState for status to make it reactive
    const [status, setStatus] = useState(
        winner 
            ? `Winner: ${winner}` 
            : `Next player: ${isXNext ? "X" : "O"}`
    )

    const handleSquares = (i) => {
        if (squares[i] || winner) { // Check if square is filled or game is won
            return
        }

        const newSquares = squares.slice()
        newSquares[i] = isXNext ? "X" : "O"
        setSquares(newSquares)
        setXNext(!isXNext)

        // Update status after move
        const newWinner = calculateWinner(newSquares)
        if (newWinner) {
            setStatus(`Winner: ${newWinner}`)
        } else if (!newSquares.includes(null)) {
            setStatus('DRAW')
        } else {
            setStatus(`Next player: ${!isXNext ? "X" : "O"}`)
        }
    }

    const resetGame = () => {
        setSquares(squaresArr)
        setXNext(true)
        setStatus(`Next player: X`)
    }

    return (
        <div className='flex flex-col items-center'>
            <h2 className="text-3xl text-white">{status}</h2>
            <div className='grid grid-cols-3 gap-2'>
                {squares.map((value, index) => (
                    <button
                        key={index} // Added key prop for list items
                        className='w-24 h-24 bg-blue-500 text-white text-3xl font-bold flex items-center justify-center border-2 border-white transition-all hover:bg-orange-500'
                        onClick={() => handleSquares(index)}
                    >
                        {value}
                    </button>
                ))}
            </div>
            <button 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-800" 
                onClick={resetGame}
            >
                Reset Game
            </button>
        </div>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]            // Diagonals
    ]
    
    for (let line of lines) {
        const [a, b, c] = line
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
                emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
            })
            return squares[a]
        }
    }
    return null
}

export default Board